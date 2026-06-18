'use client';

import React, { useCallback, useEffect, useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './ui/Button';

/**
 * SignUpPage — the dedicated "Create an account" screen mounted at the `/signup`
 * route. It reuses the *exact* visual language of the Sign In screen (the
 * `.signin-overlay` background + the centered light card and all `.signin-*`
 * styles) so the two flows read as one cohesive product, while collecting the
 * extra details a new account needs: full name, email, password and a password
 * confirmation, plus agreement to the Terms / Privacy Policy.
 *
 * Navigation is fully client-side via the Next.js router — the "Back" button and
 * the Escape key both `router.push('/')` (no hard reload), and the footer
 * "Sign in" link routes to `/signin` for users who already have an account.
 */
const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const titleId = useId();
  const subtitleId = useId();

  // Return to the homepage client-side (no reload), preserving SPA navigation.
  const goHome = useCallback(() => {
    router.push('/');
  }, [router]);

  // Footer "Sign in" — route to the dedicated /signin screen (no reload).
  const handleSignIn = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      router.push('/signin');
    },
    [router],
  );

  // Lightweight client-side validation. This is a static marketing site with no
  // backend yet, so on a valid submission we simply acknowledge and route the
  // user back to Sign In — wiring this to a real auth API is a later step.
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
        setError('Please fill in all fields.');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!agreed) {
        setError('Please agree to the Terms of Service and Privacy Policy.');
        return;
      }
      setError('');
      // Account creation succeeded (front-end only) — send them to Sign In.
      router.push('/signin');
    },
    [fullName, email, password, confirmPassword, agreed, router],
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
      className="signin-overlay signup-page"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={subtitleId}
    >
      {/* Wave background — identical to the Sign In screen so the two flows
          share a single visual identity. Drawn purely as vectors so it scales
          sharply at any size with no raster asset. */}
      <div className="signin-bg" aria-hidden="true">
        <svg
          className="signin-bg-svg"
          viewBox="0 0 1440 760"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="signupBlue" x1="0" y1="0" x2="0.18" y2="1">
              <stop offset="0" stopColor="#2f93f4" />
              <stop offset="1" stopColor="#1877e2" />
            </linearGradient>
            <linearGradient id="signupWhite" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#eef3fb" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="1440" height="760" fill="url(#signupBlue)" />

          <path
            fill="url(#signupWhite)"
            d="M-40,150 C220,120 380,118 560,210 C720,295 870,366 1030,348 C1200,329 1340,300 1480,300 L1480,820 L-40,820 Z"
          />

          <path
            fill="url(#signupBlue)"
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
        {/* Brand lockup — sits above the card, centered. */}
        <div className="signin-brand">
          <span className="signin-brand-name">Future Minds AI</span>
          <span className="signin-brand-tag">AI Learning Platform</span>
        </div>

        <div className="signin-card" role="document">
          <h2 className="signin-title" id={titleId}>
            Create your account
          </h2>
          <p className="signin-subtitle" id={subtitleId}>
            Start learning AI with Future Minds today
          </p>

          <form className="signin-form" onSubmit={handleSubmit} noValidate>
            <div className="signin-group">
              <label htmlFor="signup-name">Full name</label>
              <div className="signin-field">
                <svg className="signin-field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="signin-group">
              <label htmlFor="signup-email">Email</label>
              <div className="signin-field">
                <svg className="signin-field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="signin-group">
              <label htmlFor="signup-password">Password</label>
              <div className="signin-field">
                <svg className="signin-field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="signin-group">
              <label htmlFor="signup-confirm">Confirm password</label>
              <div className="signin-field">
                <svg className="signin-field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="signup-confirm"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="signin-password-toggle"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  aria-pressed={showConfirm}
                >
                  {showConfirm ? (
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
              <input
                type="checkbox"
                name="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            {error && (
              <p role="alert" className="signin-error">
                {error}
              </p>
            )}

            <Button type="submit" variant="primary" className="signin-submit btn-full">
              Create account
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          </form>

          <p className="signin-footer">
            Already have an account?{' '}
            <a href="/signin" onClick={handleSignIn}>
              Sign in
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

export default SignUpPage;
