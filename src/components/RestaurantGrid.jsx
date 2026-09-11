import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Clock, Star } from 'lucide-react';
import { restaurants } from '../data/restaurants';

const RestaurantCard = ({ restaurant }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, visible: false });
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useCart();
  const fav = isFavorite(restaurant.id);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setTilt({ x: x * 8, y: y * -8, visible: true });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0, visible: false });

  return (
    <div
      ref={cardRef}
      className="restaurant-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.visible
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
          : 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)',
        transition: tilt.visible ? 'transform 0.1s ease' : 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
      }}
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      <div className="restaurant-img-wrap">
        <img src={restaurant.image} alt={restaurant.name} loading="lazy" />
        {restaurant.offer && (
          <span className="restaurant-offer-badge">{restaurant.offer}</span>
        )}
        <button
          className={`restaurant-fav-btn ${fav ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(restaurant.id); }}
        >
          {fav ? '❤️' : '🤍'}
        </button>
        <div className="restaurant-logo">{restaurant.logo}</div>
      </div>

      <div className="restaurant-body">
        <div className="restaurant-name">{restaurant.name}</div>
        <div className="restaurant-cuisine">{restaurant.cuisine}</div>
        <div className="restaurant-meta">
          <span className="restaurant-rating">
            <Star size={11} fill="currentColor" /> {restaurant.rating}
          </span>
          <span className="restaurant-time">
            <Clock size={12} /> {restaurant.deliveryTime}
          </span>
          <span className="restaurant-price">₹{restaurant.priceForTwo} for two</span>
        </div>
        {restaurant.tags?.length > 0 && (
          <div className="restaurant-tags">
            {restaurant.tags.map(tag => (
              <span key={tag} className={`restaurant-tag ${tag.toLowerCase().replace(' ', '-')}`}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const RestaurantGrid = ({ limit, showAll }) => {
  const navigate = useNavigate();
  const list = limit ? restaurants.slice(0, limit) : restaurants;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Top Picks</span>
          <h2 className="section-title">Popular Restaurants</h2>
          <p className="section-subtitle">Handpicked restaurants loved by your neighbours</p>
        </div>

        <div className="restaurant-grid">
          {list.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>

        {!showAll && (
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button className="btn-outline" onClick={() => navigate('/restaurants')}>
              View All Restaurants →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export { RestaurantCard };
export default RestaurantGrid;
