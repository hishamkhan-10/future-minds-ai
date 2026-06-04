import React from 'react';
import { partners } from '../data/siteData';

const TrustBar: React.FC = () => {
  return (
    <section className="trust-bar" aria-label="Where our graduates work">
      <div className="container">
        <p className="trust-bar-label">Our graduates now work at</p>
        <div className="trust-bar-logos">
          {partners.map((name) => (
            <span className="trust-logo" key={name}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
