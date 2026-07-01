import React from 'react';
import SectionHeader from './ui/SectionHeader';
import StarRating from './ui/StarRating';
import ScrollReveal from './ui/ScrollReveal';
import { testimonials } from '../data/siteData';

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <SectionHeader
          tag="Testimonials"
          title="From the classroom to international clients"
          subtitle="Real students. Real builds. Real results that got them paying clients before graduation."
        />
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 80}>
              <div className={`testimonial-card ${testimonial.featured ? 'featured' : ''}`}>
                <StarRating rating={testimonial.rating} />
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} loading="lazy" decoding="async" width="36" height="36" />
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
