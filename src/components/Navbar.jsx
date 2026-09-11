import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, MapPin, User, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLocationContext } from '../context/LocationContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { user, logout, openAuth } = useAuth();
  const { selectedLocation, setIsLocationModalOpen } = useLocationContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setUserDropdown(false); }, [location]);

  useEffect(() => {
    if (!userDropdown) return;
    const handler = (e) => {
      if (!e.target.closest('.nav-user-btn') && !e.target.closest('.user-dropdown')) {
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [userDropdown]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Restaurants & Food', path: '/restaurants' },
    { label: 'Offers', path: '/offers' },
    { label: 'Track Order', path: '/tracking' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : 'top'}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">🍔</div>
            FoodRush
          </Link>

          {/* Nav links */}
          <ul className="navbar-links">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path} className={location.pathname === link.path ? 'active' : ''}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Location pill - Interactive */}
          <button 
            className="nav-location" 
            onClick={() => setIsLocationModalOpen(true)}
            title="Click to change delivery location"
          >
            <MapPin size={13} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <span style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedLocation}
            </span>
            <ChevronDown size={13} style={{ opacity: 0.5 }} />
          </button>

          {/* Right actions */}
          <div className="navbar-actions">
            <button className="nav-icon-btn" onClick={() => navigate('/restaurants')} title="Search Food & Restaurants">
              <Search size={18} />
            </button>

            <button
              className="nav-icon-btn"
              onClick={() => setIsCartOpen(true)}
              title="Cart"
              style={{ position: 'relative' }}
            >
              <ShoppingCart size={18} />
              {itemCount > 0 && <span className="badge-dot">{itemCount > 9 ? '9+' : itemCount}</span>}
            </button>

            {user ? (
              <div style={{ position: 'relative' }}>
                <button className="nav-user-btn" onClick={() => setUserDropdown(!userDropdown)}>
                  <div className="nav-avatar">{user.avatar}</div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                    {user.name?.split(' ')[0]}
                  </span>
                  <ChevronDown size={12} style={{ opacity: 0.5, transition: 'transform 0.2s', transform: userDropdown ? 'rotate(180deg)' : '' }} />
                </button>

                {userDropdown && (
                  <div className="user-dropdown" style={{
                    position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: 200,
                    background: 'white', borderRadius: 18, border: '1.5px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)', overflow: 'hidden', zIndex: 1001,
                    animation: 'slideDown 0.25s var(--ease-spring)'
                  }}>
                    <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid var(--border)' }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{user.name}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{user.email}</p>
                    </div>
                    {[
                      { label: '👤 Profile', path: '/profile' },
                      { label: '📦 My Orders', path: '/tracking' },
                      { label: '🎁 Offers', path: '/offers' },
                    ].map(item => (
                      <Link key={item.path} to={item.path} style={{
                        display: 'flex', alignItems: 'center', padding: '11px 16px',
                        fontSize: 14, fontWeight: 500, color: 'var(--text)', textDecoration: 'none',
                        transition: 'all 0.15s'
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,87,34,0.06)'; e.currentTarget.style.paddingLeft = '20px'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.paddingLeft = '16px'; }}>
                        {item.label}
                      </Link>
                    ))}
                    <div style={{ borderTop: '1px solid var(--border)', padding: '4px 0' }}>
                      <button onClick={() => { logout(); setUserDropdown(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 16px', fontSize: 14, fontWeight: 500, color: 'var(--secondary)', background: 'none', border: 'none', width: '100%', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(230,57,70,0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = ''}>
                        <LogOut size={14} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="nav-login-btn" onClick={() => openAuth('login')}>
                <User size={15} />
                <span>Login</span>
              </button>
            )}

            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button 
            onClick={() => { setIsLocationModalOpen(true); setMenuOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)', fontWeight: 700 }}
          >
            <MapPin size={16} /> Location: {selectedLocation}
          </button>
          <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
          {navLinks.map(link => (
            <Link key={link.path} to={link.path}>{link.label}</Link>
          ))}
          <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
          <button onClick={() => { setIsCartOpen(true); setMenuOpen(false); }}>
            🛒 Cart {itemCount > 0 && `(${itemCount} items)`}
          </button>
          {!user ? (
            <button onClick={() => { openAuth('login'); setMenuOpen(false); }}>
              👤 Login / Sign Up
            </button>
          ) : (
            <>
              <Link to="/profile">👤 My Profile</Link>
              <button onClick={() => { logout(); setMenuOpen(false); }} style={{ color: 'var(--secondary)' }}>
                🚪 Logout
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
