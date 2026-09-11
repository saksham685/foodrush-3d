import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error('useLocationContext must be used within LocationProvider');
  return context;
};

export const POPULAR_CITIES = [
  "Mumbai", "Delhi NCR", "Bangalore", "Hyderabad", "Pune", 
  "Kolkata", "Chennai", "Ahmedabad", "Jaipur", "Chandigarh", "Lucknow"
];

export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(() => {
    return localStorage.getItem('foodrush_location') || 'Mumbai, Maharashtra';
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('foodrush_location', selectedLocation);
  }, [selectedLocation]);

  const updateLocation = (newLoc) => {
    if (newLoc && newLoc.trim()) {
      setSelectedLocation(newLoc.trim());
      setIsLocationModalOpen(false);
    }
  };

  return (
    <LocationContext.Provider value={{
      selectedLocation,
      updateLocation,
      isLocationModalOpen,
      setIsLocationModalOpen,
      popularCities: POPULAR_CITIES
    }}>
      {children}
    </LocationContext.Provider>
  );
};
