import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const login = (userData) => {
    setUser({ ...userData, avatar: userData.name?.charAt(0).toUpperCase() || 'U' });
    setIsAuthOpen(false);
  };

  const logout = () => setUser(null);

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthOpen, setIsAuthOpen, authMode, setAuthMode, openAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
