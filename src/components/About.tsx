import React from 'react';
import ScrollReveal from './ui/ScrollReveal';

interface PersonaCard {
  title: string;
  description: string;
}

const personaCards: PersonaCard[] = [
  {
    title: 'Fresh Graduates',
    description:
      'You have a degree but the job market feels impossible. AI agents are a skill set employers and international clients are actively hiring for right now. Get in before everyone else does.',
  },
  {
    title: 'Freelancers',
    description:
      'You are already on Upwork or Fiverr but the competition is brutal. AI agents are a high-ticket service with almost no competition from Pakistani freelancers yet. This is your window.',
  },
  {
    title: 'Business Owners',
    description:
      'You want to automate customer support, lead generation, or appointment booking without hiring a full team. Build your own agents or understand exactly what to ask a developer to build.',
  },
  {
    title: 'Working Professionals',
    description:
      'You have a job but want a second income stream that works around your schedule. Learn to build AI agents on weekends and start taking on clients within weeks of completing the course.',
  },
  {
    title: 'Career Switchers',
    description:
      'You are done with your current field and want to move into something with real future value. AI agent development is one of the highest-demand skills entering 2026, and entry is still wide open.',
  },
];

const About: React.FC = () => {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-inner">
          <ScrollReveal>
            <div className="about-story">
              <span className="section-tag">What Is This Bootcamp</span>

              <p className="about-lead">
                While Everyone Else Is Still Learning AI, You Could Already Be Earning From It.
              </p>

              <p>
                The window for getting into AI Courses in Pakistan as an early mover is still open — but it will not stay open for long. FMA Trainings was built specifically for people who want to move fast, build real skills, and start earning from international clients before this space gets crowded. Over 10 hands-on weeks, you will build four types of AI agents — chat, voice, web, and WhatsApp — using no-code platforms that require zero technical background. Every session is practical. Every build is portfolio-ready. And unlike most courses that stop at the technical side, FMA Trainings takes you all the way through to finding clients, closing deals, and getting paid in dollars.
              </p>

              <span className="about-subheading">Is This Course For You</span>

              <p className="about-lead">
                Built for People Who Want to Earn — Not Just Learn
              </p>

              <p>
                FMA Training is not for everyone. It is designed specifically for people who are serious about building a real income from AI and Machine Learning for Beginners.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="about-facts">
              {personaCards.map((card) => (
                <div className="about-fact" key={card.title}>
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
