import React from 'react';
import SectionHeader from './ui/SectionHeader';

const curriculumData = [
  {
    weeks: '1\u20132',
    title: 'AI Mastery',
    description:
      'You have been using AI like a search engine. That stops here. Learn advanced prompting, multi-step chaining, and intelligent workflows using Claude and ChatGPT \u2014 the way professionals who bill clients actually use these tools, not the way everyone else does.',
  },
  {
    weeks: '3\u20135',
    title: 'Chat, Web & WhatsApp Agents',
    description:
      'Build agents that work around the clock handling sales conversations, customer support, and lead qualification \u2014 deployed live on real websites and WhatsApp Business API. Not demos. Not test environments. Real deployments.',
  },
  {
    weeks: '6\u20137',
    title: 'Voice Agents \u2014 Flagship Skill',
    description:
      'This is the skill no other Pakistani institute teaches at this depth. Build production-ready voice agents that handle real inbound and outbound phone calls autonomously. The highest-paying AI service in the market today, with almost no competition from Pakistan yet.',
  },
  {
    weeks: '8',
    title: 'Automation with n8n',
    description:
      'An agent that works alone is powerful. An agent connected to a CRM, email system, calendar, and payment processor is a complete business operation. Week 8 is where your agents stop being standalone tools and become full automation systems clients pay monthly retainers for.',
  },
  {
    weeks: '9\u201310',
    title: 'Client Hunting',
    description:
      'Every skill built in the previous eight weeks only pays if you know how to sell it. These two weeks cover niche selection, building prospect lists, cold outreach in English, discovery calls, pricing services, writing contracts, and most importantly, getting paid in dollars.',
  },
];

const CourseCurriculum: React.FC = () => {
  return (
    <section className="curriculum section" id="curriculum">
      <div className="container">
        <SectionHeader
          tag="Curriculum"
          title="Course Curriculum"
          subtitle="10 Weeks. Every Week Builds Something You Can Sell."
        />
        <div className="curriculum-grid">
          {curriculumData.map((item, index) => (
            <div
              className={`curriculum-card ${index === 4 ? 'curriculum-card--last' : ''}`}
              key={index}
            >
              <span className="curriculum-weeks">Weeks {item.weeks}</span>
              <h3 className="curriculum-title">{item.title}</h3>
              <p className="curriculum-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCurriculum;
