import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Eye, EyeOff } from 'lucide-react';

const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, authMode, setAuthMode, login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isAuthOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    login({ name: form.name || form.email.split('@')[0], email: form.email });
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)',
    border: '2px solid var(--border)', background: 'rgba(255,255,255,0.8)',
    fontSize: 15, fontFamily: 'inherit', outline: 'none', color: 'var(--text)',
    transition: 'border-color 0.2s'
  };

  return (
    <div className="auth-overlay" onClick={(e) => e.target === e.currentTarget && setIsAuthOpen(false)}>
      <div className="auth-card">
        <button className="auth-close" onClick={() => setIsAuthOpen(false)}>×</button>

        <div className="auth-logo">
          <div className="logo-icon" style={{ margin: '0 auto 12px', width: 56, height: 56, fontSize: 24, borderRadius: 16, background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🍔</div>
          <div className="auth-title">
            {authMode === 'login' ? 'Welcome back!' : 'Join FoodRush'}
          </div>
          <div className="auth-subtitle">
            {authMode === 'login' ? 'Sign in to continue ordering' : 'Create your account for free'}
          </div>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab ${authMode === 'login' ? 'active' : ''}`} onClick={() => setAuthMode('login')}>Login</button>
          <button className={`auth-tab ${authMode === 'signup' ? 'active' : ''}`} onClick={() => setAuthMode('signup')}>Sign Up</button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {authMode === 'signup' && (
            <input style={inputStyle} placeholder="Full Name" required value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          )}
          <input style={inputStyle} type="email" placeholder="Email address" required value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            onFocus={e => e.target.style.borderColor = 'var(--primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          {authMode === 'signup' && (
            <input style={inputStyle} type="tel" placeholder="Phone number" value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          )}
          <div style={{ position: 'relative' }}>
            <input style={inputStyle} type={showPassword ? 'text' : 'password'} placeholder="Password" required value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {authMode === 'login' && (
            <div style={{ textAlign: 'right' }}>
              <button type="button" style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
                Forgot password?
              </button>
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 16 }} disabled={loading}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                {authMode === 'login' ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : (
              authMode === 'login' ? '🚀 Sign In' : '✨ Create Account'
            )}
          </button>

          <div className="auth-divider">or continue with</div>

          <button type="button" className="google-btn">
            <span style={{ fontSize: 18 }}>G</span>
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
