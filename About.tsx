import React from 'react';
import Section from './Section';
import { SKILLS } from '../constants';

const About: React.FC = () => {
  return (
    <Section id="about">
      {/* About Me */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
        {/* Left Column: Title & Photo */}
        <div className="md:col-span-1 flex flex-col gap-6">
            <div className="text-lg font-bold text-gray-900">About Me</div>
            {/* Portrait Photo - Vertical Rectangle */}
            <div className="w-full max-w-[160px] md:max-w-[200px] aspect-[3/4] bg-gray-100 overflow-hidden shadow-sm border border-gray-100 self-start">
                <img 
                    src="https://i.imgur.com/KVTPFXU.jpeg" 
                    alt="Maggie Shao" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
            </div>
        </div>

        {/* Right Column: Text */}
        <div className="md:col-span-2 space-y-6 text-base md:text-lg text-gray-800 leading-relaxed font-sans">
          <p className="font-bold text-xl">
            Hi! This is Maggie!
          </p>
          <p>
            Thanks to the magic of the internet, we meet here.
          </p>
          <p>
            I’m a Advertising and Public Relations professional based in Hong Kong. My inner drive stems from a pursuit of quantifiable growth and a passion for creativity and content creation. I constantly remind myself to avoid falling into repetitive patterns and becoming confined by a so-called style.
          </p>
          <p>
            Having honed my skills across diverse sectors—traditional media (CCTV), internet tech giants (NetEase), and higher education (HKBU)—I remain enthusiastic about exploring new possibilities.
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="text-lg font-bold text-gray-900 md:col-span-1">Skills</div>
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill) => (
              <span
                key={skill.name}
                className="px-4 py-2 bg-gray-50 rounded text-sm text-gray-700 border border-gray-100"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;