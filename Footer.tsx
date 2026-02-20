import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#111] text-white py-10 text-center scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm text-gray-400 mb-4">
          <a href="mailto:maggieonthearth@gmail.com" className="hover:text-white transition-colors">
            Email: maggieonthearth@gmail.com
          </a>
        </div>

        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Maggie Shao. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;