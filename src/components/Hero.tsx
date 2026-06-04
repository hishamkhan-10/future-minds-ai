import React from 'react';
import Button from './ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            We teach working professionals AI that <em>delivers real results.</em>
          </h1>
          <p className="hero-subtitle">
            No computer science degree needed. Just practical, hands-on AI and ML training
            built by people who actually work in the field. Based in Karachi. Serving students worldwide.
          </p>
          <div className="hero-cta">
            <Button variant="primary" size="lg" href="#contact">
              See Upcoming Courses
            </Button>
            <Button variant="outline" size="lg" href="#courses">
              View Pricing
            </Button>
          </div>
          <div className="hero-trust">
            <div className="trust-avatars">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="Student" width="36" height="36" decoding="async" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Student" width="36" height="36" decoding="async" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="Student" width="36" height="36" decoding="async" />
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Student" width="36" height="36" decoding="async" />
            </div>
            <p>
              <strong>1,847</strong> students since 2023
            </p>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-card">
            <h3>Student Outcomes</h3>
            <div className="hero-stat-row">
              <span className="stat-number">63%</span>
              <span className="stat-label">switched careers into AI/ML</span>
            </div>
            <div className="hero-stat-row">
              <span className="stat-number">4.7</span>
              <span className="stat-label">average course rating</span>
            </div>
            <p className="note">Based on 2024 student survey, n=312</p>
          </div>
          <div className="hero-next-cohort">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>Next cohort starts <strong>June 15, 2026</strong></span>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <a href="#about" className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-arrow" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
