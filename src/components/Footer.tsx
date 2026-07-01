import React, { useState } from 'react';
import { footerLinkGroups } from '../data/siteData';

interface SocialLink {
  label: string;
  href: string;
  icon: JSX.Element;
}

const socialLinks: SocialLink[] = [
  {
    label: 'X',
    href: '',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              <img src="assets/FMA%20LOGO.svg" alt="Future Minds AI Training Logo" />
              <span>Future Minds AI</span>
            </a>
            <p>Hands-on AI agent training in Lahore. Build for international clients from week one. No coding required.</p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href || '#'} aria-label={social.label} onClick={!social.href ? (e) => e.preventDefault() : undefined}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          {footerLinkGroups.map((group) => (
            <div className="footer-links" key={group.title}>
              <h4>{group.title}</h4>
              <ul>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} onClick={link.href === '#' ? (e) => e.preventDefault() : undefined}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="newsletter">
            <h4>Free AI tips, weekly</h4>
            <p>No spam. One email a week with practical AI workflows you can use Monday morning.</p>
            {subscribed ? (
              <p style={{ color: '#4ade80', fontSize: '0.875rem', fontWeight: 500 }}>Thanks for subscribing.</p>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Join</button>
              </form>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Future Minds AI Training. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
