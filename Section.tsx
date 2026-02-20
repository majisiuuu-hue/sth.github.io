import React from 'react';

interface SectionProps {
  id: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
  noBorder?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, title, className = '', children, noBorder = false }) => {
  return (
    <section
      id={id}
      className={`py-20 md:py-24 scroll-mt-24 ${!noBorder ? 'border-t border-brand-50' : ''} ${className}`}
    >
      {title && (
        <div className="mb-12 md:mb-16 flex justify-between items-baseline">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[2px] text-brand-400">
            {title}
          </span>
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;