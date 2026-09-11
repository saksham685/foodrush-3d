import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import RestaurantGrid from '../components/RestaurantGrid';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import { useNavigate } from 'react-router-dom';
import { offers } from '../data/restaurants';

/* ── Why Us ── */
const WhyUs = () => (
  <section className="section">
    <div className="container">
      <div className="section-header">
        <span className="section-badge">Why FoodRush?</span>
        <h2 className="section-title">Built for food <em>lovers</em></h2>
        <p className="section-subtitle">We obsess over every detail so your experience is always perfect</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
        {[
          { icon: '⚡', title: 'Lightning Fast', desc: 'Average delivery in under 30 minutes — your food always arrives hot.', color: '#FF5722' },
          { icon: '🌟', title: 'Premium Quality', desc: 'Only top-rated restaurants. Every dish meets our quality standards.', color: '#FFB300' },
          { icon: '💰', title: 'Best Prices', desc: 'No hidden fees. Transparent pricing with exclusive deals and cashbacks.', color: '#00BFA5' },
          { icon: '🛡️', title: 'Safe & Secure', desc: 'Contactless delivery, tamper-proof packaging, encrypted payments.', color: '#7C3AED' },
        ].map((item, i) => (
          <div key={i}
            style={{
              background: 'white', borderRadius: 24, padding: 28,
              border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.4s var(--ease-spring)', cursor: 'default', position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              e.currentTarget.style.borderColor = item.color + '30';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            {/* Accent circle */}
            <div style={{
              position: 'absolute', top: -20, right: -20, width: 100, height: 100,
              borderRadius: '50%', background: item.color, opacity: 0.06, pointerEvents: 'none'
            }} />

            <div style={{
              width: 56, height: 56, borderRadius: 16, marginBottom: 18,
              background: item.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26,
              transition: 'transform 0.4s var(--ease-spring)'
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(-6deg)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
            >
              {item.icon}
            </div>

            <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em', color: 'var(--text)' }}>{item.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Offers Banner ── */
const OffersBanner = () => {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '0 0 80px' }}>
      <div className="container">
        <div style={{
          background: 'linear-gradient(135deg, #1C1917 0%, #2D2521 100%)',
          borderRadius: 32, padding: '44px 48px',
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center',
          position: 'relative', overflow: 'hidden'
        }}>
          {/* Glow */}
          <div style={{ position: 'absolute', top: -60, right: 200, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,87,34,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              {offers.slice(0, 2).map(o => (
                <span key={o.id} style={{ background: 'rgba(255,87,34,0.2)', color: '#FF7043', fontSize: 12, fontWeight: 800, padding: '5px 12px', borderRadius: 100, letterSpacing: '0.5px', border: '1px solid rgba(255,87,34,0.3)' }}>
                  🏷️ {o.code}
                </span>
              ))}
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: 'white', marginBottom: 8, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Exclusive offers <em style={{ color: 'var(--gold)' }}>just for you</em>
            </h2>
            <p style={{ fontSize: 15, color: '#888', lineHeight: 1.6 }}>
              Use our limited-time coupons and save up to ₹150 on your next order.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, zIndex: 1, flexShrink: 0 }}>
            <button className="btn-primary" style={{ fontSize: 15 }} onClick={() => navigate('/offers')}>
              View All Offers →
            </button>
            <button className="btn-outline" style={{ fontSize: 14, color: '#888', borderColor: '#444', padding: '10px 24px' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#888'; }}
              onClick={() => navigate('/restaurants')}>
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── App Download ── */
const AppDownload = () => (
  <section style={{ background: 'var(--bg-dark)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: -100, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,87,34,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', bottom: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,179,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-badge" style={{ background: 'rgba(255,87,34,0.15)', color: '#FF7043' }}>Mobile App</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 900, color: 'white', marginBottom: 16, lineHeight: 1.05, letterSpacing: '-0.03em', marginTop: 12 }}>
            Get the app.<br />
            <em style={{ color: 'var(--gold)' }}>Order anything.</em>
          </h2>
          <p style={{ fontSize: 16, color: '#777', lineHeight: 1.75, marginBottom: 36, maxWidth: 380 }}>
            App-exclusive deals, real-time GPS tracking, one-tap reordering and instant notifications. Available on iOS & Android.
          </p>

          {/* App store buttons */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {[
              { icon: '🍎', label: 'App Store', sub: 'Download on the' },
              { icon: '🤖', label: 'Google Play', sub: 'Get it on' },
            ].map((btn, i) => (
              <button key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: i === 0 ? 'white' : 'rgba(255,255,255,0.08)',
                border: i === 0 ? 'none' : '1.5px solid rgba(255,255,255,0.15)',
                padding: '12px 24px', borderRadius: 14, cursor: 'pointer',
                transition: 'all 0.25s',
                color: i === 0 ? '#1C1917' : 'white',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = i === 0 ? 'var(--shadow-lg)' : '0 8px 24px rgba(0,0,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                <span style={{ fontSize: 28 }}>{btn.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 10, opacity: 0.6, fontWeight: 500 }}>{btn.sub}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em' }}>{btn.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* App mockup */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 200, height: 360, borderRadius: 32, border: '3px solid rgba(255,255,255,0.15)',
            background: 'linear-gradient(145deg, rgba(255,87,34,0.15), rgba(255,179,0,0.08))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 80, animation: 'float 5s ease-in-out infinite',
            boxShadow: '0 32px 64px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
            flexShrink: 0,
          }}>
            📱
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {['⭐ 4.9 Rating', '🔒 Secure Pay', '📍 Live Track', '🔔 Notifications'].map((feat, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 12, padding: '10px 16px', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)',
                animation: `float ${4 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.4}s`
              }}>
                {feat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Home Page ── */
const HomePage = () => (
  <div>
    <Hero />
    <HowItWorks />
    <Categories />
    <RestaurantGrid limit={6} />
    <WhyUs />
    <OffersBanner />
    <Testimonials />
    <AppDownload />
  </div>
);

export default HomePage;
