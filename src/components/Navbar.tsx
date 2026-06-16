import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNavbarScroll } from '../hooks/useNavbarScroll';
import { useTheme } from '../hooks/useTheme';
import { navLinks } from '../data/siteData';
import Button from './ui/Button';

const Navbar: React.FC = () => {
  const router = useRouter();
  const isScrolled = useNavbarScroll(50);
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // "Enroll Now" navigates to the dedicated /signin route (client-side, no
  // reload) instead of toggling an in-page modal. Nothing else in the navbar
  // is affected.
  const handleEnrollClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setMenuOpen(false); // close the mobile drawer if it was open
      router.push('/signin');
    },
    [router],
  );

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
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

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

  // ── Shared element: drawer logo appears to never move ─────────────────────
  // Scoped strictly to the hamburger breakpoint (max-width: 1024px) so desktop
  // is never touched. Runs in useLayoutEffect so the lock is committed before
  // the browser paints — the logo never flashes at its natural drawer spot.
  useLayoutEffect(() => {
    const headerLeft = drawerHeaderLeftRef.current;
    const navLogo = navLogoRef.current;
    const closeBtn = drawerCloseRef.current;
    if (!headerLeft || !navLogo) return;

    // Desktop (> 1024px): never run the effect; clear any stray inline styles.
    const isHamburgerDevice = window.matchMedia('(max-width: 1024px)').matches;
    if (!isHamburgerDevice) {
      headerLeft.style.cssText = '';
      if (closeBtn) closeBtn.style.removeProperty('--close-nudge-y');
      return;
    }

    if (menuOpen) {
      // Measure the navbar pill logo's live viewport rect (the source), then
      // PIN the drawer logo group there with position:fixed. Because fixed is
      // resolved against the viewport — not the sliding panel — the logo is
      // physically incapable of moving while the panel opens around it. The
      // pill logo fades out beneath it (CSS); since the drawer logo matches the
      // pill's size / gap / font / line-height exactly, the swap is invisible:
      // the lockup truly never moves a single pixel.
      const source = navLogo.getBoundingClientRect();
      headerLeft.style.position = 'fixed';
      headerLeft.style.top = `${source.top}px`;
      headerLeft.style.left = `${source.left}px`;
      headerLeft.style.margin = '0';
      headerLeft.style.zIndex = '1002'; // above the fading pill logo (z 1001)
      headerLeft.style.transform = 'none';
      headerLeft.style.transition = 'none';

      // Align the close (✕) button's vertical centre with the logo/title line.
      // The logo is pinned out of normal flow, so the header would otherwise
      // centre the ✕ on its own box and sit a few px high. Nudge it onto the
      // exact navbar-logo centre (using the logo icon as the reference row) so
      // the ✕ reads as perfectly in line with the logo + title at every width.
      // Driven via a CSS var so the existing :hover rotate still composes.
      if (closeBtn) {
        const navImg = navLogo.querySelector('img') as HTMLElement | null;
        const ref = (navImg ?? navLogo).getBoundingClientRect();
        const lineCenter = ref.top + ref.height / 2;
        closeBtn.style.setProperty('--close-nudge-y', '0px');
        const cb = closeBtn.getBoundingClientRect();
        closeBtn.style.setProperty('--close-nudge-y', `${(lineCenter - (cb.top + cb.height / 2)).toFixed(2)}px`);
      }
    } else {
      // Closing: leave the logo pinned in place while the panel slides out and
      // the pill logo fades back in at the identical pixel, then clear the
      // inline styles once the panel is gone so the swap back is also invisible.
      const el = headerLeft;
      if (!el.style.position) return; // never opened on this device yet
      const reset = window.setTimeout(() => {
        el.style.cssText = '';
        if (closeBtn) closeBtn.style.removeProperty('--close-nudge-y');
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

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} id="navMenu" ref={navMenuRef}>
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
              ref={drawerCloseRef}
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
                {link.label}
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
          <li>
            <Button
              variant="primary"
              size="sm"
              className="nav-cta"
              onClick={handleEnrollClick}
            >
              Enroll Now
            </Button>
          </li>
        </ul>

        {/* 3. Theme toggle — far-right of the mobile bar (hidden on desktop;
            the desktop theme toggle stays inside .nav-menu, untouched). */}
        <button
          className="theme-toggle nav-theme-mobile"
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
    </nav>
  );
};

export default Navbar;
