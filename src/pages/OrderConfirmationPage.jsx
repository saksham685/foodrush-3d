import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { orderId, total, items = [], restaurant } = state || {};

  useEffect(() => {
    if (!orderId) navigate('/');
  }, [orderId, navigate]);

  if (!orderId) return null;

  const eta = new Date(Date.now() + 35 * 60 * 1000);
  const etaStr = eta.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          {/* Check animation */}
          <div className="check-circle">
            <svg className="check-svg" viewBox="0 0 48 48">
              <path className="check-path" d="M10 24 L21 35 L38 13" />
            </svg>
          </div>

          <h1 className="confirm-title">Order Confirmed! 🎉</h1>
          <p className="confirm-subtitle">Your food is being prepared with love. Sit back and relax!</p>

          {/* Scooter animation */}
          <div className="scooter-track">
            <div className="scooter-road" />
            <span className="scooter-emoji">🛵</span>
          </div>

          {/* Order details */}
          <div className="confirm-details">
            <div className="confirm-row">
              <span className="label">Order ID</span>
              <span className="value" style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>#{orderId}</span>
            </div>
            <div className="confirm-row">
              <span className="label">Items</span>
              <span className="value">{items.length} item{items.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="confirm-row">
              <span className="label">Amount Paid</span>
              <span className="value" style={{ color: 'var(--primary)', fontSize: 17 }}>₹{total}</span>
            </div>
            <div className="confirm-row">
              <span className="label">Estimated Delivery</span>
              <span className="value" style={{ color: '#2A9D8F' }}>By {etaStr} (~30-35 min)</span>
            </div>
            <div className="confirm-row">
              <span className="label">Status</span>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 100, background: 'rgba(42,157,143,0.1)', color: '#2A9D8F' }}>Restaurant Preparing</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/tracking" className="btn-primary">
              🗺️ Track Order
            </Link>
            <Link to="/restaurants" className="btn-outline">
              Order More Food
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
