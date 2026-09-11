import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { offers } from '../data/restaurants';
import { MapPin, Phone, CreditCard, Smartphone, Banknote, Tag, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, deliveryFee, tax, discount, total, appliedCoupon, setAppliedCoupon, clearCart } = useCart();
  const [address, setAddress] = useState({ flat: '', area: '', city: 'Mumbai', pincode: '400001' });
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('upi');
  const [couponCode, setCouponCode] = useState('');
  const [placing, setPlacing] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div style={{ paddingTop: 'var(--navbar-h)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ fontSize: 80 }}>🛒</div>
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>Your cart is empty</h2>
        <button className="btn-primary" onClick={() => navigate('/restaurants')}>Order Now</button>
      </div>
    );
  }

  const applyCode = () => {
    const found = offers.find(o => o.code === couponCode.trim().toUpperCase());
    if (found) {
      if (subtotal < found.minOrder) {
        toast.error(`Min order ₹${found.minOrder} required`, { position: 'bottom-center' });
        return;
      }
      setAppliedCoupon(found);
      toast.success(`🎉 Coupon "${found.code}" applied!`, { position: 'bottom-center' });
    } else {
      toast.error('Invalid coupon code', { position: 'bottom-center' });
    }
  };

  const handlePlaceOrder = async () => {
    if (!address.flat || !address.area || !phone) {
      toast.error('Please fill delivery details', { position: 'bottom-center' });
      return;
    }
    setPlacing(true);
    await new Promise(r => setTimeout(r, 2000));
    const orderId = 'FR' + Math.random().toString(36).substring(2, 8).toUpperCase();
    clearCart();
    navigate('/order-confirmation', { state: { orderId, total, items: cartItems, restaurant: cartItems[0]?.name } });
  };

  const paymentMethods = [
    { id: 'upi', label: 'UPI / GPay / PhonePe', icon: <Smartphone size={18} /> },
    { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={18} /> },
    { id: 'cod', label: 'Cash on Delivery', icon: <Banknote size={18} /> },
  ];

  return (
    <div className="checkout-page">
      <div className="container">
        <div style={{ marginBottom: 32 }}>
          <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--text-muted)', fontWeight: 500, fontFamily: 'inherit' }}>
            ← Back to cart
          </button>
          <h1 style={{ fontSize: 28, fontWeight: 900, marginTop: 8, fontFamily: "'Playfair Display', serif" }}>Checkout</h1>
        </div>

        <div className="checkout-grid">
          {/* Left */}
          <div>
            {/* Delivery Address */}
            <div className="checkout-section">
              <h3><MapPin size={18} style={{ color: 'var(--primary)' }} /> Delivery Address</h3>
              <div className="form-group">
                <label className="form-label">Flat / House No.</label>
                <input className="form-input" placeholder="e.g. Flat 4B, Sunshine Apartments" value={address.flat} onChange={e => setAddress(p => ({ ...p, flat: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Area / Street</label>
                <input className="form-input" placeholder="e.g. MG Road, Andheri West" value={address.area} onChange={e => setAddress(p => ({ ...p, area: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input className="form-input" value={address.city} onChange={e => setAddress(p => ({ ...p, city: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Pincode</label>
                  <input className="form-input" placeholder="400001" value={address.pincode} onChange={e => setAddress(p => ({ ...p, pincode: e.target.value }))} />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="checkout-section">
              <h3><Phone size={18} style={{ color: 'var(--primary)' }} /> Contact Number</h3>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{ padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--border)', background: 'var(--bg)', fontSize: 15, fontWeight: 600, color: 'var(--text-muted)' }}>+91</span>
                  <input className="form-input" type="tel" placeholder="10-digit mobile number" value={phone} onChange={e => setPhone(e.target.value)} maxLength={10} />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-section">
              <h3><CreditCard size={18} style={{ color: 'var(--primary)' }} /> Payment Method</h3>
              <div className="payment-options">
                {paymentMethods.map(m => (
                  <div key={m.id} className={`payment-option ${payment === m.id ? 'selected' : ''}`} onClick={() => setPayment(m.id)}>
                    <div className="payment-radio">
                      <div className="payment-radio-dot" />
                    </div>
                    <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>{m.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{m.label}</span>
                    {m.id === 'upi' && <span style={{ marginLeft: 'auto', fontSize: 20 }}>₿</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div className="order-summary-card">
            <h3>Order Summary</h3>

            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <span className="summary-item-name">{item.name}</span>
                  <span className="summary-item-qty">×{item.quantity}</span>
                  <span className="summary-item-price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                <Tag size={12} style={{ marginRight: 4 }} /> Apply Coupon
              </p>
              {appliedCoupon ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(42,157,143,0.08)', borderRadius: 10, padding: '10px 14px' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#2A9D8F' }}>🎉 {appliedCoupon.code} applied</span>
                  <button onClick={() => setAppliedCoupon(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--secondary)', fontWeight: 700, fontSize: 14 }}>Remove</button>
                </div>
              ) : (
                <div className="coupon-input-wrap">
                  <input className="coupon-input" placeholder="WELCOME50" value={couponCode} onChange={e => setCouponCode(e.target.value)} />
                  <button className="coupon-apply-btn" onClick={applyCode}>Apply</button>
                </div>
              )}
            </div>

            {/* Price breakdown */}
            <div className="cart-summary">
              <div className="cart-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="cart-row"><span>Delivery</span><span>{deliveryFee === 0 ? <span style={{ color: '#2A9D8F', fontWeight: 600 }}>FREE</span> : `₹${deliveryFee}`}</span></div>
              {discount > 0 && <div className="cart-row"><span>Coupon discount</span><span style={{ color: '#2A9D8F', fontWeight: 600 }}>-₹{discount}</span></div>}
              <div className="cart-row"><span>Taxes & fees</span><span>₹{tax}</span></div>
              <div className="cart-row total"><span>Total</span><span style={{ color: 'var(--primary)' }}>₹{total}</span></div>
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder} disabled={placing}>
              {placing ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                  Placing Order...
                </span>
              ) : `🚀 Place Order · ₹${total}`}
            </button>

            <p style={{ fontSize: 11, color: 'var(--text-light)', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
              By placing the order, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
