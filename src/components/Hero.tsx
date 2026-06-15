import React, { useEffect } from 'react';
import Button from './ui/Button';
import HeroBrain from './HeroBrain';

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
        <svg
          className="hero-bg-svg"
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
            className="hero-wave hero-wave--wide"
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
      </div>

      {/* Right-side blue depth overlay. In the reference the right half sits on
          a deeper blue than the bright hero field — this paints that darker
          zone (above the wave layer, below the content) so the glowing brain
          rests on blue instead of the white wave band. Decorative only. */}
      <div className="hero-aura" aria-hidden="true" />

      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            We teach working<br className="hero-break" />
            professionals AI that<br className="hero-break" />
            <em>delivers real results.</em>
          </h1>
          <p className="hero-subtitle">
            No computer science degree needed. Just practical, hands-on AI and ML training
            built by people who actually work in the field. Based in Karachi. Serving students worldwide.
          </p>
          <div className="hero-cta">
            <Button variant="primary" size="lg" href="#contact">
              See Upcoming Courses
            </Button>
            <Button variant="outline" size="lg" href="#courses">
              View Pricing
            </Button>
          </div>
          <div className="hero-trust">
            <div className="trust-avatars">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="Student" width="36" height="36" decoding="async" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Student" width="36" height="36" decoding="async" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="Student" width="36" height="36" decoding="async" />
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Student" width="36" height="36" decoding="async" />
            </div>
            <p>
              <strong>1,847</strong> students since 2023
            </p>
          </div>
        </div>

        {/* Right column — fully code-generated glowing AI brain + network
            visualization (SVG silhouette/mesh/traces + canvas particle field).
            No images are used; see HeroBrain.tsx. */}
        <div className="hero-visual">
          <HeroBrain />
        </div>
      </div>
    </section>
  );
};

export default Hero;
