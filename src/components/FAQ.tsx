import React, { useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import ScrollReveal from './ui/ScrollReveal';
import { faqItems } from '../data/siteData';

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq section section-alt" id="faq">
      <div className="container">
        <SectionHeader
          tag="FAQ"
          title="The questions you actually have"
          subtitle="We have answered thousands of emails. These are the ones that come up every week."
        />
        <div className="faq-list">
          {faqItems.map((item) => (
            <ScrollReveal key={item.id}>
              <div className={`faq-item ${openId === item.id ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggle(item.id)}
                  aria-expanded={openId === item.id}
                >
                  {item.question}
                  <span className="faq-icon" />
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
