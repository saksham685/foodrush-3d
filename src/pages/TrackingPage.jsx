import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const steps = [
  { id: 0, label: 'Order\nConfirmed', icon: '✅', time: '2 sec' },
  { id: 1, label: 'Restaurant\nPreparing', icon: '👨‍🍳', time: '10 min' },
  { id: 2, label: 'Food\nPicked Up', icon: '📦', time: '15 min' },
  { id: 3, label: 'Out for\nDelivery', icon: '🛵', time: '25 min' },
  { id: 4, label: 'Delivered', icon: '🏠', time: '35 min' },
];

const TrackingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Simulate order progression
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(2), 8000),
      setTimeout(() => setCurrentStep(3), 16000),
      setTimeout(() => setCurrentStep(4), 24000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const progress = (currentStep / (steps.length - 1)) * 100;
  const scooterLeft = Math.min(progress, 90);

  return (
    <div className="tracking-page">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="section-badge">Live Tracking</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, marginBottom: 8 }}>Track Your Order</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Watch your food make its way to you</p>
        </div>

        <div className="tracking-card">
          {/* Order ID */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Order ID</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>#FR8X9Z</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Estimated Time</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: '#2A9D8F' }}>
                {currentStep === 4 ? '🎉 Delivered!' : `~${35 - currentStep * 8} min`}
              </p>
            </div>
          </div>

          {/* Current status badge */}
          <div style={{ background: 'rgba(255,107,53,0.08)', borderRadius: 12, padding: '12px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24, animation: 'pulse 2s infinite' }}>{steps[currentStep].icon}</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                {steps[currentStep].label.replace('\n', ' ')}
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {currentStep === 1 && 'The restaurant has started preparing your order'}
                {currentStep === 2 && 'Your order has been picked up by the delivery partner'}
                {currentStep === 3 && 'Your order is on the way to you'}
                {currentStep === 4 && 'Your order has been delivered. Enjoy your meal!'}
                {currentStep === 0 && 'Your order has been confirmed'}
              </p>
            </div>
          </div>

          {/* 3D Road with scooter */}
          <div style={{ position: 'relative', marginBottom: 8 }}>
            <div className="tracking-road">
              <div className="tracking-road-fill" style={{ width: `${progress}%` }} />
              <span className="tracking-scooter" style={{ left: `calc(${scooterLeft}% - 18px)` }}>🛵</span>
            </div>
          </div>

          {/* Steps */}
          <div className="tracking-steps">
            {steps.map((step, i) => (
              <div key={step.id} className="tracking-step">
                <div className={`step-dot ${i === currentStep ? 'active' : i < currentStep ? 'done' : ''}`}>
                  {i < currentStep ? '✓' : step.icon}
                </div>
                <span className={`step-label ${i === currentStep ? 'active' : ''}`} style={{ whiteSpace: 'pre-line' }}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Delivery Partner */}
          <div style={{ marginTop: 32, padding: 20, background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
              👨
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Rahul Kumar</p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Your Delivery Partner · ⭐ 4.9 rating</p>
            </div>
            <button style={{ width: 44, height: 44, borderRadius: '50%', background: 'white', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 20, transition: 'all 0.2s', boxShadow: 'var(--shadow-sm)' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}>
              📞
            </button>
          </div>

          {/* Map placeholder */}
          <div style={{
            marginTop: 20, height: 180, borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px dashed rgba(42,157,143,0.3)', flexDirection: 'column', gap: 8
          }}>
            <span style={{ fontSize: 48 }}>🗺️</span>
            <p style={{ color: '#2A9D8F', fontWeight: 600, fontSize: 14 }}>Live map tracking</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>Real-time GPS tracking in the mobile app</p>
          </div>

          {currentStep === 4 && (
            <div style={{ marginTop: 24, textAlign: 'center', animation: 'popIn 0.5s ease' }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Delivered! Enjoy your meal!</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: 14 }}>How was your experience?</p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', fontSize: 32, marginBottom: 20 }}>
                {['😞', '😐', '😊', '😄', '🤩'].map((e, i) => (
                  <span key={i} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseEnter={e2 => e2.currentTarget.style.transform = 'scale(1.3)'}
                    onMouseLeave={e2 => e2.currentTarget.style.transform = ''}>{e}</span>
                ))}
              </div>
              <Link to="/restaurants" className="btn-primary">Order Again 🍔</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
