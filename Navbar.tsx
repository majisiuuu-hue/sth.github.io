import React, { useState, useMemo } from 'react';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  onNavigate: (href: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Track mobile sub-menu state
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  // Generate particles - Multi-color palette based on attachment
  const particles = useMemo(() => {
    const count = 15; 
    // Specific colors from the image: Blue, Ochre, Light Blue, Peach, Olive, Red
    const colors = [
        '#2E6FDF', // Strong Blue
        '#D9A536', // Ochre/Gold
        '#60a5fa', // Light Blue
        '#E8A087', // Peach/Pinkish
        '#8EA656', // Olive Green
        '#D94638', // Red/Orange
        '#2E6FDF', // Blue repeated
        '#D9A536', // Ochre repeated
    ];
    
    return Array.from({ length: count }).map((_, i) => {
        const duration = 25;
        const delay = -((i / count) * duration);
        const color = colors[i % colors.length];
        const size = 8 + Math.random() * 6;
        
        return { id: i, size, color, duration, delay };
    });
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
    setIsOpen(false);
  };

  const toggleMobileSubMenu = (name: string) => {
    setExpandedMobileMenu(expandedMobileMenu === name ? null : name);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-24 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      
      {/* Animation Styles */}
      <style>{`
        @keyframes movePath {
            0%   { transform: translate(-5vw, 70px); }
            15%  { transform: translate(15vw, 20px); }
            30%  { transform: translate(30vw, 75px); }
            45%  { transform: translate(45vw, 25px); }
            60%  { transform: translate(60vw, 50px); }
            75%  { transform: translate(75vw, 80px); }
            90%  { transform: translate(90vw, 20px); }
            100% { transform: translate(105vw, 50px); }
        }
        .particle {
            position: absolute;
            left: 0; top: 0;
            border-radius: 50%;
            will-change: transform;
            animation-name: movePath;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            opacity: 0.8;
        }
      `}</style>

      {/* Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
            <div
                key={p.id}
                className="particle"
                style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                    animationDuration: `${p.duration}s`,
                    animationDelay: `${p.delay}s`,
                } as React.CSSProperties}
            />
        ))}
      </div>

      {/* Navbar Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 h-full flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#"
          onClick={(e) => handleLinkClick(e, '#')}
          className="text-lg font-bold uppercase tracking-[2px] text-black hover:text-gray-600 transition-colors"
        >
          TIANHUA SHAO
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 list-none m-0 p-0 items-center">
          {NAV_LINKS.map((link) => (
            <li key={link.name} className="relative group">
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-medium text-sm no-underline transition-colors hover:text-gray-600 text-black py-6"
              >
                {link.name}
              </a>
              
              {/* Desktop Dropdown */}
              {link.dropdown && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="bg-white/95 backdrop-blur-sm shadow-xl border border-gray-100 py-3 min-w-[200px] rounded-lg overflow-hidden">
                    {link.dropdown.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        onClick={(e) => handleLinkClick(e, subItem.href)}
                        className="block px-6 py-3 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 focus:outline-none text-black"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 top-full z-50 h-[calc(100vh-6rem)] overflow-y-auto">
          <ul className="flex flex-col py-6 px-6 gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.name} className="flex flex-col">
                <div className="flex justify-between items-center">
                  <a
                    href={link.href}
                    className="block text-black font-medium text-lg hover:text-gray-600"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                  {/* Dropdown removed for mobile per request */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;