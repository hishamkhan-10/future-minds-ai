import React, { useEffect, useRef, useState } from 'react';
import { stats } from '../data/siteData';
import { useCountUp } from '../hooks/useCountUp';
import type { Stat } from '../types';

const StatBlock: React.FC<{ stat: Stat; isActive: boolean }> = ({ stat, isActive }) => {
  const count = useCountUp(stat.target, 2000, isActive, stat.decimals ?? 0);
  const display =
    stat.decimals && stat.decimals > 0
      ? count.toFixed(stat.decimals)
      : Math.round(count).toLocaleString();

  return (
    <div className="stat-block">
      <div>
        <span className="stat-number">{display}</span>
        <span className="stat-suffix">{stat.suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
};

const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" id="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats-inner">
          {stats.map((stat) => (
            <StatBlock key={stat.id} stat={stat} isActive={isActive} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
