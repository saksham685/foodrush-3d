import React from 'react';

const steps = [
  { icon: '📍', title: 'Set Your Location', desc: 'Tell us where you are and we\'ll show the best restaurants near you.', num: 1 },
  { icon: '🍔', title: 'Pick Your Meal', desc: 'Browse menus, read reviews and choose exactly what you\'re craving.', num: 2 },
  { icon: '💳', title: 'Easy Checkout', desc: 'Pay securely in seconds — UPI, card or cash on delivery.', num: 3 },
  { icon: '🚴', title: 'Fast Delivery', desc: 'Track your order in real-time as it makes its way to your door.', num: 4 },
];

const HowItWorks = () => (
  <section className="section" style={{ background: 'var(--bg-alt)' }}>
    <div className="container">
      <div className="section-header">
        <span className="section-badge">Simple Process</span>
        <h2 className="section-title">How <em>FoodRush</em> works</h2>
        <p className="section-subtitle">Getting your favourite food has never been easier</p>
      </div>

      <div className="how-steps">
        {steps.map((step, i) => (
          <div key={i} className="how-step">
            <div className="how-step-icon">
              {step.icon}
              <span className="how-step-num">{step.num}</span>
            </div>
            <div className="how-step-title">{step.title}</div>
            <div className="how-step-desc">{step.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
