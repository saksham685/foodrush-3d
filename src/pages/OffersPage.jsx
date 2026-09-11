import React, { useState } from 'react';
import { offers } from '../data/restaurants';
import toast from 'react-hot-toast';

const OfferCard = ({ offer }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code).catch(() => {});
    setCopied(true);
    toast.success(`Coupon "${offer.code}" copied!`, {
      icon: '🎉',
      style: { borderRadius: 12, fontWeight: 600 },
      position: 'bottom-center'
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="offer-card" onClick={handleCopy} title="Click to copy code"
      style={{ borderColor: offer.color + '30' }}>
      <div className="offer-bg"
        style={{ background: `radial-gradient(circle at 80% 20%, ${offer.color}, transparent 70%)` }} />

      <span className="offer-icon">{offer.icon}</span>

      <div className="offer-title" style={{ color: offer.color }}>{offer.title}</div>
      <p className="offer-desc">{offer.description}</p>

      <div className="offer-code" style={{ borderColor: offer.color, color: offer.color }}>
        {copied ? '✅ Copied!' : `🏷️ ${offer.code}`}
      </div>

      <p className="offer-expiry">Min order ₹{offer.minOrder} · Valid till {offer.expiry}</p>
    </div>
  );
};

const OffersPage = ({ asSection }) => {
  const content = (
    <>
      {!asSection && (
        <div className="section-header">
          <span className="section-badge">Exclusive Deals</span>
          <h2 className="section-title">Offers & Coupons</h2>
          <p className="section-subtitle">Click on any coupon to copy the code</p>
        </div>
      )}

      <div className="offers-grid">
        {offers.map(offer => <OfferCard key={offer.id} offer={offer} />)}
      </div>

      {/* Floating visual elements */}
      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, fontSize: 32, marginBottom: 16, opacity: 0.3 }}>
          {['🎁', '💰', '🎉', '🔥', '⭐'].map((e, i) => (
            <span key={i} style={{ animation: `float ${4 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>{e}</span>
          ))}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>More deals dropping every week!</p>
      </div>
    </>
  );

  if (asSection) return <section className="section"><div className="container">{content}</div></section>;

  return (
    <div style={{ paddingTop: 'var(--navbar-h)', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, #FFF8F5, #F5F0EB)', padding: '48px 0 40px', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16, animation: 'floatSlow 4s ease-in-out infinite' }}>🎁</div>
          <span className="section-badge">Limited Time</span>
          <h1 className="section-title">Hot Offers for You</h1>
          <p className="section-subtitle">Use these exclusive coupons on checkout to save big</p>
        </div>
      </div>
      <section className="section">
        <div className="container">{content}</div>
      </section>
    </div>
  );
};

export default OffersPage;
