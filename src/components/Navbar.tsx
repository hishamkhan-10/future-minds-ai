import React, { useState, useEffect, useCallback } from 'react';
import { useNavbarScroll } from '../hooks/useNavbarScroll';
import { useTheme } from '../hooks/useTheme';
import { navLinks } from '../data/siteData';
import Button from './ui/Button';

const Navbar: React.FC = () => {
  const isScrolled = useNavbarScroll(50);
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleLinkClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      const sections = document.querySelectorAll('section[id]');

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight && sectionId) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (menuOpen && !target.closest('.nav-menu') && !target.closest('.hamburger')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar" aria-label="Primary">
      <div className="container nav-container">
        <a href="#" className="nav-logo">
          <img src="assets/FMA%20LOGO.svg" alt="Future Minds AI Training Logo" />
          <span>Future Minds AI</span>
        </a>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} id="navMenu">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                onClick={handleLinkClick}
                aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                /* Moon — click to go dark */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                /* Sun — click to go light */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
          </li>
          <li>
            <Button variant="primary" size="sm" href="#contact" className="nav-cta">
              Enroll Now
            </Button>
          </li>
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          id="hamburger"
          onClick={handleToggle}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
