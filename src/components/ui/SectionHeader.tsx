import React from 'react';

interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ tag, title, subtitle }) => {
  return (
    <div className="section-header">
      <span className="section-tag">{tag}</span>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
