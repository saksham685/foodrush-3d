import React from 'react';

const testimonials = [
  {
    text: "FoodRush delivers my biryani in 28 minutes every time. The app is gorgeous and food always arrives piping hot. This is genuinely the best food delivery experience I've had.",
    name: "Priya Sharma",
    city: "Mumbai",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&q=80",
  },
  {
    text: "Love the 3D visuals and the smooth experience. Ordering feels premium. Delivery is super quick and the variety of restaurants is amazing. Highly recommend!",
    name: "Aryan Mehta",
    city: "Bangalore",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    text: "The WELCOME50 coupon saved me ₹100 on my first order. The live tracking feature is so satisfying — I watched the scooter come to my building!",
    name: "Sneha Patel",
    city: "Delhi",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
];

const Stars = ({ count = 5 }) => (
  <div className="testimonial-stars">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ color: '#FFB300', fontSize: 15 }}>★</span>
    ))}
  </div>
);

const Testimonials = () => (
  <section className="section" style={{ background: 'var(--bg-alt)', position: 'relative', overflow: 'hidden' }}>
    {/* Decorative blobs */}
    <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,87,34,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,179,0,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

    <div className="container">
      <div className="section-header">
        <span className="section-badge">Love from customers</span>
        <h2 className="section-title">What people are saying</h2>
        <p className="section-subtitle">Join thousands of happy food lovers across the city</p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            <Stars count={t.rating} />
            <p className="testimonial-text">"{t.text}"</p>
            <div className="testimonial-author">
              <img className="testimonial-avatar" src={t.avatar} alt={t.name} />
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-city">📍 {t.city}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Aggregate rating bar */}
      <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
        {[
          { num: '4.9/5', label: 'App Store Rating' },
          { num: '10k+', label: 'Five-star reviews' },
          { num: '99%', label: 'On-time delivery' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.03em', fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
