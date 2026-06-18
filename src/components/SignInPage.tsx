'use client';

import React, { useCallback, useEffect, useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './ui/Button';

/**
 * SignInPage — the dedicated Sign In screen mounted at the `/signin` route. It
 * reuses the *exact* Sign In UI that previously lived in the navbar-launched
 * overlay (the `.signin-overlay` background + the centered light card), now
 * persisted as its own URL so a browser reload lands the user back here rather
 * than on the homepage.
 *
 * Navigation is fully client-side via the Next.js router — the "Back" button and
 * the Escape key both `router.push('/')` (no hard reload), and the footer
 * "Create an account" link routes to the dedicated `/signup` screen.
 */
const SignInPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const titleId = useId();
  const subtitleId = useId();

  // Return to the homepage client-side (no reload), preserving SPA navigation.
  const goHome = useCallback(() => {
    router.push('/');
  }, [router]);

  // Footer "Create an account" — route to the dedicated /signup screen where a
  // new user can register (client-side, no reload).
  const handleEnroll = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      router.push('/signup');
    },
    [router],
  );

  // Escape returns to the homepage, mirroring the "Back" button.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        goHome();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goHome]);

  return (
    <div
      className="signin-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={subtitleId}
    >
      {/* Wave background — a bright-blue field crossed by two crisp bands
          (white middle, blue bottom), drawn purely as vectors so it scales
          sharply at any size with no raster asset. preserveAspectRatio="none"
          stretches it edge-to-edge; the paths run past the viewBox on every
          side so the edges never reveal the base colour at the borders. */}
      <div className="signin-bg" aria-hidden="true">
        <svg
          className="signin-bg-svg"
          viewBox="0 0 1440 760"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="signinBlue" x1="0" y1="0" x2="0.18" y2="1">
              <stop offset="0" stopColor="#2f93f4" />
              <stop offset="1" stopColor="#1877e2" />
            </linearGradient>
            <linearGradient id="signinWhite" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#eef3fb" />
            </linearGradient>
          </defs>

          {/* Blue field — the base everything sits on. */}
          <rect x="0" y="0" width="1440" height="760" fill="url(#signinBlue)" />

          {/* White middle band — its top edge is the upper wave; it fills down
              past the bottom of the viewBox. */}
          <path
            fill="url(#signinWhite)"
            d="M-40,150 C220,120 380,118 560,210 C720,295 870,366 1030,348 C1200,329 1340,300 1480,300 L1480,820 L-40,820 Z"
          />

          {/* Bottom blue wave — painted back over the white at the foot. */}
          <path
            fill="url(#signinBlue)"
            d="M-40,672 C240,650 480,708 760,708 C1040,708 1260,650 1480,668 L1480,820 L-40,820 Z"
          />
        </svg>
      </div>

      {/* Back button — fixed to the top-left of the overlay (not the card).
          Returns the user to the homepage client-side (no reload). */}
      <button type="button" className="signin-back" onClick={goHome}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </button>

      <div className="signin-stack">
        {/* Brand lockup — sits above the card, centered (mirrors the reference's
            product name + subtitle layout). */}
        <div className="signin-brand">
          <span className="signin-brand-name">Future Minds AI</span>
          <span className="signin-brand-tag">AI Learning Platform</span>
        </div>

        <div className="signin-card" role="document">
          <h2 className="signin-title" id={titleId}>
            Welcome back
          </h2>
          <p className="signin-subtitle" id={subtitleId}>
            Sign in with your email and password
          </p>

          <form className="signin-form" onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="signin-group">
              <label htmlFor="signin-email">Email</label>
              <div className="signin-field">
                <svg className="signin-field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
                <input
                  id="signin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="signin-group">
              <label htmlFor="signin-password">Password</label>
              <div className="signin-field">
                <svg className="signin-field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="signin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="signin-password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <label className="signin-remember">
              <input type="checkbox" name="remember" />
              <span>Remember me</span>
            </label>

            <Button type="submit" variant="primary" className="signin-submit btn-full">
              Continue with Password
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          </form>

          <button type="button" className="signin-passkey" onClick={(e) => e.preventDefault()}>
            Sign in with Passkey
          </button>

          <p className="signin-footer">
            New to Future Minds AI?{' '}
            <a href="/signup" onClick={handleEnroll}>
              Create an account
            </a>
          </p>
        </div>

        {/* Legal line — below the card, outside its boundary. */}
        <p className="signin-legal">
          By continuing, you agree to our{' '}
          <a href="#" onClick={(e) => e.preventDefault()}>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" onClick={(e) => e.preventDefault()}>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
