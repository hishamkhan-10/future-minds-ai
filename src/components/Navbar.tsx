import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { useNavbarScroll } from '../hooks/useNavbarScroll';
import { useTheme } from '../hooks/useTheme';
import { navLinks } from '../data/siteData';

const Navbar: React.FC = () => {
  const isScrolled = useNavbarScroll(50);
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Shared-element transition (hamburger devices only). The pill navbar's
  // logo + brand name (.nav-logo) is the single logo/title pair visible on
  // these screens; when the drawer opens, its own logo group
  // (.drawer-header-left) must appear to never move — it stays locked on the
  // exact pixel the pill logo occupied while the panel slides in around it and
  // the pill logo fades out beneath it. We pin it with position:fixed to the
  // navbar logo's live viewport coordinates, never touching desktop.
  const navLogoRef = useRef<HTMLAnchorElement>(null);
  const navMenuRef = useRef<HTMLUListElement>(null);
  const drawerHeaderLeftRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef(0);
  const swipeDeltaX = useRef(0);

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

  // ── Esc key closes the drawer ─────────────────────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // ── Focus trap: keep Tab cycling inside the open drawer ───────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const menu = navMenuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // Focus the first element when drawer opens
    first.focus();

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTabTrap);
    return () => document.removeEventListener('keydown', handleTabTrap);
  }, [menuOpen]);

  // ── Swipe-to-close: drag the drawer closed on touch devices ──────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    swipeStartX.current = e.touches[0].clientX;
    swipeDeltaX.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - swipeStartX.current;
    if (dx > 0) {
      swipeDeltaX.current = dx;
      const menu = navMenuRef.current;
      if (menu) {
        const maxTranslate = Math.min(dx * 0.5, 150);
        menu.style.transition = 'none';
        menu.style.transform = `translateX(${maxTranslate}px)`;
        menu.style.opacity = `${1 - (dx / 500)}`;
      }
      const backdrop = backdropRef.current;
      if (backdrop) {
        backdrop.style.opacity = `${0.6 - (dx / 500) * 0.6}`;
      }
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    const menu = navMenuRef.current;
    if (menu) {
      menu.style.transition = '';
      menu.style.transform = '';
      menu.style.opacity = '';
    }
    const backdrop = backdropRef.current;
    if (backdrop) {
      backdrop.style.opacity = '';
    }
    if (swipeDeltaX.current > 120) {
      setMenuOpen(false);
    }
    swipeDeltaX.current = 0;
  }, []);

  // ── Shared element: drawer logo appears to never move ─────────────────────
  // Scoped strictly to the hamburger breakpoint (max-width: 1024px) so desktop
  // is never touched. Runs in useLayoutEffect so the lock is committed before
  // the browser paints — the logo never flashes at its natural drawer spot.
  useLayoutEffect(() => {
    const headerLeft = drawerHeaderLeftRef.current;
    const navLogo = navLogoRef.current;
    if (!headerLeft || !navLogo) return;

    const drawerHeader = headerLeft.closest('.drawer-header') as HTMLElement | null;

    // Desktop (> 1024px): never run the effect; clear any stray inline styles.
    const isHamburgerDevice = window.matchMedia('(max-width: 1024px)').matches;
    if (!isHamburgerDevice) {
      headerLeft.style.cssText = '';
      if (drawerHeader) drawerHeader.style.cssText = '';
      return;
    }

    if (menuOpen) {
      const source = navLogo.getBoundingClientRect();
      headerLeft.style.position = 'fixed';
      headerLeft.style.top = `${source.top}px`;
      headerLeft.style.left = `${source.left}px`;
      headerLeft.style.margin = '0';
      headerLeft.style.zIndex = '1002';
      headerLeft.style.transform = 'none';
      headerLeft.style.transition = 'none';

      if (drawerHeader) {
        drawerHeader.style.minHeight = `${source.height}px`;
        drawerHeader.style.paddingTop = '0';
        drawerHeader.style.paddingBottom = '0';
      }
    } else {
      const el = headerLeft;
      if (!el.style.position) return;
      const reset = window.setTimeout(() => {
        el.style.cssText = '';
        if (drawerHeader) drawerHeader.style.cssText = '';
      }, 360);
      return () => window.clearTimeout(reset);
    }
  }, [menuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`} id="navbar" aria-label="Primary">
      <div className="container nav-container">
        {/* 1. Hamburger — first on the left (hidden on desktop via CSS) */}
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

        {/* 2. Logo + brand name — second, beside the hamburger */}
        <a href="#" className="nav-logo" ref={navLogoRef}>
          <img src="assets/FMA%20LOGO.svg" alt="Future Minds AI Training Logo" />
          <span>Future Minds AI</span>
        </a>

        {/* Backdrop overlay — visible only when drawer is open */}
        <div
          className={`nav-backdrop ${menuOpen ? 'active' : ''}`}
          ref={backdropRef}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        <ul
          className={`nav-menu ${menuOpen ? 'active' : ''}`}
          id="navMenu"
          ref={navMenuRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Drawer header — logo + brand name on the left, close button on the
              far right; shown only inside the mobile drawer (hidden on desktop
              via CSS). */}
          <li className="drawer-header">
            <div className="drawer-header-left" ref={drawerHeaderLeftRef}>
              <img src="assets/FMA%20LOGO.svg" alt="Future Minds AI Training Logo" className="drawer-logo" />
              <span className="drawer-brand-name">Future Minds AI</span>
            </div>
            <button
              className="drawer-close"
              onClick={handleLinkClick}
              aria-label="close menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </li>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                onClick={handleLinkClick}
                aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
              >
                <span>{link.label}</span>
                <span className="nav-arrow" aria-hidden="true">
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="5" x2="12" y2="5" />
                    <polyline points="9,2 13,5 9,8" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
          <li className="nav-theme-drawer-item">
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
        </ul>

        {/* Desktop-only actions section: CTA + theme toggle.
            On mobile this is hidden; the drawer contains its own copies. */}
        <div className="nav-desktop-actions">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
