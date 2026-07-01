import React from 'react';
import SectionHeader from './ui/SectionHeader';
import ScrollReveal from './ui/ScrollReveal';

const advantages = [
  {
    title: 'Built for International Clients',
    short: 'Trained for clients who actually pay.',
    description:
      'Pakistani businesses are not buying AI services yet. From week one, everything points toward US, UK, and UAE clients paying $500\u2013$2,000 per month per agent. Real demand. Real rates.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'Taught by an Active Agency Owner',
    short: 'A practitioner in the room, not a presenter.',
    description:
      'Your instructor runs a live AI agency with international clients, not just a classroom. When the market shifts, the course shifts with it.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'No Coding Required',
    short: 'Zero technical barrier to entry.',
    description:
      'Complete beginners build and deploy real AI agents by week three. No coding. No setup. No prerequisites.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Pakistan's Only Voice Agents Course",
    short: 'The highest-paying skill, taught at depth.',
    description:
      'Voice agents are what AI businesses charge the most for. Two full dedicated weeks. No other Pakistani course comes close.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
];

const WhyThisCourseIsDifferent: React.FC = () => {
  return (
    <section className="why-different section" id="why-us">
      <div className="container">
        <SectionHeader
          tag="Why Us"
          title="Why This Course Is Different"
          subtitle="Four Advantages That Took Years to Build Into One Programme"
        />

        <p className="why-different-intro">
          Not marketing claims. Structural advantages baked into every week, and
          none of them exist together anywhere else in Pakistan.
        </p>

        <div className="advantages-grid">
          {advantages.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 80}>
              <div className="advantage-card">
                <h3 className="advantage-title">{item.title}</h3>
                <span className="advantage-short">{item.short}</span>
                <p className="advantage-desc">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="instructor-section">
          <SectionHeader
            tag="Your Instructor"
            title="Taught by Someone Who Does This for a Living"
            subtitle="Not a trainer who learned AI last year. Someone who runs an active AI agency with real international clients right now."
          />

          <ScrollReveal delay={160}>
            <div className="instructor-card">
              <div className="instructor-info">
                <span className="instructor-role">AI Agency Founder</span>
                <h3 className="instructor-heading">
                  Active International AI Agency Owner — Lahore, Pakistan
                </h3>
                <p className="instructor-desc">
                  Your instructor does not teach AI from textbooks. He teaches
                  from active client projects happening right now. Every lesson,
                  every tool, and every strategy in this course comes directly
                  from what is working in the real market today. When industry
                  trends shift, the curriculum shifts with them, because your
                  instructor is inside the industry, not watching it from the
                  outside. This is the difference between learning AI and
                  learning how to earn with AI.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="why-highlights">
          <ScrollReveal delay={240}>
            <div className="highlights-row">
              <div className="highlight-card">Active AI Agency Owner</div>
              <div className="highlight-card">International Client Portfolio</div>
              <div className="highlight-card">Voice &amp; WhatsApp Specialist</div>
              <div className="highlight-card">No-Code Expert</div>
              <div className="highlight-card">n8n Automation</div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhyThisCourseIsDifferent;
