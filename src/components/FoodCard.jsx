import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

const FoodCard = ({ item }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const cartItem = cartItems.find(i => i.id === item.id);
  const qty = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      icon: '🛒',
      style: {
        background: 'white',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-md)',
        fontWeight: 600,
        fontSize: 14,
      },
      position: 'bottom-center',
      duration: 2000,
    });
  };

  return (
    <div className="food-card">
      <div className="food-img-wrap">
        <img src={item.image} alt={item.name} loading="lazy" />
        <div className={`food-veg-indicator ${item.isVeg ? 'veg' : 'non-veg'}`} />
        {item.isBestseller && <span className="food-bestseller">Bestseller</span>}
      </div>

      <div className="food-body">
        <div className="food-name">{item.name}</div>
        <div className="food-desc">{item.description}</div>

        <div className="food-footer">
          <div>
            <div className="food-price">₹{item.price}</div>
            <div className="food-rating">
              <Star size={11} fill="#F4A261" color="#F4A261" />
              <strong>{item.rating}</strong>
            </div>
          </div>

          {qty === 0 ? (
            <button className="add-btn" onClick={handleAdd}>
              <Plus size={16} /> Add
            </button>
          ) : (
            <div className="qty-controls">
              <button className="qty-btn" onClick={() => updateQuantity(item.id, qty - 1)}>
                <Minus size={14} />
              </button>
              <span className="qty-num">{qty}</span>
              <button className="qty-btn" onClick={() => updateQuantity(item.id, qty + 1)}>
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
