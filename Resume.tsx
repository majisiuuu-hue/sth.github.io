import React from 'react';
import Section from './Section';
import { EXPERIENCE, EDUCATION, HONORS } from '../constants';

const Resume: React.FC = () => {
  return (
    <Section id="resume" title="Professional Experience">
      
      {/* Experience List */}
      <div className="space-y-12">
        {EXPERIENCE.map((job) => (
          <div key={job.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12">
            <div className="text-lg font-bold text-gray-900 md:col-span-1 leading-tight">
              {job.period}
            </div>
            <div className="md:col-span-2">
              <h4 className="text-xl font-medium text-gray-900 mb-1">{job.role}</h4>
              <span className="block text-sm text-gray-500 italic">{job.company}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 md:mt-24 mb-16 flex justify-between items-baseline">
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[2px] text-gray-500">
          Education
        </span>
      </div>

      {/* Education List */}
      <div className="space-y-12">
        {EDUCATION.map((edu) => (
          <div key={edu.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12">
            <div className="text-lg font-bold text-gray-900 md:col-span-1 leading-tight">
              {edu.period}
            </div>
            <div className="md:col-span-2">
              <h4 className="text-xl font-medium text-gray-900 mb-1">{edu.degree}</h4>
              <span className="block text-sm text-gray-500 italic mb-2">{edu.school}</span>
              {edu.details && <p className="text-gray-700 text-sm md:text-base">{edu.details}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Honors Section */}
      <div className="mt-20 md:mt-24 mb-16 flex justify-between items-baseline">
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[2px] text-gray-500">
          Honors & Rewards
        </span>
      </div>

      <div className="space-y-12">
        {HONORS.map((honor) => (
          <div key={honor.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12">
            <div className="text-lg font-bold text-gray-900 md:col-span-1 leading-tight">
              {honor.period}
            </div>
            <div className="md:col-span-2 text-lg text-gray-900 font-medium">
              {honor.title}
            </div>
          </div>
        ))}
      </div>

    </Section>
  );
};

export default Resume;