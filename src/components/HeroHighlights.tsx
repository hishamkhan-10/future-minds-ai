import React from 'react';
import ScrollReveal from './ui/ScrollReveal';

const highlights = [
  'No Coding Required',
  '10 Weeks Physical Classes',
  'International Client Focus',
  'Voice Agents Included',
  'Certificate Included',
];

const HeroHighlights: React.FC = () => {
  return (
    <section className="hero-highlights" aria-label="Program highlights">
      <div className="container">
        <ScrollReveal delay={400}>
          <div className="highlights-row">
            {highlights.map((item) => (
              <div className="highlight-card" key={item}>
                {item}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroHighlights;
