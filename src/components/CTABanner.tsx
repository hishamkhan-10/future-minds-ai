import React from 'react';
import Button from './ui/Button';

const CTABanner: React.FC = () => {
  return (
    <section className="cta-banner" id="cta">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to actually learn AI?</h2>
          <p>
            Our next cohort starts June 15. Seats are limited because we cap classes at 25 students
            so everyone gets their questions answered.
          </p>
          <div className="cta-buttons">
            <Button variant="white" size="lg" href="#contact">
              Reserve My Seat
            </Button>
            <Button variant="outline-white" size="lg" href="#courses">
              Browse Courses
            </Button>
          </div>
          <div className="cta-guarantee">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
            </svg>
            <span>30-day refund. No forms, no guilt trips.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
