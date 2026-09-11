import React, { useState } from 'react';
import { useLocationContext } from '../context/LocationContext';
import { MapPin, X, Navigation, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const LocationModal = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, selectedLocation, updateLocation, popularCities } = useLocationContext();
  const [customInput, setCustomInput] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isLocationModalOpen) return null;

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    updateLocation(customInput);
    toast.success(`Location set to: ${customInput.trim()}`, { icon: '📍' });
    setCustomInput('');
  };

  const handleCitySelect = (city) => {
    updateLocation(city);
    toast.success(`Location set to: ${city}`, { icon: '📍' });
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetecting(false);
        const locName = `Nearby (Lat: ${pos.coords.latitude.toFixed(2)}, Long: ${pos.coords.longitude.toFixed(2)})`;
        updateLocation(locName);
        toast.success('Live location detected!', { icon: '🎯' });
      },
      (err) => {
        setIsDetecting(false);
        // Fallback simulated location
        updateLocation('Connaught Place, New Delhi');
        toast.success('Using current detected city!', { icon: '📍' });
      },
      { timeout: 5000 }
    );
  };

  return (
    <div className="auth-overlay" onClick={() => setIsLocationModalOpen(false)} style={{ zIndex: 3500 }}>
      <div 
        className="auth-card" 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 480, padding: 32 }}
      >
        <button className="auth-close" onClick={() => setIsLocationModalOpen(false)}>
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(255,87,34,0.15), rgba(255,179,0,0.15))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px', fontSize: 24
          }}>
            📍
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 900, fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>
            Choose Delivery Location
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Enter any city, area or street address to discover food near you
          </p>
        </div>

        {/* Custom Input */}
        <form onSubmit={handleCustomSubmit} style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <MapPin size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
              <input
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                placeholder="Type any area, colony or city..."
                style={{
                  width: '100%', padding: '12px 14px 12px 38px',
                  borderRadius: 'var(--radius-sm)', border: '2px solid var(--border-strong)',
                  background: 'white', fontSize: 14, outline: 'none', fontFamily: 'inherit'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-strong)'}
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ padding: '0 20px', borderRadius: 'var(--radius-sm)', fontSize: 14 }}
            >
              Set
            </button>
          </div>
        </form>

        {/* GPS Button */}
        <button
          onClick={handleDetectLocation}
          disabled={isDetecting}
          style={{
            width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
            border: '1.5px dashed var(--primary)', background: 'rgba(255,87,34,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            cursor: 'pointer', color: 'var(--primary)', fontWeight: 700, fontSize: 13,
            marginBottom: 24, transition: 'all 0.2s', fontFamily: 'inherit'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,87,34,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,87,34,0.05)'}
        >
          <Navigation size={15} />
          {isDetecting ? 'Detecting GPS location...' : 'Use current location (GPS)'}
        </button>

        {/* Popular Cities */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--text-muted)', marginBottom: 12 }}>
            Popular Cities
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxHeight: 180, overflowY: 'auto', paddingRight: 4 }}>
            {popularCities.map((city) => {
              const isSelected = selectedLocation.toLowerCase().includes(city.toLowerCase());
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleCitySelect(city)}
                  style={{
                    padding: '8px 14px', borderRadius: 100,
                    border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--border-strong)',
                    background: isSelected ? 'var(--primary)' : 'var(--bg-alt)',
                    color: isSelected ? 'white' : 'var(--text)',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 5,
                    transition: 'all 0.2s', fontFamily: 'inherit'
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--border-strong)';
                      e.currentTarget.style.color = 'var(--text)';
                    }
                  }}
                >
                  {city}
                  {isSelected && <Check size={13} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current status */}
        <div style={{
          marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 12, color: 'var(--text-muted)'
        }}>
          <span>Active: <strong style={{ color: 'var(--text)' }}>{selectedLocation}</strong></span>
          <button 
            type="button" 
            onClick={() => setIsLocationModalOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
