import React from 'react';
import SectionHeader from './ui/SectionHeader';
import ScrollReveal from './ui/ScrollReveal';
import { whyUsItems } from '../data/siteData';

const WhyChooseUs: React.FC = () => {
  return (
    <section className="why-us section section-alt" id="why-us">
      <div className="container">
        <SectionHeader
          tag="Why us"
          title="The stuff other courses skip"
          subtitle="We are not the biggest platform. We are the one that actually answers your questions at 11 PM."
        />
        <div className="why-list">
          {whyUsItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 60}>
              <div className="why-item">
                <div className="why-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
