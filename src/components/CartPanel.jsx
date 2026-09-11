import React from 'react';
import { useCart } from '../context/CartContext';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPanel = () => {
  const {
    isCartOpen, setIsCartOpen, cartItems, removeFromCart,
    updateQuantity, subtotal, deliveryFee, tax, discount,
    total, appliedCoupon, setAppliedCoupon
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="cart-panel">
        {/* Header */}
        <div className="cart-header">
          <h2>
            <ShoppingCart size={20} style={{ color: 'var(--primary)' }} />
            Your Cart
            {cartItems.length > 0 && (
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginLeft: 4 }}>
                ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
          <button className="cart-close" onClick={() => setIsCartOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any items yet.</p>
              <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => { setIsCartOpen(false); navigate('/restaurants'); }}>
                Browse Restaurants
              </button>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img className="cart-item-img" src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">₹{item.price * item.quantity}</div>
                    <div className="cart-item-controls">
                      <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={12} />
                      </button>
                      <span className="cart-qty">{item.quantity}</span>
                      <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={12} />
                      </button>
                      <button className="cart-remove" onClick={() => removeFromCart(item.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="cart-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="cart-row">
                <span>Delivery fee</span>
                <span>{deliveryFee === 0 ? <span style={{ color: '#2A9D8F', fontWeight: 600 }}>FREE</span> : `₹${deliveryFee}`}</span>
              </div>
              {discount > 0 && (
                <div className="cart-row">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span className="discount">-₹{discount}</span>
                </div>
              )}
              <div className="cart-row">
                <span>Taxes & fees</span>
                <span>₹{tax}</span>
              </div>
              <div className="cart-row total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {deliveryFee === 0 && (
              <div style={{ background: 'rgba(42,157,143,0.08)', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#2A9D8F', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                🎉 You've unlocked free delivery!
              </div>
            )}
            {deliveryFee > 0 && (
              <div style={{ background: 'rgba(255,107,53,0.06)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
                Add ₹{500 - subtotal} more for free delivery
              </div>
            )}

            <button className="cart-checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout → ₹{total}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPanel;
