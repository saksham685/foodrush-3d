import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RestaurantCard } from '../components/RestaurantGrid';
import FoodCard from '../components/FoodCard';
import { restaurants, menuItems } from '../data/restaurants';
import { useLocationContext } from '../context/LocationContext';
import { Search, MapPin, X, Utensils, Store, Filter } from 'lucide-react';

const RestaurantsPage = () => {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const { selectedLocation, setIsLocationModalOpen } = useLocationContext();

  // Initial search from navigation state or empty
  const [search, setSearch] = useState(routerLocation.state?.initialSearch || routerLocation.state?.category || '');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'dishes', 'restaurants'
  const [sortBy, setSortBy] = useState('rating');
  const [selectedTag, setSelectedTag] = useState('All');

  // Sync if location state changes
  useEffect(() => {
    if (routerLocation.state?.initialSearch) {
      setSearch(routerLocation.state.initialSearch);
    } else if (routerLocation.state?.category) {
      setSearch(routerLocation.state.category);
    }
  }, [routerLocation.state]);

  const query = search.trim().toLowerCase();

  // Filter Dishes
  const matchingDishes = useMemo(() => {
    if (!query) return menuItems;
    return menuItems.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (item.restaurantName && item.restaurantName.toLowerCase().includes(query))
    );
  }, [query]);

  // Filter Restaurants
  const matchingRestaurants = useMemo(() => {
    let list = restaurants.filter(r => {
      // Matches restaurant name or cuisine
      const matchBasic = r.name.toLowerCase().includes(query) || r.cuisine.toLowerCase().includes(query);
      // Or restaurant sells a matched dish!
      const matchDish = menuItems.some(
        m => m.restaurantId === r.id && (
          m.name.toLowerCase().includes(query) || 
          m.category.toLowerCase().includes(query)
        )
      );
      return !query || matchBasic || matchDish;
    });

    if (selectedTag === 'Pure Veg') {
      list = list.filter(r => r.tags.includes('Pure Veg'));
    } else if (selectedTag === 'Under ₹500') {
      list = list.filter(r => r.priceForTwo <= 500);
    } else if (selectedTag === 'Top Rated') {
      list = list.filter(r => r.rating >= 4.6);
    } else if (selectedTag === 'Offers') {
      list = list.filter(r => Boolean(r.offer));
    }

    return list.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'time') return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      if (sortBy === 'price') return a.priceForTwo - b.priceForTwo;
      return 0;
    });
  }, [query, selectedTag, sortBy]);

  const quickTags = ['All', 'Pure Veg', 'Under ₹500', 'Top Rated', 'Offers'];

  const totalResults = matchingDishes.length + matchingRestaurants.length;

  return (
    <div style={{ paddingTop: 'var(--navbar-h)', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Search Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #FFF8F5, #F5F0EB)', borderBottom: '1.5px solid var(--border)', padding: '40px 0 32px' }}>
        <div className="container">
          {/* Location status pill */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <span className="section-badge" style={{ margin: 0 }}>
              Live Delivery
            </span>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'white', border: '1.5px solid var(--border-strong)',
                padding: '6px 14px', borderRadius: 100, fontSize: 13, fontWeight: 700,
                color: 'var(--primary)', cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <MapPin size={14} /> Delivering to: {selectedLocation} (Change)
            </button>
          </div>

          <h1 className="section-title" style={{ marginBottom: 8, textAlign: 'left' }}>
            {query ? `Search results for "${query}"` : 'Explore Food & Restaurants'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 24 }}>
            Serving over 100+ fresh dishes and local top-rated kitchens in {selectedLocation}
          </p>

          {/* Search bar input with clear button */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 260, position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search any food (e.g. biryani, pizza, burger, momos, noodles, butter chicken)..."
                style={{
                  width: '100%', padding: '14px 44px 14px 46px',
                  borderRadius: 'var(--radius-md)', border: '2px solid var(--border-strong)',
                  background: 'white', fontSize: 15, outline: 'none', fontFamily: 'inherit',
                  boxShadow: 'var(--shadow-xs)', transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-strong)'}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center'
                  }}
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                padding: '12px 18px', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-strong)',
                background: 'white', fontSize: 14, fontWeight: 700, outline: 'none', cursor: 'pointer',
                color: 'var(--text)', fontFamily: 'inherit'
              }}
            >
              <option value="rating">⭐ Top Rated</option>
              <option value="time">⚡ Fastest Delivery</option>
              <option value="price">💰 Price (Low to High)</option>
            </select>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginRight: 4 }}>
              Filters:
            </span>
            {quickTags.map(tag => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  style={{
                    padding: '7px 16px', borderRadius: '100px',
                    border: isSelected ? '1.5px solid var(--primary)' : '1.5px solid var(--border-strong)',
                    background: isSelected ? 'var(--primary)' : 'white',
                    color: isSelected ? 'white' : 'var(--text)',
                    fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    transition: 'all 0.2s', fontFamily: 'inherit'
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs: All / Dishes / Restaurants */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: 'var(--navbar-h)', zIndex: 90 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, padding: '10px 0' }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', borderRadius: 100, border: 'none',
                background: activeTab === 'all' ? 'var(--primary)' : 'var(--bg-alt)',
                color: activeTab === 'all' ? 'white' : 'var(--text)',
                fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.2s'
              }}
            >
              All Results ({matchingDishes.length + matchingRestaurants.length})
            </button>
            <button
              onClick={() => setActiveTab('dishes')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', borderRadius: 100, border: 'none',
                background: activeTab === 'dishes' ? 'var(--primary)' : 'var(--bg-alt)',
                color: activeTab === 'dishes' ? 'white' : 'var(--text)',
                fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.2s'
              }}
            >
              <Utensils size={15} /> Food & Dishes ({matchingDishes.length})
            </button>
            <button
              onClick={() => setActiveTab('restaurants')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', borderRadius: 100, border: 'none',
                background: activeTab === 'restaurants' ? 'var(--primary)' : 'var(--bg-alt)',
                color: activeTab === 'restaurants' ? 'white' : 'var(--text)',
                fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.2s'
              }}
            >
              <Store size={15} /> Restaurants ({matchingRestaurants.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ padding: '40px 24px 80px' }}>
        {totalResults === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: 24, border: '1.5px solid var(--border)' }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>
              No food or restaurants found for "{search}"
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 15 }}>
              Try searching for popular favourites like Biryani, Pizza, Burger, Noodles, Momos, or Paneer!
            </p>
            <button 
              className="btn-primary" 
              onClick={() => { setSearch(''); setSelectedTag('All'); }}
            >
              View All Food Items
            </button>
          </div>
        ) : (
          <>
            {/* 1. DISHES SECTION */}
            {(activeTab === 'all' || activeTab === 'dishes') && matchingDishes.length > 0 && (
              <div style={{ marginBottom: 56 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 900, fontFamily: "'Playfair Display', serif", color: 'var(--text)' }}>
                      Dishes & Food Items ({matchingDishes.length})
                    </h2>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                      Instant items you can add straight to your cart
                    </p>
                  </div>
                  {activeTab === 'all' && matchingDishes.length > 4 && (
                    <button 
                      onClick={() => setActiveTab('dishes')}
                      style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
                    >
                      View all {matchingDishes.length} dishes →
                    </button>
                  )}
                </div>

                <div className="food-grid">
                  {(activeTab === 'all' ? matchingDishes.slice(0, 8) : matchingDishes).map(item => (
                    <FoodCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* 2. RESTAURANTS SECTION */}
            {(activeTab === 'all' || activeTab === 'restaurants') && matchingRestaurants.length > 0 && (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 900, fontFamily: "'Playfair Display', serif", color: 'var(--text)' }}>
                    Restaurants ({matchingRestaurants.length})
                  </h2>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Serving delicious food around {selectedLocation}
                  </p>
                </div>

                <div className="restaurant-grid">
                  {matchingRestaurants.map(r => (
                    <RestaurantCard key={r.id} restaurant={r} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantsPage;
