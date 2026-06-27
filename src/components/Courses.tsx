import React, { useState, useEffect, useRef, useCallback } from 'react';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';
import { courses } from '../data/siteData';

const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const;
type Filter = (typeof filters)[number];

const AUTOPLAY_MS = 3000;

function getPerView(width: number): number {
  if (width <= 768) return 1;
  if (width <= 1024) return 2;
  return 3;
}

const Courses: React.FC = () => {
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [perView, setPerView] = useState(() =>
    typeof window !== 'undefined' ? getPerView(window.innerWidth) : 3
  );
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const pendingPrev = useRef(false);

  const filteredCourses = courses.filter(
    (course) =>
      activeFilter === 'All' ||
      course.level === activeFilter ||
      course.level === 'All Levels'
  );

  const total = filteredCourses.length;
  const canSlide = total > perView;

  // Append clones of the first `perView` cards so the track can keep moving
  // forward past the last card and wrap seamlessly (no reverse "rewind").
  const slides = canSlide
    ? [...filteredCourses, ...filteredCourses.slice(0, perView)]
    : filteredCourses;

  // Reset whenever the slide set changes
  useEffect(() => {
    setIndex(0);
    setAnimate(true);
    pendingPrev.current = false;
  }, [activeFilter, perView]);

  // Keep perView in sync with the viewport
  useEffect(() => {
    const onResize = () => setPerView(getPerView(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Re-enable the transition one frame after a no-animation snap/jump.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate(true);
        if (pendingPrev.current) {
          pendingPrev.current = false;
          setIndex(total - 1);
        }
      })
    );
    return () => cancelAnimationFrame(id);
  }, [animate, total]);

  const next = useCallback(() => {
    setIndex((i) => (i >= total ? total : i + 1));
  }, [total]);

  const prev = useCallback(() => {
    if (index <= 0) {
      // Jump invisibly to the cloned-start position, then animate one step back.
      pendingPrev.current = true;
      setAnimate(false);
      setIndex(total);
    } else {
      setIndex((i) => i - 1);
    }
  }, [index, total]);

  const goTo = useCallback((i: number) => {
    setAnimate(true);
    setIndex(i);
  }, []);

  // Once we land on the cloned-start position, snap back to the real start
  // with no animation — visually identical, so the loop looks continuous.
  const handleTransitionEnd = () => {
    if (index >= total) {
      setAnimate(false);
      setIndex(0);
    }
  };

  // Autoplay every 5s — paused while hovering the section
  useEffect(() => {
    if (paused || prefersReducedMotion || !canSlide) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, prefersReducedMotion, canSlide, next]);

  const handleFilter = (filter: Filter) => {
    setActiveFilter(filter);
  };

  const activeDot = total > 0 ? ((index % total) + total) % total : 0;

  return (
    <section
      className="courses section section-dark"
      id="courses"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <SectionHeader
          tag="Courses"
          title="Practical training, real prices"
          subtitle="No hidden fees. No subscription traps. Pay once, learn forever."
        />
        <div className="course-filters" role="tablist" aria-label="Filter courses by level">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => handleFilter(filter)}
              role="tab"
              aria-selected={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="course-carousel">
          <div className="carousel-viewport">
            <div
              className={`carousel-track ${canSlide ? '' : 'is-centered'}`}
              style={{
                transform: `translateX(-${index * (100 / perView)}%)`,
                transition: animate ? undefined : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((course, i) => (
                <div
                  className="carousel-slide"
                  key={`${course.id}-${i}`}
                  style={{ flexBasis: `${100 / perView}%` }}
                  aria-hidden={i >= total}
                >
                  <div className="course-card">
                    <div className="course-image">
                      <div className="course-badge">{course.level}</div>
                      <div
                        className="course-img-placeholder"
                        style={{ background: course.gradient }}
                      />
                    </div>
                    <div className="course-content">
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <div className="course-meta">
                        <span className="duration">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                          </svg>
                          {course.duration}
                        </span>
                        <span className="level">{course.level}</span>
                      </div>
                      <div className="course-instructor">
                        With <strong>{course.instructor}</strong>
                      </div>
                      <div className="course-next">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        Next start: {course.nextStart}
                      </div>
                      <div className="course-price-row">
                        <span className="course-price">
                          ${course.price}
                          <span>${course.originalPrice}</span>
                        </span>
                        <Button variant="primary" size="sm" href="#contact">
                          Enroll
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {canSlide && (
            <div className="carousel-controls">
              <button className="carousel-arrow" onClick={prev} aria-label="Previous courses">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <div className="carousel-dots" role="tablist" aria-label="Course slides">
                {Array.from({ length: total }, (_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot ${activeDot === i ? 'active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-selected={activeDot === i}
                    role="tab"
                  />
                ))}
              </div>
              <button className="carousel-arrow" onClick={next} aria-label="Next courses">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Courses;
