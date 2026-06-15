import React, { useEffect, useRef } from 'react';

/**
 * HeroBrain — the hero's right-side AI brain visual.
 *
 * The artwork is the project's brain graphic (public/assets/hero-brain.png),
 * a genuinely transparent PNG (only the glowing brain, circuit traces and the
 * network constellation remain). It drops edge-to-edge onto the hero's live
 * blue field with no card, box, sparkle or white gap.
 *
 * On top of the static art we layer a fully code-driven, continuously-running
 * glow so the visual is alive:
 *   • __bloom  — a breathing radial halo behind the brain.
 *   • __sweep  — a light shimmer that travels across the circuit/brain lines.
 *                It is masked by the brain PNG itself, so the shimmer only ever
 *                rides on the artwork (never on the surrounding blue).
 * All overlays use mix-blend-mode: screen so they add light to the blue without
 * darkening it. Decorative only (aria-hidden).
 *
 * ───────────────────────────────────────────────────────────────────────────
 * HOVER INTERACTION (scoped exclusively to .hero-brain):
 *   FIX 1 "No boundary"      — the old blurred full-PNG echo layer
 *            (.brain-network-layer) and the masked branch-flow overlay
 *            (.brain-flow-overlay) — the two layers whose rectangular extents
 *            produced the card-like outline on hover — are GONE. Nothing on
 *            hover paints a rectangle anymore.
 *   FIX 2 "Organic edge glow" — a soft, feathered, layered drop-shadow that
 *            follows the brain's true alpha silhouette (.hero-brain__halo, a
 *            brain-shaped image layer that only contributes its drop-shadow).
 *            It makes the brain radiate light from within — no hard border.
 *   FIX 3 "Neural flow"       — a precise, sequential vein-by-vein flow drawn on
 *            an SVG overlay (.brain-vein-overlay) traced to the brain's real
 *            sulci. A bright front travels along one vein, then the next, each
 *            completed vein retaining a breathing glow until the whole network
 *            is lit; it then holds and repeats for as long as hover is active.
 *   PRESERVED — the cursor spotlight (Effect 3) and the rising data particles
 *            (Effect 2) are untouched.
 * On mouse leave every layer cleanly reverses within 600ms and returns to the
 * idle animation state. Touch devices fire the same awaken/sleep on
 * touchstart/touchend. The whole interaction is disabled under
 * prefers-reduced-motion (idle CSS already respects it too).
 * ───────────────────────────────────────────────────────────────────────────
 */

// FIX 3 — vein paths traced to the brain PNG's visible sulci/ridges in the
// image's own 636×674 coordinate space (the SVG overlay shares that viewBox and
// is contained 1:1 over the artwork, so each path rides a real ridge). They are
// ordered to propagate the light from the brain's core out to the frontal pole,
// over the top arcs, through the temporal lobe and finally out into the network.
const VEIN_PATHS = [
  'M150 352 C205 357 255 358 300 351', // lateral fissure (the spine)
  'M224 250 C226 284 220 314 212 342', // central fold
  'M252 246 C256 280 250 310 240 340', // central fold 2
  'M198 238 C194 272 186 304 178 334', // upper frontal fold
  'M168 244 C162 278 152 308 144 338', // frontal fold
  'M140 256 C132 286 122 314 120 344', // frontal fold (inner)
  'M96 312 C140 286 188 266 240 258',  // second top arc (front half)
  'M72 292 C112 262 166 238 222 226',  // outer top arc (front half)
  'M222 226 C268 226 310 242 344 274', // outer top arc (back half)
  'M240 258 C284 258 314 268 338 290', // second top arc (back half)
  'M58 324 C56 298 72 276 100 270',    // frontal pole outer rim
  'M64 352 C58 332 60 306 80 288',     // frontal pole loop
  'M86 372 C76 356 70 336 80 314',     // frontal pole inner loop
  'M152 376 C192 392 232 394 268 384', // temporal lobe (upper fold)
  'M130 398 C172 420 218 424 258 412', // temporal lobe (lower boundary)
  'M168 408 C205 422 244 420 276 405', // temporal lobe (mid fold)
  'M300 290 C322 300 340 316 350 340', // occipital ridge
  'M312 262 C332 280 346 302 352 326', // occipital ridge 2
  'M290 292 L340 290 L384 288',        // circuit trace (top)
  'M300 322 L352 320 L398 318',        // circuit trace (mid)
  'M296 358 C330 358 366 358 402 356', // circuit trace (low)
  'M360 300 L408 292 L450 298 L484 288', // reach into the network
  'M366 320 L420 318 L466 322 L500 318', // reach into the network
  'M350 340 L400 346 L444 342 L486 346', // reach into the network
];

// ── FIX 3 tuning knobs (see the prompt's tuning table) ──
const VEIN_FLOW_DURATION = 1800; // ms the bright front takes to travel one vein (1.8s — slow, cinematic)
const HOLD_BEFORE_RESET = 2500;  // ms the fully-lit brain holds before repeating
// With 24 vein paths, a near-sequential step (~0.9) would take ~40s to light the
// whole brain — far past the 12–18s "cinematic" target. 0.38 overlaps each vein's
// hand-off into the next so the full illumination lands at ~17.5s
// ( 23 × (1800×0.38) + 1800 ≈ 17.5s ) while every individual vein still draws over
// a slow 1.8s. The sequential build-up logic is unchanged.
const STEP_RATIO = 0.38;         // next vein starts at this fraction of the draw

const HeroBrain: React.FC = () => {
  // Single ref to the brain container; every effect queries only its children,
  // so nothing outside the brain visual is ever touched.
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced-motion: skip the entire hover interaction (idle CSS is
    // already neutralised by the prefers-reduced-motion media query).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Scoped element handles (all children of .hero-brain).
    const spotlight = container.querySelector<HTMLElement>('.brain-spotlight');
    if (!spotlight) return;

    // FIX 3 — collect the vein paths and pre-measure each one so the
    // stroke-dash draw is exact. Lengths are cached in a WeakMap.
    const veins = Array.from(
      container.querySelectorAll<SVGPathElement>('.brain-vein'),
    );
    const veinLength = new WeakMap<SVGPathElement, number>();
    veins.forEach((vein) => {
      const len = vein.getTotalLength ? vein.getTotalLength() : 300;
      veinLength.set(vein, len);
      vein.style.strokeDasharray = String(len);
      vein.style.strokeDashoffset = String(len);
    });

    // Touch devices have no hovering cursor → use the touch-pulse fallback.
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    // Shared interval / rAF / timer handles so they can be cleaned up.
    let particleInterval: number | null = null;
    let rafId: number | null = null;
    let pending: { x: number; y: number } | null = null;
    let flowTimer: number | null = null;
    let activeIndex = 0;
    let isHovered = false;

    /* ───────────────────────── EFFECT 2 — Data Pulse (PRESERVED) ─────────────
       Emitter for the looping rising data particles. Each particle self-removes
       when its CSS animation ends. */
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('brain-particle');
      const size = `${3 + Math.random() * 4}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.width = size;
      particle.style.height = size;
      particle.style.animationDuration = `${1.2 + Math.random() * 1}s`;
      container.appendChild(particle);
      particle.addEventListener('animationend', () => particle.remove());
    };

    /* ─────────────────── FIX 3 — Sequential neural-flow engine ────────────────
       Lights one vein at a time; each finished vein keeps a breathing glow
       (CSS .vein-complete) so the illuminated network builds up. When all veins
       are lit it holds, then restarts — for as long as hover is active. */
    const resetVeins = () => {
      veins.forEach((vein) => {
        vein.classList.remove('vein-flowing', 'vein-complete');
        // Snap (no transition) back to the un-drawn state for a clean restart.
        vein.style.transition =
          'stroke-dashoffset 0s, stroke .2s ease, filter .2s ease';
        vein.style.strokeDashoffset = String(veinLength.get(vein) ?? 300);
        vein.style.stroke = '';
        vein.style.filter = '';
      });
    };

    const flowNextVein = () => {
      if (!isHovered) return;

      if (activeIndex >= veins.length) {
        // Whole brain lit — hold, then run the cycle again.
        flowTimer = window.setTimeout(() => {
          if (isHovered) startNeuralFlow();
        }, HOLD_BEFORE_RESET);
        return;
      }

      const current = veins[activeIndex];
      current.classList.add('vein-flowing');
      // Animate the dash to draw the bright travelling front along this vein.
      current.style.transition =
        `stroke-dashoffset ${VEIN_FLOW_DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), ` +
        'stroke .2s ease, filter .2s ease';
      current.style.strokeDashoffset = '0';
      current.style.stroke = ''; // colour/glow driven by the CSS state classes
      current.style.filter = '';

      // The previous vein settles into a retained, breathing glow.
      if (activeIndex > 0) {
        const prev = veins[activeIndex - 1];
        prev.classList.remove('vein-flowing');
        prev.classList.add('vein-complete');
        prev.style.stroke = '';
        prev.style.filter = '';
      }

      activeIndex += 1;
      flowTimer = window.setTimeout(flowNextVein, VEIN_FLOW_DURATION * STEP_RATIO);
    };

    function startNeuralFlow() {
      isHovered = true;
      activeIndex = 0;
      resetVeins();
      // Defer one frame so the snap-reset paints before the first draw begins.
      flowTimer = window.setTimeout(flowNextVein, 16);
    }

    const stopNeuralFlow = () => {
      isHovered = false;
      if (flowTimer !== null) {
        clearTimeout(flowTimer);
        flowTimer = null;
      }
      // Fade every vein back to its resting state within 600ms.
      veins.forEach((vein) => {
        vein.style.transition =
          'stroke 1.2s ease, filter 1.2s ease, stroke-dashoffset 1.2s ease, opacity 1.2s ease';
        vein.classList.remove('vein-flowing', 'vein-complete');
        vein.style.strokeDashoffset = String(veinLength.get(vein) ?? 300);
        vein.style.stroke = '';
        vein.style.filter = 'none';
      });
    };

    /* ──────────── Shared awaken / sleep (orchestrates every hover layer) ──────
       awaken() ignites the organic edge glow (FIX 2, CSS), the neural flow
       (FIX 3) and the particle + spotlight effects; sleep() reverses them. */
    const awaken = () => {
      // FIX 2 organic halo + spotlight reveal are driven by this class.
      container.classList.add('brain-awakened');
      // FIX 3 sequential neural flow.
      startNeuralFlow();
      // EFFECT 2: start the particle emitter loop.
      particleInterval = window.setInterval(createParticle, 180);
    };

    const sleep = () => {
      // Reverse FIX 3 first (sets the 600ms fade transitions on the veins)…
      stopNeuralFlow();
      // …then drop the class so FIX 2 halo + spotlight fade out together.
      container.classList.remove('brain-awakened');
      if (particleInterval !== null) clearInterval(particleInterval);
      particleInterval = null;
    };

    /* ─────────────────── EFFECT 3 — Cursor spotlight (PRESERVED) ──────────────
       A soft radial light that tracks the cursor over the static brain without
       displacing, rotating or scaling it. */
    const onEnter = () => {
      awaken();
    };

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pending = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
      if (rafId !== null) return; // coalesce rapid moves into one frame
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        if (!pending) return;
        const { x, y } = pending;
        const spotX = (x + 0.5) * 100;
        const spotY = (y + 0.5) * 100;
        // FIX 1 — `closest-side` sizing (instead of the implicit `farthest-corner`)
        // guarantees the lit part of the radial always fades to fully transparent
        // before it can reach any edge of the spotlight's rectangular box, so the
        // gradient is never clipped into a straight bright edge. This is what was
        // painting the "boundary line" when the cursor sat off-centre over the
        // wide, bleeding container. The cursor-follow behaviour is unchanged.
        spotlight.style.background =
          `radial-gradient(circle closest-side at ${spotX}% ${spotY}%, rgba(180, 235, 255, 0.18) 0%, transparent 100%)`;
      });
    };

    const onLeave = () => {
      sleep();
    };

    const onTouchStart = () => {
      awaken();
    };
    const onTouchEnd = () => {
      sleep();
    };

    // Wire up the appropriate listener set for the device.
    if (isTouch) {
      container.addEventListener('touchstart', onTouchStart, { passive: true });
      container.addEventListener('touchend', onTouchEnd);
    } else {
      container.addEventListener('mouseenter', onEnter);
      container.addEventListener('mousemove', onMove);
      container.addEventListener('mouseleave', onLeave);
    }

    // Cleanup: detach listeners, stop loops, cancel timers/rAF on unmount.
    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      if (particleInterval !== null) clearInterval(particleInterval);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (flowTimer !== null) clearTimeout(flowTimer);
    };
  }, []);

  return (
    // `.brain-container` = the spec's hover target; `.hero-brain` keeps all
    // existing idle styling untouched.
    <div className="hero-brain brain-container" aria-hidden="true" ref={containerRef}>
      <span className="hero-brain__bloom" />
      {/* `.brain-visual` wraps the art so the FIX 2 halo, the FIX 3 vein overlay
          and the shimmer read as one cohesive graphic. */}
      <div className="brain-visual">
        {/* FIX 2 — organic edge-glow layer. Identical brain image sitting just
            behind the artwork; at idle it is invisible (opacity 0). On hover it
            fades in and casts a soft, feathered drop-shadow that follows the
            brain's true silhouette — the glow emanates from the shape, never a
            rectangle. */}
        <img
          className="hero-brain__halo"
          src="/assets/hero-brain.png"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
        />
        <img
          className="hero-brain__img"
          src="/assets/hero-brain.png"
          alt=""
          loading="eager"
          decoding="async"
        />
        <span className="hero-brain__sweep" />
        {/* FIX 3 — sequential vein-by-vein neural flow. The overlay shares the
            PNG's 636×674 viewBox and is contained 1:1 over the artwork, so each
            traced path rides a real brain ridge. Idle: every vein is opacity 0
            and fully dash-offset (invisible). */}
        <svg
          className="brain-vein-overlay"
          viewBox="0 0 636 674"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {VEIN_PATHS.map((d, i) => (
            <path key={i} className="brain-vein" data-vein-index={i} d={d} />
          ))}
        </svg>
      </div>
      {/* Cursor-follow spotlight overlay (Effect 3C). Idle: invisible. */}
      <div className="brain-spotlight" />
    </div>
  );
};

export default HeroBrain;
