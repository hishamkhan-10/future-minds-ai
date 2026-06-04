import React from 'react';
import ScrollReveal from './ui/ScrollReveal';

const About: React.FC = () => {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-inner">
          <ScrollReveal>
            <div className="about-story">
              <span className="section-tag">Who we are</span>
              <h2 className="section-title">Built by practitioners, not academics.</h2>
              <p>
                Future Minds started in 2023 because we were tired of AI courses that teach theory
                and leave you stranded when it is time to build something real. <strong>Our instructors
                still write production code.</strong> They teach what they learned last month, not last decade.
              </p>
              <p>
                We are based in Karachi but our students are in Dubai, London, Toronto, and Lahore.
                Most of them have full-time jobs, families, and zero patience for fluff. We designed
                every course around that reality: short modules, real datasets, and direct access
                to instructors who actually reply.
              </p>
              <p>
                Our goal is not to turn everyone into a research scientist. It is to give working
                professionals the practical skills to automate their work, switch careers, or simply
                understand what AI can and cannot do for their business.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="about-facts">
              <div className="about-fact">
                <h4>Real instructors, not actors</h4>
                <p>Ahmad, Sana, and Tariq have 20+ combined years building ML systems at startups and enterprise teams.</p>
              </div>
              <div className="about-fact">
                <h4>Projects employers recognize</h4>
                <p>Every graduate leaves with a portfolio of 4–6 projects built on real business data.</p>
              </div>
              <div className="about-fact">
                <h4>No degree gatekeeping</h4>
                <p>We have trained accountants, marketers, teachers, and lawyers who now work in AI.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
