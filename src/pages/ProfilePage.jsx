import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { restaurants, menuItems } from '../data/restaurants';
import { User, ShoppingBag, MapPin, Heart, Tag, LogOut, Edit3, ChevronRight } from 'lucide-react';

const navItems = [
  { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={16} /> },
  { id: 'profile', label: 'Profile Info', icon: <User size={16} /> },
  { id: 'addresses', label: 'Saved Addresses', icon: <MapPin size={16} /> },
  { id: 'favorites', label: 'Favourites', icon: <Heart size={16} /> },
  { id: 'offers', label: 'My Offers', icon: <Tag size={16} /> },
];

const mockOrders = [
  { id: 'FR8X9Z', date: '11 Sep 2026', restaurant: 'Burger District', items: 'Double Smash Burger ×2', total: 898, status: 'Delivered', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80' },
  { id: 'FR7A2B', date: '8 Sep 2026', restaurant: 'Spice Route', items: 'Butter Chicken, Dal Makhani', total: 598, status: 'Delivered', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80' },
  { id: 'FR6C3D', date: '2 Sep 2026', restaurant: 'Pizza Craft', items: 'BBQ Chicken Pizza', total: 449, status: 'Delivered', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80' },
];

const ProfilePage = () => {
  const { user, logout, openAuth } = useAuth();
  const { favorites } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [editMode, setEditMode] = useState(false);

  if (!user) {
    return (
      <div style={{ paddingTop: 'var(--navbar-h)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <div style={{ fontSize: 80 }}>👤</div>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>Please log in</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Access your profile, orders and favourites</p>
        <button className="btn-primary" onClick={() => openAuth('login')}>Login / Sign Up</button>
      </div>
    );
  }

  const favRestaurants = restaurants.filter(r => favorites.includes(r.id));

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>My Orders</h2>
            {mockOrders.map(order => (
              <div key={order.id} className="order-history-item" onClick={() => navigate('/tracking')}>
                <img className="order-history-img" src={order.img} alt={order.restaurant} />
                <div className="order-history-info">
                  <div className="order-history-name">{order.restaurant}</div>
                  <div className="order-history-meta">{order.items}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>{order.date} · #{order.id}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  <div className="order-history-price">₹{order.total}</div>
                  <span className="order-history-status status-delivered">{order.status}</span>
                  <button style={{ fontSize: 11, color: 'var(--primary)', background: 'none', border: '1px solid var(--primary)', borderRadius: 100, padding: '3px 10px', cursor: 'pointer', fontWeight: 600 }}>Reorder</button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'profile':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Profile Information</h2>
              <button onClick={() => setEditMode(!editMode)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '2px solid var(--primary)', color: 'var(--primary)', padding: '8px 16px', borderRadius: 100, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                <Edit3 size={14} /> {editMode ? 'Save' : 'Edit'}
              </button>
            </div>
            {[
              { label: 'Full Name', value: user.name },
              { label: 'Email', value: user.email },
              { label: 'Phone', value: '+91 98765 43210' },
              { label: 'Member Since', value: 'September 2026' },
            ].map(f => (
              <div key={f.label} className="form-group">
                <label className="form-label">{f.label}</label>
                <input className="form-input" defaultValue={f.value} readOnly={!editMode}
                  style={{ background: editMode ? 'white' : 'var(--bg-alt)', cursor: editMode ? 'text' : 'default' }} />
              </div>
            ))}
          </div>
        );
      case 'addresses':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Saved Addresses</h2>
              <button className="btn-primary" style={{ padding: '8px 18px', fontSize: 13 }}>+ Add New</button>
            </div>
            {['Home', 'Office'].map((type, i) => (
              <div key={type} style={{ padding: 20, background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer', border: i === 0 ? '2px solid var(--primary)' : '2px solid transparent' }}>
                <span style={{ fontSize: 24, marginTop: 2 }}>{i === 0 ? '🏠' : '🏢'}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: i === 0 ? 'var(--primary)' : 'var(--text)' }}>{type}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {i === 0 ? 'Flat 4B, Sunshine Apartments, MG Road, Mumbai - 400001' : 'Tech Park, Sector 5, Navi Mumbai - 400706'}
                  </p>
                </div>
                <ChevronRight size={18} style={{ color: 'var(--text-light)', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        );
      case 'favorites':
        return (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Favourites</h2>
            {favRestaurants.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: 60, marginBottom: 12 }}>💔</div>
                <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No favourites yet</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Heart a restaurant to save it here</p>
              </div>
            ) : (
              <div className="restaurant-grid">
                {favRestaurants.map(r => (
                  <div key={r.id} style={{ background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/restaurant/${r.id}`)}>
                    <img src={r.image} alt={r.name} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                    <div style={{ padding: 12 }}>
                      <p style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.cuisine}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'offers':
        return (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>My Offers</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {['WELCOME50 — 50% OFF up to ₹100', 'FOOD20 — 20% OFF above ₹499'].map(o => (
                <div key={o} style={{ padding: '16px 20px', background: 'rgba(255,107,53,0.06)', borderRadius: 'var(--radius-md)', border: '2px dashed rgba(255,107,53,0.3)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>🎁</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', fontFamily: 'monospace' }}>{o}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-grid">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-card" style={{ textAlign: 'center' }}>
              <div className="profile-avatar">{user.avatar}</div>
              <div className="profile-name">{user.name}</div>
              <div className="profile-email">{user.email}</div>
              <div style={{ marginTop: 12, fontSize: 13, color: 'var(--primary)', fontWeight: 600, background: 'rgba(255,107,53,0.08)', borderRadius: 100, padding: '4px 14px', display: 'inline-block' }}>
                ⭐ Gold Member
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-nav">
                {navItems.map(item => (
                  <button key={item.id} className={`profile-nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
                    {item.icon} {item.label}
                    <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.4 }} />
                  </button>
                ))}
                <button className="profile-nav-item danger" onClick={() => { logout(); navigate('/'); }}
                  style={{ color: 'var(--secondary)' }}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="profile-content">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
