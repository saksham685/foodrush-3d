import React, { useState } from 'react';
import { categories } from '../data/restaurants';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const handleClick = (cat) => {
    setActive(cat.id);
    navigate('/restaurants', { state: { category: cat.name } });
  };

  return (
    <section className="section" style={{ background: 'var(--bg-alt)', padding: '60px 0' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: 32 }}>
          <span className="section-badge">Browse by Category</span>
          <h2 className="section-title">What are you craving?</h2>
        </div>

        <div className="categories-track">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`category-card ${active === cat.id ? 'active' : ''}`}
              style={{ '--cat-color': cat.color }}
              onClick={() => handleClick(cat)}
            >
              <div className="cat-img-wrap">
                <img src={cat.image} alt={cat.name} loading="lazy" />
              </div>
              <span className="cat-name">{cat.icon} {cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
