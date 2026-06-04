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
          title="Real people, real outcomes"
          subtitle="No paid actors. No script. Just students who were willing to share their honest experience."
        />
        <div className="testimonials-highlight">
          <StarRating rating={5} />
          <p>
            <strong>4.7 / 5.0</strong> average rating from <strong>312 verified students</strong>
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 80}>
              <div className={`testimonial-card ${testimonial.featured ? 'featured' : ''}`}>
                <StarRating rating={testimonial.rating} />
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} loading="lazy" decoding="async" width="44" height="44" />
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
