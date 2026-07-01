import React from 'react';
import SectionHeader from './ui/SectionHeader';
import ScrollReveal from './ui/ScrollReveal';

const outcomes = [
  {
    title: 'Working Sales Agent',
    description:
      'Lead qualification + calendar booking \u2014 deployed for a real or simulated client.',
  },
  {
    title: 'Working Support Agent',
    description:
      'Connected to a knowledge base with escalation paths. Ready to sell.',
  },
  {
    title: '2 n8n Automations',
    description:
      'Production-ready workflows with real integrations. Your first sellable service.',
  },
  {
    title: '200-Prospect List',
    description:
      'Qualified leads in your niche with 50+ real outreach messages already sent.',
  },
  {
    title: 'Portfolio Website',
    description:
      'Showing your builds and ready to share with prospects from day one.',
  },
  {
    title: 'Completion Certificate',
    description:
      'Signed by the founder. Backed by real deliverables, not just attendance.',
  },
];

const rules = [
  '80% attendance minimum \u2014 required for certificate. No exceptions, even for paid seats.',
  'Laptop required every session \u2014 Windows or Mac, 8GB+ RAM. If needed, admissions can help arrange one.',
  'Homework before next class \u2014 no late submissions accepted.',
  'WhatsApp group = course only \u2014 discussion, questions, and homework. No off-topic content.',
  'Phones face-down during sessions \u2014 breaks every 50 minutes.',
  'Refund policy \u2014 50% refund within the first 7 days. No refunds after that.',
];

const cohortDetails = [
  { label: 'Duration', value: '8 Weeks' },
  { label: 'Sessions per week', value: '2 \u00d7 2 hours' },
  { label: 'Location', value: 'Physical \u00b7 Lahore' },
  { label: 'Cohort size', value: '20\u201340 Students' },
  { label: 'Instructor team', value: 'Lead + TA + Founder' },
  { label: 'Self-practice needed', value: '6\u20138 hrs / week' },
  { label: 'Cohort start', value: 'June 2026' },
  { label: 'Language', value: 'English' },
];

const OutcomesAndLogistics: React.FC = () => {
  return (
    <section className="outcomes section" id="outcomes">
      <div className="container">
        {/* Part 1: What You Leave With */}
        <SectionHeader
          tag="Outcomes"
          title="What You Leave With"
          subtitle="Six Things in Your Hands by Graduation Day"
        />

        <p className="outcomes-intro">
          No AI courses in Lahore give you this level of output. Not theory. Not
          certificates on a wall. Tangible builds and a running outreach
          operation.
        </p>

        <div className="outcomes-grid">
          {outcomes.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 60}>
              <div className="outcome-card">
                <h3 className="outcome-title">{item.title}</h3>
                <p className="outcome-desc">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Part 2: Logistics & Rules */}
        <div className="logistics-section">
          <SectionHeader
            tag="Logistics"
            title="Logistics & Rules"
            subtitle="What\u2019s Expected of You and What We Provide"
          />

          <p className="logistics-intro">
            As the best institute for AI course in Lahore, we keep cohorts small
            \u2014 20 to 40 students max \u2014 so every student gets real
            attention, not a seat in a lecture hall. Our AI programs in Lahore
            2026 are built for people who want practical, hands-on artificial
            intelligence training, not theory-heavy lectures.
          </p>

          <div className="logistics-layout">
            <div className="logistics-column">
              <h3 className="logistics-heading">Class Rules</h3>
              <ul className="rules-list">
                {rules.map((rule) => (
                  <li key={rule} className="rules-item">
                    <svg
                      className="rules-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="logistics-column">
              <h3 className="logistics-heading">Cohort Details</h3>
              <dl className="cohort-list">
                {cohortDetails.map((item) => (
                  <div key={item.label} className="cohort-row">
                    <dt className="cohort-label">{item.label}</dt>
                    <dd className="cohort-value">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutcomesAndLogistics;
