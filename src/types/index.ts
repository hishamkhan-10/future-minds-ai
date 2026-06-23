export interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  gradient: string;
  price: number;
  originalPrice: number;
  instructor: string;
  nextStart: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
  featured?: boolean;
}

export interface Stat {
  id: number;
  label: string;
  target: number;
  suffix: string;
  decimals?: number;
}

export interface WhyUsItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
