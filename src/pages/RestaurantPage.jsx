import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurants, menuItems } from '../data/restaurants';
import FoodCard from '../components/FoodCard';
import { ArrowLeft, Star, Clock, MapPin, Info } from 'lucide-react';

const RestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find(r => r.id === Number(id));
  const items = menuItems.filter(m => m.restaurantId === Number(id));
  const [activeCategory, setActiveCategory] = useState('All');

  if (!restaurant) return (
    <div style={{ paddingTop: 'var(--navbar-h)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <div style={{ fontSize: 80 }}>🍽️</div>
      <h2 style={{ fontSize: 24, fontWeight: 700 }}>Restaurant not found</h2>
      <button className="btn-primary" onClick={() => navigate('/restaurants')}>Browse Restaurants</button>
    </div>
  );

  const categories = ['All', ...new Set(items.map(i => i.category))];
  const filteredItems = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);

  return (
    <div style={{ paddingTop: 'var(--navbar-h)', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Banner */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <img src={restaurant.image} alt={restaurant.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />

        <button onClick={() => navigate(-1)} style={{
          position: 'absolute', top: 20, left: 20,
          width: 40, height: 40, borderRadius: '50%', border: 'none',
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-md)', transition: 'all 0.2s'
        }}>
          <ArrowLeft size={18} />
        </button>

        <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: 'var(--shadow-md)' }}>
              {restaurant.logo}
            </div>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 2 }}>{restaurant.name}</h1>
              <p style={{ fontSize: 14, opacity: 0.85 }}>{restaurant.cuisine}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '16px 0', boxShadow: 'var(--shadow-sm)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ background: '#e8f5e9', color: '#2e7d32', fontWeight: 700, fontSize: 13, padding: '3px 8px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={11} fill="currentColor" /> {restaurant.rating}
              </span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>({restaurant.reviews?.toLocaleString()} reviews)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}>
              <Clock size={14} /> {restaurant.deliveryTime}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>₹{restaurant.priceForTwo} for two</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}>
              <MapPin size={14} /> {restaurant.distance}
            </div>
            {restaurant.offer && (
              <span style={{ marginLeft: 'auto', background: 'rgba(255,107,53,0.1)', color: 'var(--primary)', fontSize: 13, fontWeight: 700, padding: '4px 12px', borderRadius: 100 }}>
                🎉 {restaurant.offer}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: 'var(--navbar-h)', zIndex: 100 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto', padding: '12px 0', scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 18px', borderRadius: '100px', border: 'none',
                  background: activeCategory === cat ? 'var(--primary)' : 'transparent',
                  color: activeCategory === cat ? 'white' : 'var(--text-muted)',
                  fontWeight: 600, fontSize: 14, cursor: 'pointer',
                  transition: 'all 0.2s', whiteSpace: 'nowrap', fontFamily: 'inherit'
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container" style={{ padding: '32px 24px 60px' }}>
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🍽️</div>
            <p style={{ fontSize: 16, color: 'var(--text-muted)' }}>No items in this category</p>
          </div>
        ) : (
          <div className="food-grid">
            {filteredItems.map(item => <FoodCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;
