import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import Navbar from './components/Navbar';
import CartPanel from './components/CartPanel';
import AuthModal from './components/AuthModal';
import LocationModal from './components/LocationModal';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantPage from './pages/RestaurantPage';
import OffersPage from './pages/OffersPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import TrackingPage from './pages/TrackingPage';
import ProfilePage from './pages/ProfilePage';
import './index.css';
import './styles/Navbar.css';
import './styles/Components.css';

function App() {
  return (
    <Router>
      <LocationProvider>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <CartPanel />
            <AuthModal />
            <LocationModal />
            <Toaster />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/restaurants" element={<RestaurantsPage />} />
              <Route path="/restaurant/:id" element={<RestaurantPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/tracking" element={<TrackingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={
                <div style={{ paddingTop: 'var(--navbar-h)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: 'var(--bg)' }}>
                  <div style={{ fontSize: 100, animation: 'float 4s ease-in-out infinite' }}>🍕</div>
                  <h1 style={{ fontSize: 48, fontWeight: 900, color: 'var(--primary)' }}>404</h1>
                  <p style={{ fontSize: 18, color: 'var(--text-muted)', marginBottom: 8 }}>Oops! This page got eaten.</p>
                  <a href="#/" className="btn-primary">🏠 Go Home</a>
                </div>
              } />
            </Routes>

            <Footer />
          </CartProvider>
        </AuthProvider>
      </LocationProvider>
    </Router>
  );
}

export default App;
