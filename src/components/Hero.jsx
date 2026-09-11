import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, ArrowRight } from 'lucide-react';
import { useLocationContext } from '../context/LocationContext';

const Hero = () => {
  const navigate = useNavigate();
  const { selectedLocation, setIsLocationModalOpen } = useLocationContext();
  const sceneRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [searchVal, setSearchVal] = useState('');

  const handleMouseMove = (e) => {
    if (!sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 14, y: x * -14 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/restaurants', { state: { initialSearch: searchVal } });
  };

  return (
    <section className="hero">
      {/* Ambient orbs */}
      <div className="hero-orb-1" />
      <div className="hero-orb-2" />
      <div className="hero-orb-3" />
      <div className="hero-grid" />

      <div className="container">
        <div className="hero-inner">
          {/* ── Left ── */}
          <div className="hero-left">
            <div 
              className="hero-tag" 
              onClick={() => setIsLocationModalOpen(true)}
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              title="Click to change your delivery location"
            >
              <span className="hero-tag-pulse" />
              📍 Delivering to: <strong>{selectedLocation}</strong> (Tap to change)
            </div>

            <h1 className="hero-title">
              Your cravings.<br />
              <span className="highlight">Delivered.</span>
            </h1>

            <p className="hero-subtitle">
              Order your favourite meals from the best restaurants around you in {selectedLocation}.
              Fresh, fast, and always on time — delivered with love. 🍕
            </p>

            {/* Search bar */}
            <form className="hero-search" onSubmit={handleSearch}>
              <Search size={16} style={{ color: 'var(--text-light)', flexShrink: 0 }} />
              <input
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search food like biryani, pizza, burger, momos..."
              />
              <button type="submit" className="hero-search-btn">
                Search
              </button>
            </form>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/restaurants')} style={{ fontSize: 16, padding: '15px 32px' }}>
                Explore Food <ChevronRight size={18} />
              </button>
              <button className="btn-outline" onClick={() => navigate('/restaurants')} style={{ fontSize: 16, padding: '13px 28px' }}>
                View Restaurants
              </button>
            </div>

            <div className="hero-stats">
              {[
                { value: '50+', label: 'Restaurants' },
                { value: '10k+', label: 'Happy Customers' },
                { value: '25 min', label: 'Avg. Delivery' },
              ].map((s, i) => (
                <div key={i} className="hero-stat">
                  <span className="hero-stat-value">{s.value}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: 3D Scene ── */}
          <div className="hero-right">
            <div
              className="hero-3d-scene"
              ref={sceneRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="orbit-ring" />
              <div className="orbit-ring-inner" />
              <div className="meal-glow" />

              {/* Floating ingredients */}
              <span className="ingredient">🍅</span>
              <span className="ingredient">🥬</span>
              <span className="ingredient">🧅</span>
              <span className="ingredient">🌶️</span>
              <span className="ingredient">🧄</span>

              {/* Main meal */}
              <img
                className="meal-main-img"
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80"
                alt="Delicious Burger"
                style={{
                  transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`,
                  transition: tilt.x === 0 ? 'transform 0.7s var(--ease-spring)' : 'transform 0.12s ease',
                }}
              />
              <div className="meal-shadow-outer" />

              {/* Badges */}
              <div className="hero-badge top-left">
                <span className="badge-icon">⭐</span>
                <div className="badge-text">
                  <strong>4.9 Rated</strong>
                  <span>by customers</span>
                </div>
              </div>
              <div className="hero-badge top-right">
                <span className="badge-icon">🚴</span>
                <div className="badge-text">
                  <strong>25 min</strong>
                  <span>Avg. Delivery</span>
                </div>
              </div>
              <div className="hero-badge bottom-left">
                <span className="badge-icon">🔥</span>
                <div className="badge-text">
                  <strong>10k+ Happy</strong>
                  <span>Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.4,
        animation: 'float 3s ease-in-out infinite'
      }}>
        <div style={{ width: 1, height: 48, background: 'var(--text)' }} />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
