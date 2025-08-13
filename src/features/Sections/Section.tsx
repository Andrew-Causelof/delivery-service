import React from 'react';
import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  desc?: string;
  slug: string;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, desc, slug, children }) => {
  return (
    <section className="section-cetegory-list" data-section={slug}>
      <div className="heading">
        <div className="title">{title}</div>
        <div className="desc">{desc}</div>
      </div>
      <div className="plates " data-section={slug}>
        {children}
      </div>
    </section>
  );
};

export default Section;
