export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
  featured?: boolean;
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
