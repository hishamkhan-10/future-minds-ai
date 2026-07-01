import React from 'react';
import Button from './ui/Button';

const CTABanner: React.FC = () => {
  return (
    <section className="cta-banner" id="cta">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to actually learn AI?</h2>
          <p>
            Next cohort starts June 2026 in Lahore. Limited to 40 students.
            Build real AI agents for international clients.
          </p>
          <div className="cta-buttons">
            <Button variant="white" size="lg" href="#contact">
              Reserve My Seat
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
