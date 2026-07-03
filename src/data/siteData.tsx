import type { Testimonial, NavLink, FooterLinkGroup, FAQItem } from '../types';

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> },
  { label: 'Curriculum', href: '#curriculum', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
  { label: 'Why Us', href: '#why-us', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { label: 'Testimonials', href: '#testimonials', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { label: 'FAQ', href: '#faq', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg> },
  { label: 'Contact', href: '#contact', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Aisha Khan',
    role: 'Voice Agent Developer',
    text: 'The voice agents module alone is worth the entire course. I built and deployed a production-ready voice agent for a UK client within two weeks of graduating. No other course in Pakistan teaches this.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1612203304476-2ed23c55b5b9?w=100&h=100&fit=crop&crop=face',
    featured: true,
  },
  {
    id: 2,
    name: 'Omar Hassan',
    role: 'WhatsApp Automation Specialist',
    text: 'Zero coding experience when I joined. By week three I had deployed a WhatsApp sales agent handling real conversations. The no-code approach is not a gimmick — it actually works.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1518725522904-4b3939358342?w=100&h=100&fit=crop&crop=face',
    featured: false,
  },
  {
    id: 3,
    name: 'Fatima Ahmed',
    role: 'n8n Workflow Engineer',
    text: 'The n8n automation module paid for itself in one weekend. I automated my entire client onboarding process — CRM updates, calendar booking, email sequences — and started charging retainer fees.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1558499932-9609acb6f443?w=100&h=100&fit=crop&crop=face',
    featured: false,
  },
  {
    id: 4,
    name: 'Bilal Mahmood',
    role: 'AI Solutions Provider',
    text: 'The client hunting weeks changed everything. I landed my first international client before graduation using the outreach system we built in class. The course does not just teach you AI — it teaches you how to earn with it.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1548810020-ea2f1da35cff?w=100&h=100&fit=crop&crop=face',
    featured: true,
  },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Why Us', href: '#why-us' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Outcomes', href: '#outcomes' },
      { label: 'Curriculum', href: '#curriculum' },
    ],
  },
];

export const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'hello@futuremindsai.com',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'WhatsApp',
    value: '+92 300 1234567',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: 'Lahore, Pakistan',
  },
];

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'Do I need any coding experience?',
    answer: 'Not at all — this course was built for complete beginners. No coding, no setup, no technical background needed. You will build and deploy real AI agents by week three using no-code tools. If you can use a computer, you are ready.',
  },
  {
    id: 2,
    question: 'Where do the classes take place, and what does the schedule look like?',
    answer: 'Classes are held in-person in Lahore. The course runs 8 weeks with two 2-hour sessions per week, plus about 6 to 8 hours of self-practice. The next cohort starts June 2026, and all instruction is in English.',
  },
  {
    id: 3,
    question: 'What will I have built by the end of the course?',
    answer: 'You will graduate with a working sales agent, a support agent connected to a knowledge base, two production-ready n8n automations, a list of 200 qualified leads with 50+ messages sent, and a portfolio website ready to share with clients.',
  },
  {
    id: 4,
    question: 'Who is the instructor?',
    answer: 'You will learn from an active AI agency owner with real clients in the US, UK, and UAE. Every lesson comes straight from live projects — no textbooks. When the market shifts, the curriculum shifts with it, because your instructor works in the industry every day.',
  },
  {
    id: 5,
    question: 'What are the attendance and homework expectations?',
    answer: 'You need 80% attendance to earn your certificate. Homework is due before each class — late work is not accepted. Bring a laptop with at least 8GB RAM (Windows or Mac). Phones stay face-down during class, with breaks every 50 minutes.',
  },
  {
    id: 6,
    question: 'How many students are in each cohort, and what if I need a refund?',
    answer: 'We keep cohorts small — 20 to 40 students — so everyone gets real attention. Our team includes a Lead Instructor, a Teaching Assistant, and the Founder. If the course is not for you, a 50% refund is available within the first week.',
  },
  {
    id: 7,
    question: 'What makes this different from other AI courses in Pakistan?',
    answer: 'Four things set this course apart. It is built for international clients paying $500 to $2,000 per agent each month. It is taught by a working agency owner, not a trainer. No coding is required — you start building agents from week three. And it is the only course in Pakistan that teaches voice agents in depth, currently the highest-paying AI skill.',
  },
];
