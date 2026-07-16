import React, { useEffect } from 'react';
import HeroVisual from './HeroVisual';

const renderLetterSpans = (text: string) =>
  text.split('').map((char, index) => (
    <span key={`${char}-${index}`} className="hero-letter">
      {char}
    </span>
  ));

const Hero: React.FC = () => {
  // Mobile browsers report 100vh as the *largest* viewport (URL bar hidden), so
  // a strictly-locked hero can still spill under the address bar. We mirror the
  // real, currently-visible innerHeight into the --vh custom property; the hero
  // height falls back to calc(var(--vh)*100) on browsers without 100dvh support.
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Decorative, code-generated curved background. Purely presentational
          (aria-hidden) so it never alters the hero's content or layout.
          Three smooth wavy bands matching the reference design:
            • Part 1 (top)    — logo "M" blue (#0094f4)
            • Part 2 (middle) — pure white (#ffffff)
            • Part 3 (bottom) — logo "M" blue (#0094f4)
          The exact blue is sampled from the large "M" polygon in the FMA logo
          (public/assets/FMA LOGO.svg → class cls-8 = #0094f4).

          Technique: one solid blue base layer renders BOTH the top (Part 1) and
          bottom (Part 3) regions; a single white band is then painted on top of
          it, bounded above by the upper wave and below by the lower wave. Filling
          the middle over a continuous blue base means the Part 1↔2 and Part 2↔3
          transitions are inherently seamless — there are no separate edges to
          align. viewBox + "slice" keeps every curve scaling smoothly across
          desktop, tablet and mobile. */}
      <div className="hero-bg" aria-hidden="true">
        {/* Desktop SVG — navy + flat blue / white three-band wave.
            Active at ≥1180px (laptops, desktops, large monitors). */}
        <svg
          className="hero-bg-svg hero-bg-svg--desktop"
          viewBox="0 0 1440 810"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blue base — supplies Part 1 (top) and Part 3 (bottom). */}
          <rect width="1440" height="810" fill="#009ff5" />

          {/* Part 2 — pure-white middle band that hosts all hero content.
              Top edge = upper wave (left→right); bottom edge = lower wave
              (right→left). The straight left edge (Z) closes the band.

              Two variants of the same band are provided and toggled by CSS:
              the "wide" wave reproduces the reference proportions on the
              two-column desktop/tablet layout, while the "stack" wave lifts the
              upper wave once the layout collapses to a single column (≤1024px)
              so the taller stacked content stays on the white surface. The blue
              base is shared, so both keep the exact Part 1/2/3 colour story. */}
          <path
            className="hero-wave--wide"
            fill="#ffffff"
            d="M0 200
               C180 178 360 166 540 188
               C720 210 820 380 1000 380
               C1180 380 1320 318 1440 350
               L1440 700
               C1320 706 1200 706 1040 696
               C860 684 720 730 540 726
               C360 722 160 668 0 656
               Z"
          />
          <path
            className="hero-wave hero-wave--stack"
            fill="#ffffff"
            d="M0 70
               C160 58 300 46 450 54
               C600 62 650 96 760 90
               C880 84 950 56 1060 64
               C1200 74 1330 92 1440 84
               L1440 712
               C1390 716 1340 720 1240 716
               C1100 710 980 690 820 696
               C700 700 600 736 450 738
               C300 740 150 718 0 706
               Z"
          />
        </svg>

        {/* Sign-in-style gradient SVG — replaces the desktop wave on all
            non-desktop devices (≤1179px). Colours, gradients, smoothness and
            polish match the sign-in / sign-up overlay background exactly.
            Active via CSS toggle so desktop (≥1180px) is completely untouched. */}
        <svg
          className="hero-bg-svg hero-bg-svg--signin"
          viewBox="0 0 1440 760"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroBlue" x1="0" y1="0" x2="0.18" y2="1">
              <stop offset="0" stopColor="#2f93f4" />
              <stop offset="1" stopColor="#1877e2" />
            </linearGradient>
            <linearGradient id="heroWhite" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#eef3fb" />
            </linearGradient>
          </defs>

          {/* Blue field — the base everything sits on. */}
          <rect x="0" y="0" width="1440" height="760" fill="url(#heroBlue)" />

          {/* White middle band — its top edge is the upper wave; it fills down
              past the bottom of the viewBox. */}
          <path
            fill="url(#heroWhite)"
            d="M-40,150 C220,120 380,118 560,210 C720,295 870,366 1030,348 C1200,329 1340,300 1480,300 L1480,820 L-40,820 Z"
          />

          {/* Bottom blue wave — painted back over the white at the foot. */}
          <path
            fill="url(#heroBlue)"
            d="M-40,672 C240,650 480,708 760,708 C1040,708 1260,650 1480,668 L1480,820 L-40,820 Z"
          />
        </svg>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            {renderLetterSpans("Don\u2019t Watch AI")}
            <br className="hero-break" />
            {renderLetterSpans("Take Over \u2013 Get")}
            <br className="hero-break" />
            {renderLetterSpans("Paid to Build It.")}
          </h1>
          <p className="hero-subtitle">
            Lahore&rsquo;s Most Practical Hands-On AI Courses in Lahore. Master AI Chat, Voice, Web &amp; WhatsApp Agents in just 10 weeks — no coding required. The skill businesses across the US, UK, and UAE are paying $500–$2,000 per month for. Claim Your Seat Before It&rsquo;s Gone.
          </p>
        </div>
      </div>

      <HeroVisual />
    </section>
  );
};

export default Hero;
