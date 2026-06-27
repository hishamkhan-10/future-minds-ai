import type { Course, Testimonial, Stat, WhyUsItem, NavLink, FooterLinkGroup, FAQItem } from '../types';

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> },
  { label: 'Courses', href: '#courses', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
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
    name: 'Sarah Mitchell',
    role: 'Data Analyst → Data Scientist at FinFlow',
    text: 'I took the ML course after work, two evenings a week. Six weeks in, I built a churn prediction model that got me hired. The instructors actually reply to your questions — not some bot.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    featured: true,
  },
  {
    id: 2,
    name: 'James Rodriguez',
    role: 'ML Engineer at TechCorp',
    text: 'Look, I have tried Coursera, Udemy, you name it. Future Minds is different because the projects are messy, real-world data. You learn to clean garbage data, not just run perfect notebooks.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    featured: false,
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Marketing Director at GrowthLab',
    text: 'The Prompt Engineering course paid for itself in week two. I automated our weekly reporting and saved my team maybe 15 hours a week. My only complaint? I wish I had taken it sooner.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    featured: false,
  },
  {
    id: 4,
    name: 'David Park',
    role: 'AI Researcher at InnovateAI',
    text: 'I was self-taught and hit a wall. The Deep Learning course filled the gaps I did not even know I had. Tariq knows his stuff — he will call you out when your model is overfitting.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
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
      { label: 'Courses', href: '#courses' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Free Guides', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Career Center', href: '#' },
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
    value: 'Karachi, Pakistan — Remote worldwide',
  },
];

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'Do I need to know coding before joining?',
    answer: 'For Introduction to AI and Prompt Engineering, no coding is required. For Machine Learning and Data Science, basic Python familiarity helps but we cover the fundamentals in week one. Deep Learning and AI Automation require solid Python skills.',
  },
  {
    id: 2,
    question: 'Are the classes live or recorded?',
    answer: 'All core content is recorded so you can learn at your own pace. We also host live Q&A sessions every Thursday at 8 PM PKT where you can ask questions directly. Recordings are posted within 24 hours.',
  },
  {
    id: 3,
    question: 'What if I fall behind?',
    answer: 'Life happens. You get lifetime access to all materials, so there is no penalty for pausing. Many students take 10 weeks to finish an 8-week course. We are not a university — we do not kick you out.',
  },
  {
    id: 4,
    question: 'Is there a refund policy?',
    answer: 'Yes. If you complete less than 30% of the course and it is not working for you, email us within 30 days of enrollment for a full refund. No forms, no guilt trips.',
  },
  {
    id: 5,
    question: 'Will I get a certificate?',
    answer: 'Yes, but only after you submit and pass the final project. We do not hand out certificates for watching videos. Employers respect that.',
  },
  {
    id: 6,
    question: 'Can my company pay for this?',
    answer: 'Absolutely. We issue VAT invoices and can set up bulk enrollments for teams. Email us at hello@futuremindsai.com for corporate pricing.',
  },
];
