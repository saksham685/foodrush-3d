import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        {/* Brand */}
        <div>
          <div className="footer-logo">
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(145deg, var(--primary-light), var(--primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0, boxShadow: '0 4px 16px rgba(255,87,34,0.35)' }}>🍔</div>
            FoodRush
          </div>
          <p className="footer-desc" style={{ maxWidth: 260 }}>
            Connecting hungry people with the best local restaurants. Fast, fresh, and always reliable.
          </p>

          {/* Newsletter */}
          <div style={{ marginTop: 24 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Stay updated</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input placeholder="your@email.com" style={{ flex: 1, padding: '9px 14px', borderRadius: 10, border: '1px solid #333', background: '#2c2a28', fontSize: 13, color: 'white', outline: 'none', fontFamily: 'inherit' }} />
              <button style={{ padding: '9px 16px', borderRadius: 10, background: 'var(--primary)', border: 'none', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 13, transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-light)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--primary)'}>
                ✓
              </button>
            </div>
          </div>

          <div className="footer-socials" style={{ marginTop: 20 }}>
            {['📸', '🐦', '📘', '▶️'].map((icon, i) => (
              <a key={i} href="#" className="social-btn">{icon}</a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            {['About Us', 'Careers', 'Press', 'Blog', 'Investors'].map(l => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>For You</h4>
          <ul>
            <li><Link to="/restaurants">Restaurants</Link></li>
            <li><Link to="/offers">Offers & Coupons</Link></li>
            <li><Link to="/tracking">Track Order</Link></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">FoodRush Pro</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            {['Help Centre', 'Contact Us', 'Privacy Policy', 'Terms & Conditions', 'Refund Policy'].map(l => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>

          {/* Contact */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #2c2a28' }}>
            <p style={{ fontSize: 11, color: '#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>Contact</p>
            <p style={{ fontSize: 13, color: '#666' }}>📧 hello@foodrush.in</p>
            <p style={{ fontSize: 13, color: '#666', marginTop: 4 }}>📞 1800-123-4567</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2026 FoodRush 3D. All rights reserved. Made with ❤️ in India.</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#444', fontWeight: 600 }}>We accept</span>
          {['💳', '📱', '🏦', '💵'].map((p, i) => (
            <span key={i} style={{ fontSize: 18, opacity: 0.5 }}>{p}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
