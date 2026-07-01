import type { Course, Testimonial, Stat, WhyUsItem, NavLink, FooterLinkGroup, FAQItem } from '../types';

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> },
  { label: 'Curriculum', href: '#curriculum', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
  { label: 'Why Us', href: '#why-us', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { label: 'Testimonials', href: '#testimonials', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { label: 'FAQ', href: '#faq', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg> },
  { label: 'Contact', href: '#contact', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
];

export const courses: Course[] = [
  {
    id: 1,
    title: 'Introduction to AI',
    description: 'No jargon, no fluff. Understand how AI actually works, what it can and cannot do, and where it fits in your industry.',
    duration: '6 Weeks',
    level: 'Beginner',
    gradient: 'linear-gradient(135deg, #1E5BB8 0%, #164494 100%)',
    price: 299,
    originalPrice: 499,
    instructor: 'Ahmad Raza',
    nextStart: 'June 15, 2026',
  },
  {
    id: 2,
    title: 'Machine Learning Basics',
    description: 'Build your first models from scratch. Learn regression, classification, and clustering with hands-on Python projects.',
    duration: '8 Weeks',
    level: 'Beginner',
    gradient: 'linear-gradient(135deg, #0A2540 0%, #1A2D44 100%)',
    price: 399,
    originalPrice: 649,
    instructor: 'Sana Malik',
    nextStart: 'June 22, 2026',
  },
  {
    id: 3,
    title: 'Deep Learning Fundamentals',
    description: 'Neural networks demystified. Build CNNs and RNNs using PyTorch. Designed for engineers who want to go deeper.',
    duration: '10 Weeks',
    level: 'Intermediate',
    gradient: 'linear-gradient(135deg, #1A2D44 0%, #0A2540 100%)',
    price: 549,
    originalPrice: 899,
    instructor: 'Dr. Tariq Hussain',
    nextStart: 'July 6, 2026',
  },
  {
    id: 4,
    title: 'Prompt Engineering Mastery',
    description: 'Stop guessing with ChatGPT. Learn systematic prompting frameworks that save 10+ hours a week.',
    duration: '4 Weeks',
    level: 'All Levels',
    gradient: 'linear-gradient(135deg, #164494 0%, #1E5BB8 100%)',
    price: 199,
    originalPrice: 349,
    instructor: 'Ahmad Raza',
    nextStart: 'June 8, 2026',
  },
  {
    id: 5,
    title: 'Data Science with Python',
    description: 'Clean, analyze, and visualize real datasets. Pandas, Matplotlib, and Seaborn taught through business case studies.',
    duration: '8 Weeks',
    level: 'Beginner',
    gradient: 'linear-gradient(135deg, #0F1F33 0%, #1A2D44 100%)',
    price: 349,
    originalPrice: 599,
    instructor: 'Sana Malik',
    nextStart: 'June 29, 2026',
  },
  {
    id: 6,
    title: 'AI Automation & Agents',
    description: 'Build agents that actually work. Automate reports, emails, and workflows using LangChain and no-code tools.',
    duration: '12 Weeks',
    level: 'Advanced',
    gradient: 'linear-gradient(135deg, #1E5BB8 0%, #0A2540 100%)',
    price: 699,
    originalPrice: 1199,
    instructor: 'Dr. Tariq Hussain',
    nextStart: 'July 20, 2026',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Aisha Khan',
    role: 'Voice Agent Developer',
    text: 'The voice agents module alone is worth the entire course. I built and deployed a production-ready voice agent for a UK client within two weeks of graduating. No other course in Pakistan teaches this.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    featured: true,
  },
  {
    id: 2,
    name: 'Omar Hassan',
    role: 'WhatsApp Automation Specialist',
    text: 'Zero coding experience when I joined. By week three I had deployed a WhatsApp sales agent handling real conversations. The no-code approach is not a gimmick — it actually works.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    featured: false,
  },
  {
    id: 3,
    name: 'Fatima Ahmed',
    role: 'n8n Workflow Engineer',
    text: 'The n8n automation module paid for itself in one weekend. I automated my entire client onboarding process — CRM updates, calendar booking, email sequences — and started charging retainer fees.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop&crop=face',
    featured: false,
  },
  {
    id: 4,
    name: 'Bilal Mahmood',
    role: 'AI Solutions Provider',
    text: 'The client hunting weeks changed everything. I landed my first international client before graduation using the outreach system we built in class. The course does not just teach you AI — it teaches you how to earn with it.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    featured: true,
  },
];

export const stats: Stat[] = [
  { id: 2, label: 'Average course rating', target: 4.7, suffix: '/5.0', decimals: 1 },
  { id: 3, label: 'Students who changed careers', target: 63, suffix: '%' },
  { id: 4, label: 'Instructor response time', target: 6, suffix: ' hours' },
];

export const whyUsItems: WhyUsItem[] = [
  {
    id: 1,
    title: 'Curriculum built with hiring managers',
    description: 'We interviewed 40+ tech leads to find out what they actually want junior AI hires to know. Then we built the course around that.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Projects that look like real work',
    description: 'No more Titanic dataset for the millionth time. You will work on messy, incomplete data from actual business scenarios.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Instructors who still write code',
    description: 'Ahmad, Sana, and Tariq are not career coaches — they are practitioners. They teach what they used last week at work.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Certificate that means something',
    description: 'Our certificates include a portfolio link and verified project list. Hiring managers can see what you actually built.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Career support that does not stop at resume tips',
    description: 'Mock interviews with real engineers. Salary negotiation scripts. Direct introductions to our hiring partners when you are ready.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Lifetime access, including future updates',
    description: 'AI moves fast. Pay once and get every curriculum update, new module, and bonus workshop we release. No subscriptions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
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
    question: 'Do I need to know coding to join?',
    answer: 'No. This course is built for complete beginners. There is no coding, no setup, and no technical prerequisite. You will build and deploy real AI agents by week three using no-code platforms. If you can use a computer, you can complete this course.',
  },
  {
    id: 2,
    question: 'Where and when are classes held?',
    answer: 'Classes are held physically in Lahore. The course runs for 8 weeks with two sessions per week, each lasting 2 hours. You should also expect 6 to 8 hours of self-practice per week outside class. The next cohort starts in June 2026. All instruction is in English.',
  },
  {
    id: 3,
    question: 'What will I actually build and leave with?',
    answer: 'By graduation, you will have a working sales agent that handles lead qualification and calendar booking, a working support agent connected to a knowledge base, two production-ready n8n automations with real integrations, a qualified prospect list of 200 leads with over 50 outreach messages already sent, and a portfolio website showcasing your builds that is ready to share with clients.',
  },
  {
    id: 4,
    question: 'Who teaches this course?',
    answer: 'Your instructor is an active AI agency owner with real international clients in the US, UK, and UAE. He does not teach from textbooks. Every lesson, tool, and strategy comes directly from active client projects. When the market shifts, the curriculum shifts with it because your instructor is inside the industry, not watching from the outside.',
  },
  {
    id: 5,
    question: 'What are the attendance and homework rules?',
    answer: 'You need 80% attendance minimum to receive your certificate. Homework must be submitted before the next class — late submissions are not accepted. A laptop with at least 8GB RAM (Windows or Mac) is required every session. Phones stay face-down during class with breaks every 50 minutes.',
  },
  {
    id: 6,
    question: 'What is the cohort size and refund policy?',
    answer: 'Cohorts are kept small — 20 to 40 students maximum — so every student gets real attention. The instructor team includes a Lead Instructor, a Teaching Assistant, and the Founder. A 50% refund is available within the first 7 days. No refunds are issued after that.',
  },
  {
    id: 7,
    question: 'How is this course different from other AI courses in Pakistan?',
    answer: 'Four things make this course unique. First, it is built for international clients — everything points toward US, UK, and UAE clients paying $500 to $2,000 per month per agent. Second, it is taught by an active agency owner, not a trainer who learned AI last year. Third, no coding is required — complete beginners build agents from week three. Fourth, it is the only course in Pakistan that teaches voice agents at depth, which is the highest-paying AI skill in the market today.',
  },
];
