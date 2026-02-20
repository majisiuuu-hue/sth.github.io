import React, { useState, useEffect, useMemo } from 'react';
import Section from './Section';
import { PROJECTS } from '../constants';
import { Project } from '../types';

interface ProjectsProps {
    onNavigate: (type: string, value: string, title: string) => void;
    activeCategory?: string;
}

interface TocItem {
  label: string;
  filterType?: string;
  value?: string;
  isHeader?: boolean;
  indent?: boolean;
  targetSheetIndex?: number;
}

interface TocSection {
  id: string;
  category: string;
  targetSheetIndex: number; 
  items: TocItem[];
}

// Helper to filter projects
const getProjects = (type: string, value?: string, category?: string) => {
    if (!value && !category) return [];
    return PROJECTS.filter((p: any) => {
        if (value) return p[type] === value;
        if (category) return p.workType === category;
        return false;
    });
};

const DESIGN_DESCRIPTIONS: Record<string, string> = {
    'Poster': 'Combining visual impact with clear messaging to capture attention.',
    'Leaflet': 'Organizing detailed information into compact, readable layouts.',
    'Booklet': 'Editorial design that guides readers through a narrative flow.',
    'Board': 'Large-scale graphics for exhibitions and environmental displays.',
    'Souvenir': 'Creative merchandise design that creates lasting brand connections.',
};

interface ContentPageProps {
    title: string;
    sectionNumber?: string;
    pageNumber: string;
    projects: Project[];
    onProjectClick: (p: Project) => void;
    onCategoryClick?: (category: string) => void;
    variant?: 'grid' | 'list' | 'minimal' | 'featured' | 'video' | 'video-list' | 'design-grouped' | 'design-spread-1' | 'design-spread-2' | 'pr-grouped' | 'photography-spread-1' | 'photography-spread-2';
    customCategories?: string[]; // For design grouped manual control
}

const ContentPage = ({ 
    title, 
    sectionNumber, 
    pageNumber,
    projects, 
    onProjectClick, 
    onCategoryClick,
    variant = 'grid',
    customCategories
}: ContentPageProps) => {

    const renderContent = () => {
        if (projects.length === 0 && variant !== 'minimal') {
            return (
                <div className="h-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest font-light">
                    Wait for content...
                </div>
            );
        }

        switch (variant) {
            case 'design-spread-1':
            case 'design-spread-2':
            case 'design-grouped':
                // Default categories if none provided
                const cats = customCategories || ['Poster', 'Leaflet', 'Booklet', 'Board', 'Souvenir'];
                return (
                    <div className="flex flex-col gap-6 pb-8">
                        {cats.map((cat) => {
                            const catProjects = projects.filter(p => p.designCategory === cat);
                            // Ensure we don't break if a category has no projects
                            if (catProjects.length === 0) return null;
                            
                            // Special logic for Poster on Page 03 (design-spread-1)
                            const isPage03 = variant === 'design-spread-1';
                            const isPoster = isPage03 && cat === 'Poster';
                            
                            // Limit Poster to 1 item on Page 03
                            const displayProjects = isPoster ? catProjects.slice(0, 1) : catProjects;

                            // Special horizontal layout for Souvenir on Page 04
                            if (cat === 'Souvenir') {
                                // Exclude File Folder (id: 112) for this summary view as requested
                                const souvenirDisplayProjects = displayProjects.filter(p => p.id !== 112);

                                return (
                                    <div key={cat} className="flex flex-col gap-3 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                        {/* Header */}
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                            <h3 className="text-[10px] font-black uppercase tracking-[2px]">{cat}</h3>
                                            <div className="h-px bg-gray-100 flex-1"></div>
                                        </div>
                                        
                                        {/* Horizontal Grid for Souvenir Items */}
                                        <div className="grid grid-cols-3 gap-3">
                                            {souvenirDisplayProjects.map(p => (
                                                <div 
                                                    key={p.id} 
                                                    className="group cursor-pointer flex flex-col gap-2" 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (onCategoryClick) {
                                                            onCategoryClick(cat);
                                                        } else {
                                                            onProjectClick(p);
                                                        }
                                                    }}
                                                >
                                                    <div className="aspect-[4/3] bg-gray-50 overflow-hidden relative shadow-sm border border-gray-100">
                                                        <img 
                                                            src={p.imageUrl} 
                                                            alt={p.imageAlt} 
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    </div>
                                                    <h4 className="text-[8px] font-bold uppercase leading-tight text-center text-gray-800">
                                                        {p.title.replace('Department ', '')}
                                                    </h4>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Explore More Button for Souvenir - Aligned Left (Under Tote Bag) */}
                                        <div className="mt-4 mb-2 flex justify-start">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (onCategoryClick) onCategoryClick(cat);
                                                }}
                                                className="px-5 py-2 bg-black text-white text-[8px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm"
                                            >
                                                Explore More
                                            </button>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div key={cat} className="flex flex-col gap-3 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                    {/* Header */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                        <h3 className="text-[10px] font-black uppercase tracking-[2px]">{cat}</h3>
                                        <div className="h-px bg-gray-100 flex-1"></div>
                                    </div>
                                    
                                    {/* Horizontal Layout Block */}
                                    <div className="flex gap-4 items-stretch">
                                        {/* Left: Image (Smaller, defined width) */}
                                        <div className="w-[35%] flex-shrink-0">
                                            {displayProjects.map(p => (
                                                <div 
                                                    key={p.id} 
                                                    className="group cursor-pointer relative" 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // For all items in these design spreads, navigate to category page
                                                        // This covers Poster, Leaflet, Booklet, Board, Souvenir
                                                        if (onCategoryClick) {
                                                            onCategoryClick(cat);
                                                        } else {
                                                            onProjectClick(p);
                                                        }
                                                    }}
                                                >
                                                    {/* Page 03 uses taller rectangles (aspect-[2/3]) */}
                                                    <div className={`${isPage03 ? 'aspect-[2/3]' : 'aspect-[3/4]'} bg-gray-50 overflow-hidden relative shadow-sm border border-gray-100`}>
                                                        <img 
                                                            src={p.imageUrl} 
                                                            alt={p.imageAlt} 
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Right: Content & Action */}
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="flex flex-col gap-2">
                                                {/* Title */}
                                                <h4 
                                                    className="text-[11px] font-bold uppercase leading-tight text-gray-900 cursor-pointer hover:text-gray-600 transition-colors"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (onCategoryClick) {
                                                            onCategoryClick(cat);
                                                        } else {
                                                            onProjectClick(displayProjects[0]);
                                                        }
                                                    }}
                                                >
                                                    {isPoster ? 'Event Poster' : displayProjects[0].title}
                                                </h4>
                                                
                                                {/* Description */}
                                                <p className="text-[9px] text-gray-500 leading-relaxed font-serif italic">
                                                    {DESIGN_DESCRIPTIONS[cat] || 'Selected works in this category.'}
                                                </p>
                                            </div>

                                            {/* Button (Aligned Right or Bottom) */}
                                            <div className="mt-4 flex justify-end md:justify-start">
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (onCategoryClick) onCategoryClick(cat);
                                                    }}
                                                    className="px-5 py-2 bg-black text-white text-[8px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm"
                                                >
                                                    Explore More
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );

            case 'pr-grouped':
                const prCategories = ['Event', 'Honour & Award', 'Product'];
                return (
                    <div className="flex flex-col gap-8 pr-2">
                        {prCategories.map((cat) => {
                            const catProjects = projects.filter(p => p.prCategory === cat);
                            if (catProjects.length === 0) return null;

                            return (
                                <div key={cat} className="flex flex-col gap-3">
                                    {/* Header */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                        <h3 className="text-[10px] font-black uppercase tracking-[2px]">{cat}</h3>
                                        <div className="h-px bg-gray-100 flex-1"></div>
                                    </div>
                                    
                                    {/* List */}
                                    <div className="flex flex-col gap-3">
                                        {catProjects.map(p => (
                                            <div key={p.id} className="group cursor-pointer flex gap-3 items-center hover:bg-gray-50 p-2 -mx-2 rounded-sm transition-colors" onClick={() => onProjectClick(p)}>
                                                {/* Changed from w-12 h-12 to w-24 h-16 for horizontal rectangle */}
                                                <div className="w-24 h-16 bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-100 shadow-sm">
                                                    <img src={p.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={p.imageAlt} />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-[10px] font-bold uppercase group-hover:text-black text-gray-800 transition-colors leading-tight">{p.title}</h3>
                                                    <p className="text-[8px] text-gray-400 mt-0.5 uppercase tracking-wide">{p.category}</p>
                                                </div>
                                                <div className="text-gray-300 group-hover:text-black transition-colors text-xs">→</div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Explore More Button for Event, Honour & Award, and Product */}
                                    <div className="mt-4 flex justify-start">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (onCategoryClick) onCategoryClick(cat);
                                            }}
                                            className="px-5 py-2 bg-black text-white text-[8px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm"
                                        >
                                            Explore More
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );

            case 'list': // Default simple list
                return (
                    <div className="flex flex-col gap-4">
                        {projects.map(p => (
                            <div key={p.id} className="group cursor-pointer border-b border-gray-100 pb-3" onClick={() => onProjectClick(p)}>
                                <div className="flex gap-3 items-start">
                                    <div className="w-10 h-10 bg-gray-100 flex-shrink-0 overflow-hidden rounded-sm">
                                        <img src={p.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[10px] font-bold uppercase group-hover:text-gray-600 transition-colors leading-tight">{p.title}</h3>
                                        <p className="text-[8px] text-gray-400 mt-1 uppercase tracking-wide">{p.category}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'minimal': // Good for Copywriting, or Filler
                return (
                    <div className="flex flex-col gap-6 py-4 justify-center h-full text-center">
                        {projects.length > 0 ? (
                            projects.map((p, idx) => (
                                <div key={p.id} className="group cursor-pointer text-center" onClick={() => onProjectClick(p)}>
                                    <h3 className="text-base md:text-lg font-serif italic group-hover:text-gray-500 transition-colors mb-2">
                                        "{p.title}"
                                    </h3>
                                    <div className="w-4 h-[1px] bg-black mx-auto mb-2 opacity-20"></div>
                                    <p className="text-[8px] uppercase tracking-[2px] text-gray-400">{p.category}</p>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <span className="text-3xl text-gray-200">✨</span>
                                <p className="text-xs text-gray-400 mt-4 uppercase tracking-[4px]">Visual & Motion</p>
                            </div>
                        )}
                    </div>
                );
            case 'featured': // Good for Advertising (Summary View)
                 // Only show Doggles (ID 6)
                 const featuredProject = projects.find(p => p.id === 6) || projects[0];

                 return (
                    <div className="flex flex-col h-full justify-center">
                        {featuredProject && (
                            <div className="flex flex-col gap-4">
                                <div className={`group cursor-pointer`} onClick={() => onProjectClick(featuredProject)}>
                                    <div className="w-full aspect-[16/9] bg-gray-100 mb-2 overflow-hidden relative shadow-sm">
                                        <img src={featuredProject.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                    </div>
                                    <div className="flex justify-between items-baseline px-1">
                                        <h3 className="text-[10px] font-black uppercase tracking-tight">{featuredProject.title}</h3>
                                        <span className="text-[8px] text-gray-400">{featuredProject.category}</span>
                                    </div>
                                </div>
                                
                                {/* Explore More Button - Navigates to Advertising Page */}
                                <div className="flex justify-end mt-4">
                                     <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Ensure this triggers navigation to the main Advertising category page
                                            if (onCategoryClick) onCategoryClick('Advertising');
                                        }}
                                        className="px-5 py-2 bg-black text-white text-[8px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm"
                                    >
                                        Explore More
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 'photography-spread-1': // Page 09 (Left)
                const photosPage1 = projects; // Expecting first 2 photos
                return (
                    <div className="h-full flex flex-col justify-center">
                        <div className="flex gap-4 h-[75%] items-end">
                            {/* Photo 1: Tall Vertical */}
                            {photosPage1[0] && (
                                <div 
                                    className="w-[55%] h-full bg-gray-100 overflow-hidden cursor-pointer group relative shadow-sm"
                                    onClick={() => onProjectClick(photosPage1[0])}
                                >
                                    <img src={photosPage1[0].imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
                                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-[9px] font-bold text-white uppercase tracking-widest drop-shadow-md">{photosPage1[0].title}</span>
                                    </div>
                                </div>
                            )}
                            
                            {/* Photo 2: Shorter Vertical, offset to bottom */}
                            {photosPage1[1] && (
                                <div 
                                    className="w-[45%] h-[80%] bg-gray-100 overflow-hidden cursor-pointer group relative shadow-sm"
                                    onClick={() => onProjectClick(photosPage1[1])}
                                >
                                    <img src={photosPage1[1].imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
                                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-[9px] font-bold text-white uppercase tracking-widest drop-shadow-md">{photosPage1[1].title}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'photography-spread-2': // Page 10 (Right)
                 const photosPage2 = projects; // Expecting next 3 photos
                 return (
                    <div className="h-full flex flex-col pb-4">
                        <div className="flex-1 flex flex-col gap-3">
                             {/* Top Row: 2 Photos */}
                             <div className="h-[45%] flex gap-3">
                                {photosPage2[0] && (
                                    <div className="flex-1 bg-gray-100 overflow-hidden cursor-pointer group relative shadow-sm" onClick={() => onProjectClick(photosPage2[0])}>
                                        <img src={photosPage2[0].imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
                                    </div>
                                )}
                                {photosPage2[1] && (
                                    <div className="flex-1 bg-gray-100 overflow-hidden cursor-pointer group relative shadow-sm" onClick={() => onProjectClick(photosPage2[1])}>
                                        <img src={photosPage2[1].imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
                                    </div>
                                )}
                             </div>

                             {/* Bottom Row: 1 Wide Photo */}
                             <div className="flex-1 bg-gray-100 overflow-hidden cursor-pointer group relative shadow-sm" onClick={() => photosPage2[2] && onProjectClick(photosPage2[2])}>
                                {photosPage2[2] && (
                                     <img src={photosPage2[2].imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
                                )}
                             </div>
                        </div>

                        {/* Button */}
                         <div className="mt-6 flex justify-center">
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onCategoryClick) onCategoryClick('Photography');
                                }}
                                className="px-6 py-2 border border-black text-black text-[9px] font-bold uppercase tracking-[3px] hover:bg-black hover:text-white transition-all"
                            >
                                Explore Gallery
                            </button>
                        </div>
                    </div>
                 );

            case 'video-list': // Text Only List for Page 08
                return (
                    /* Added pb-56 to push content upwards towards the center/top */
                    <div className="flex flex-col h-full justify-center px-4 pb-56">
                        <div className="flex flex-col gap-8">
                            {projects.map((p, idx) => (
                                 <div 
                                    key={p.id} 
                                    className="group cursor-pointer flex flex-col gap-2"
                                    onClick={() => onProjectClick(p)}
                                 >
                                    <div className="flex justify-between items-baseline border-b border-gray-100 pb-2 group-hover:border-black transition-colors duration-500">
                                        <h3 className="text-lg md:text-xl font-serif italic text-gray-900 group-hover:text-black transition-colors">
                                            {p.title}
                                        </h3>
                                        <span className="text-[10px] font-bold text-gray-300 group-hover:text-black transition-colors">0{idx + 1}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[8px] uppercase tracking-widest text-gray-400 group-hover:text-gray-600">Video Production</span>
                                        <span className="text-[8px] uppercase tracking-widest text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">Watch Now →</span>
                                    </div>
                                 </div>
                            ))}
                        </div>
                    </div>
                );
            case 'video': // Default thumbnail view (fallback)
                return (
                    <div className="flex flex-col gap-8">
                        {projects.map(p => (
                            <div key={p.id} className="group cursor-pointer" onClick={() => onProjectClick(p)}>
                                <div className='aspect-video bg-black relative overflow-hidden mb-3 shadow-md'>
                                    <img 
                                        src={p.imageUrl} 
                                        className='w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500' 
                                        alt={p.imageAlt} 
                                    />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-[9px] font-bold uppercase tracking-wide mb-1">{p.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'grid': 
            default:
                return (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                        {projects.map(p => (
                            <div key={p.id} className="group cursor-pointer" onClick={() => onProjectClick(p)}>
                                <div className="aspect-[3/4] bg-gray-100 mb-2 overflow-hidden relative shadow-sm">
                                    <img 
                                        src={p.imageUrl} 
                                        alt={p.imageAlt} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-[9px] font-bold uppercase leading-tight group-hover:text-gray-600 transition-colors">
                                    {p.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                );
        }
    };

    return (
        <div className="h-full flex flex-col p-8 md:p-10 bg-white relative overflow-hidden">
            {/* Section Watermark */}
            {sectionNumber && (
                <div className="absolute -right-4 -top-6 text-[120px] font-black text-gray-50 opacity-60 select-none leading-none z-0 pointer-events-none font-serif">
                    {sectionNumber}
                </div>
            )}

            <div className="relative z-10 border-b-2 border-black mb-4 pb-2 flex justify-between items-end shrink-0">
                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-black">{title}</h2>
            </div>
            
            <div 
                className="relative z-10 flex-1 overflow-y-auto pr-1 scrollbar-thin"
                onClick={(e) => e.stopPropagation()}
            >
                {renderContent()}
            </div>
            
            {/* Footer with Page Number */}
            <div className="relative z-10 mt-auto pt-3 flex justify-between items-center border-t border-gray-100 shrink-0">
                <span className="text-[8px] text-gray-400 uppercase tracking-[2px]">{title}</span>
                <span className="text-sm font-serif font-bold text-black">{pageNumber}</span>
            </div>
        </div>
    );
};

const Projects: React.FC<ProjectsProps> = ({ onNavigate, activeCategory }) => {
  const [currentSheetIndex, setCurrentSheetIndex] = useState<number>(-1);

  // Updated TOC targets to align with new spreads
  const tocSections: TocSection[] = useMemo(() => [
      {
        id: '01',
        category: 'DESIGN',
        targetSheetIndex: 1, 
        items: [
          { label: 'Poster', filterType: 'designCategory', value: 'Poster' },
          { label: 'Leaflet', filterType: 'designCategory', value: 'Leaflet' },
          { label: 'Booklet', filterType: 'designCategory', value: 'Booklet' },
          { label: 'Board', filterType: 'designCategory', value: 'Board' },
          { label: 'Souvenir', filterType: 'designCategory', value: 'Souvenir' },
        ]
      },
      {
        id: '02',
        category: 'PR WRITING',
        targetSheetIndex: 2,
        items: [
            { label: 'Press Release', isHeader: true }, 
            { label: 'Event', filterType: 'prCategory', value: 'Event', indent: true },
            { label: 'Honour & Award', filterType: 'prCategory', value: 'Honour & Award', indent: true },
            { label: 'Product', filterType: 'prCategory', value: 'Product', indent: true },
        ]
      },
       {
        id: '03',
        category: 'COPYWRITING',
        targetSheetIndex: 2, // Sheet 3 Front is Copywriting, so flip Sheet 2 to see it
        items: [
          { label: 'NIO Summer', filterType: 'copywritingCategory', value: 'NIO Summer' },
          { label: 'SONY Handycam', filterType: 'copywritingCategory', value: 'SONY Handycam' },
        ]
      },
      {
        id: '04',
        category: 'ADVERTISING',
        targetSheetIndex: 3, 
        items: [
             { label: 'Outdoor Advertising', filterType: 'workType', value: 'Advertising' },
        ]
      },
      {
        id: '05',
        category: 'VIDEO',
        // Sheet 3 Back is Advertising (Page 07). Sheet 4 Front is Video (Page 08).
        // To see Sheet 4 Front, we need to be at index 3 (Sheet 3 flipped).
        targetSheetIndex: 3, 
        items: [
          { label: 'We are all Cantonese', filterType: 'videoCategory', value: 'We are all Cantonese' },
          { label: 'NIO ET7', filterType: 'videoCategory', value: 'NIO ET7' },
          { label: 'NIO Summer Recap', filterType: 'videoCategory', value: 'NIO Summer Recap' },
          { label: 'Selected Storyboard', filterType: 'videoCategory', value: 'Selected Storyboard' },
        ]
      },
      {
         id: '06',
         category: 'PHOTOGRAPHY',
         // Sheet 4 Back is Photography 1 (Page 09). Sheet 5 Front is Photography 2 (Page 10).
         // To see Sheet 4 Back, Sheet 4 must be flipped.
         targetSheetIndex: 4, 
         items: [
              { label: 'Street Photography', filterType: 'workType', value: 'Photography' },
         ]
       },
  ], []);

  // Effect to handle deep linking / restoration of state based on activeCategory
  useEffect(() => {
    if (activeCategory) {
        let foundIndex = -1;
        for (const section of tocSections) {
            // Check main category match (case insensitive)
            if (section.category.toUpperCase() === activeCategory.toUpperCase()) {
                foundIndex = section.targetSheetIndex;
                break;
            }
            // Check items
            const foundItem = section.items.find(item => item.value === activeCategory || item.label === activeCategory);
            if (foundItem) {
                 // Use item specific index if available, otherwise use section index
                foundIndex = foundItem.targetSheetIndex !== undefined ? foundItem.targetSheetIndex : section.targetSheetIndex;
                break;
            }
        }
        if (foundIndex !== -1) {
            setCurrentSheetIndex(foundIndex);
        }
    }
  }, [activeCategory, tocSections]);

  const totalSheets = 6;

  const handleTurn = (direction: 'next' | 'prev') => {
      if (direction === 'next' && currentSheetIndex < totalSheets - 1) {
          setCurrentSheetIndex(prev => prev + 1);
      } else if (direction === 'prev' && currentSheetIndex > -1) {
          setCurrentSheetIndex(prev => prev - 1);
      }
  };

  const jumpToSheet = (index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentSheetIndex(index);
  };

  const handleSubItemClick = (e: React.MouseEvent, item: TocItem) => {
      e.stopPropagation();
      if (item.filterType && item.value) {
          onNavigate(item.filterType, item.value, item.label);
      }
  };

  const handleProjectClick = (p: Project) => {
      let type = 'workType';
      let value: string = p.workType;
      let title: string = p.workType;

      if (p.workType === 'Design' && p.designCategory) {
          type = 'designCategory';
          value = p.designCategory;
          title = p.designCategory;
      } else if (p.workType === 'PR Writing' && p.prCategory) {
          type = 'prCategory';
          value = p.prCategory;
          title = p.prCategory;
      } else if (p.workType === 'Copywriting' && p.copywritingCategory) {
           // Navigate to specific copywriting page
           type = 'copywritingCategory';
           value = p.copywritingCategory;
           title = p.title;
      } else if (p.workType === 'Video' && p.videoCategory) {
           type = 'videoCategory'; 
           value = p.videoCategory;
           title = p.title;
      }

      onNavigate(type, value, title);
  };

  const handleCategoryClick = (category: string) => {
      // Check if this category belongs to PR writing
      const isPR = ['Event', 'Honour & Award', 'Product'].includes(category);
      if (category === 'Advertising') {
          onNavigate('workType', 'Advertising', 'Advertising');
      } else if (category === 'Photography') {
          onNavigate('workType', 'Photography', 'Photography');
      } else if (isPR) {
          onNavigate('prCategory', category, category);
      } else {
          onNavigate('designCategory', category, category);
      }
  };

  const designProjects = getProjects('workType', 'Design');
  const prProjects = getProjects('workType', 'PR Writing');
  const copyProjects = getProjects('workType', 'Copywriting');
  const adProjects = getProjects('workType', 'Advertising');
  const videoProjects = getProjects('workType', 'Video');
  const photoProjects = getProjects('workType', 'Photography');

  return (
    <Section id="work" noBorder className="min-h-screen md:h-screen flex flex-col items-center justify-start pt-20 md:pt-10 bg-transparent perspective-container">
      
      <style>{`
        .perspective-container {
            perspective: 2500px;
        }
        
        /* Mobile List View - Book Hidden by Default */
        .book-container {
            display: none; 
        }

        /* Tablet & Desktop View - Book Visible & Scaled */
        @media (min-width: 768px) {
            .book-container {
                display: block;
                position: relative;
                
                /* Responsive sizing for Tablet */
                width: 44vw;
                height: 65vh;
                max-width: 500px;
                max-height: 750px;
                min-width: 320px;
                min-height: 500px;

                transition: transform 0.8s ease-in-out;
                transform-style: preserve-3d;
            }
            .book-container.open {
                transform: translateX(50%);
            }
        }

        .sheet {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            /* Tablet/Desktop: Left Origin (Horizontal Flip) */
            transform-origin: left center;
            transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
            transform-style: preserve-3d;
            cursor: pointer;
        }
        
        .sheet.flipped {
            transform: rotateY(-180deg);
        }

        .page {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            background: white;
            overflow: hidden;
            box-shadow: inset 0 0 30px rgba(0,0,0,0.02);
        }
        .page-front {
            z-index: 2;
            background: linear-gradient(to right, #f8f8f8 0%, #ffffff 5%, #ffffff 100%);
        }

        .page-back {
            transform: rotateY(180deg);
            z-index: 1;
            background: linear-gradient(to left, #f8f8f8 0%, #ffffff 5%, #ffffff 100%);
            border-left: 1px solid #eee;
            border-bottom: none;
        }

        .cover-front {
            background-color: #f5f5f5;
            background-image: url('https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1200&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
        }
        .scrollbar-thin::-webkit-scrollbar {
            width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
            background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
            background-color: #ddd;
            border-radius: 20px;
        }
        .toc-section-header {
            display: flex;
            align-items: baseline;
            gap: 12px;
            padding: 8px 0 4px 0;
            border-bottom: 1px solid #f0f0f0;
            margin-bottom: 4px;
            cursor: pointer;
            transition: opacity 0.2s;
        }
        .toc-section-header:hover {
            opacity: 0.7;
        }
        .toc-num {
            font-size: 0.9rem;
            font-weight: 900;
            color: #000;
        }
        .toc-title {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #000;
        }
        .toc-list-item {
            font-size: 0.65rem;
            color: #666;
            padding: 2px 0 2px 0;
            cursor: pointer;
            transition: all 0.2s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        @media (min-width: 768px) {
            .toc-list-item { font-size: 0.7rem; }
        }
        .toc-list-item:hover {
            color: #000;
            padding-left: 4px;
            font-weight: 600;
        }
        .toc-list-item.indent {
            padding-left: 12px;
            color: #888;
        }
        .toc-list-item.header {
            font-weight: 700;
            color: #444;
            margin-top: 4px;
            cursor: default;
        }
      `}</style>
      
      {/* --- MOBILE VIEW: SIMPLE DIRECTORY LIST --- */}
      <div className="md:hidden w-full max-w-md mx-auto flex flex-col gap-6 px-2">
         <h2 className="text-3xl font-black text-center mb-8 tracking-tighter">PORTFOLIO</h2>
         {tocSections.map((section) => (
            <div key={section.id} className="flex flex-col gap-3 pb-6 border-b border-gray-100 last:border-0">
                <div className="flex items-baseline justify-between cursor-pointer" onClick={() => jumpToSheet(section.targetSheetIndex, { stopPropagation: () => {} } as React.MouseEvent)}>
                   <span className="text-xl font-bold uppercase text-gray-900">{section.category}</span>
                   <span className="text-xs font-bold text-gray-300">0{section.id}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {section.items.map((item, i) => (
                        !item.isHeader && (
                            <button
                                key={i}
                                onClick={(e) => handleSubItemClick(e, item)}
                                className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-gray-100"
                            >
                                {item.label}
                            </button>
                        )
                    ))}
                </div>
            </div>
         ))}
      </div>

      {/* --- TABLET / DESKTOP VIEW: FLIPBOOK --- */}
      <div className={`hidden md:block mb-4 text-center transition-opacity duration-500 ${currentSheetIndex > -1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <p className="text-gray-400 text-xs tracking-[4px] uppercase">Click cover to open</p>
      </div>

      <div className={`book-container font-sans ${currentSheetIndex > -1 ? 'open' : ''}`}>
        
        {/* --- SHEET 0: Cover / Intro --- */}
        <div 
            className={`sheet ${currentSheetIndex >= 0 ? 'flipped' : ''}`} 
            style={{ zIndex: currentSheetIndex >= 0 ? 0 : 6 }}
            onClick={() => handleTurn(currentSheetIndex >= 0 ? 'prev' : 'next')}
        >
            {/* Front: COVER */}
            <div className="page page-front cover-front flex flex-col justify-between p-8 md:p-10 relative">
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
                <div className="relative z-10 flex justify-between items-start border-b border-black/20 pb-4">
                    <span className="text-xs tracking-widest text-black">Selected Works</span>
                    <span className="text-xs tracking-widest text-black">2022-2026</span>
                </div>
                <div className="relative z-10 flex flex-col gap-4 my-auto">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-black mix-blend-multiply opacity-90">
                        PORT<br/>FOLIO
                    </h1>
                    <div className="w-16 h-1 bg-black/80"></div>
                </div>
                <div className="relative z-10 flex flex-col gap-1 border-t border-black/20 pt-4">
                    <h2 className="text-xl font-bold tracking-widest uppercase text-black">Maggie Shao</h2>
                </div>
            </div>

            {/* Back: INTRO - PAGE 01 */}
            <div className="page page-back flex flex-col justify-center items-center p-12 text-center bg-white relative">
                <span className="text-xs font-bold tracking-[4px] text-gray-400 mb-8">INTRODUCTION</span>
                <h3 className="text-base md:text-lg font-serif italic text-gray-900 leading-relaxed mb-8 max-w-sm">
                    "Welcome to my portfolio.<br />
                    This collection features my recent works in design, PR writing, copywriting, advertising, videos, and photography, including personal creations and published pieces."
                </h3>
                <div className="w-8 h-px bg-black mb-8"></div>
                <p className="text-xs leading-loose text-gray-500 max-w-xs">
                    Navigate through the index on the next page.
                </p>
                <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                    <span className="text-sm font-serif font-bold text-black">01</span>
                </div>
            </div>
        </div>

        {/* --- SHEET 1: TOC / Design Part 1 --- */}
        <div 
            className={`sheet ${currentSheetIndex >= 1 ? 'flipped' : ''}`} 
            style={{ zIndex: currentSheetIndex >= 1 ? 1 : 5 }}
            onClick={() => handleTurn(currentSheetIndex >= 1 ? 'prev' : 'next')}
        >
            {/* Front: TOC - PAGE 02 */}
            <div className="page page-front p-8 md:p-10 bg-white flex flex-col h-full overflow-hidden relative">
                <span className="text-xs font-black uppercase tracking-[4px] text-gray-300 block text-center mb-6 flex-shrink-0">Index</span>
                
                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
                    {tocSections.map((section) => (
                        <div key={section.id} className="mb-4">
                            <div 
                                className="toc-section-header group" 
                                onClick={(e) => jumpToSheet(section.targetSheetIndex, e)}
                            >
                                <span className="toc-num">{section.id}</span>
                                <h3 className="toc-title group-hover:underline underline-offset-4">{section.category}</h3>
                            </div>
                            <div className="flex flex-col gap-1 pl-6 border-l border-gray-100 ml-2">
                                {section.items.map((item, i) => (
                                    <div 
                                        key={i} 
                                        className={`toc-list-item ${item.indent ? 'indent' : ''} ${item.isHeader ? 'header' : ''}`}
                                        onClick={(e) => !item.isHeader && handleSubItemClick(e, item)}
                                    >
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
                     <span className="text-[8px] text-gray-400 uppercase tracking-widest">Table of Contents</span>
                     <span className="text-sm font-serif font-bold text-black">02</span>
                </div>
            </div>

            {/* Back: DESIGN PART 1 - PAGE 03 - SECTION 01 */}
            <div className="page page-back">
                <ContentPage 
                    title="Design"
                    sectionNumber="01"
                    pageNumber="03"
                    projects={designProjects} 
                    onProjectClick={handleProjectClick}
                    onCategoryClick={handleCategoryClick}
                    variant="design-spread-1"
                    customCategories={['Poster', 'Leaflet']} // Left page categories
                />
            </div>
        </div>

        {/* --- SHEET 2: Design Part 2 / PR --- */}
        <div 
            className={`sheet ${currentSheetIndex >= 2 ? 'flipped' : ''}`} 
            style={{ zIndex: currentSheetIndex >= 2 ? 2 : 4 }}
            onClick={() => handleTurn(currentSheetIndex >= 2 ? 'prev' : 'next')}
        >
             {/* Front: DESIGN PART 2 - PAGE 04 */}
             <div className="page page-front">
                <ContentPage 
                    title="Design"
                    pageNumber="04"
                    projects={designProjects} 
                    onProjectClick={handleProjectClick}
                    onCategoryClick={handleCategoryClick}
                    variant="design-spread-2"
                    customCategories={['Booklet', 'Board', 'Souvenir']} // Right page categories
                />
            </div>

            {/* Back: PR WRITING - PAGE 05 - SECTION 02 */}
            <div className="page page-back">
                 <ContentPage 
                    title="PR Writing" 
                    sectionNumber="02"
                    pageNumber="05"
                    projects={prProjects} 
                    onProjectClick={handleProjectClick}
                    onCategoryClick={handleCategoryClick}
                    variant="pr-grouped"
                />
            </div>
        </div>

        {/* --- SHEET 3: Copy / Ad --- */}
        <div 
            className={`sheet ${currentSheetIndex >= 3 ? 'flipped' : ''}`} 
            style={{ zIndex: currentSheetIndex >= 3 ? 3 : 3 }}
            onClick={() => handleTurn(currentSheetIndex >= 3 ? 'prev' : 'next')}
        >
            {/* Front: COPYWRITING - PAGE 06 - SECTION 03 */}
            <div className="page page-front">
                <ContentPage 
                    title="Copywriting" 
                    sectionNumber="03"
                    pageNumber="06"
                    projects={copyProjects} 
                    onProjectClick={handleProjectClick}
                    variant="minimal"
                />
            </div>

            {/* Back: ADVERTISING - PAGE 07 - SECTION 04 */}
            <div className="page page-back">
                <ContentPage 
                    title="Advertising" 
                    sectionNumber="04"
                    pageNumber="07"
                    projects={adProjects} 
                    onProjectClick={handleProjectClick}
                    onCategoryClick={handleCategoryClick} // Passed down for button
                    variant="featured"
                />
            </div>
        </div>

        {/* --- SHEET 4: Video List / Photography Part 1 --- */}
        <div 
            className={`sheet ${currentSheetIndex >= 4 ? 'flipped' : ''}`} 
            style={{ zIndex: currentSheetIndex >= 4 ? 4 : 2 }}
            onClick={() => handleTurn(currentSheetIndex >= 4 ? 'prev' : 'next')}
        >
            {/* Front: VIDEO LIST - PAGE 08 - SECTION 05 */}
            <div className="page page-front">
                <ContentPage 
                    title="Video" 
                    sectionNumber="05"
                    pageNumber="08"
                    projects={videoProjects} 
                    onProjectClick={handleProjectClick}
                    variant="video-list"
                />
            </div>

             {/* Back: PHOTOGRAPHY PART 1 - PAGE 09 */}
             <div className="page page-back">
                <ContentPage 
                    title="Photography" 
                    pageNumber="09"
                    projects={photoProjects.slice(0, 2)} 
                    onProjectClick={handleProjectClick}
                    variant="photography-spread-1"
                />
            </div>
        </div>

         {/* --- SHEET 5: Photography Part 2 / End --- */}
         <div 
            className={`sheet ${currentSheetIndex >= 5 ? 'flipped' : ''}`} 
            style={{ zIndex: currentSheetIndex >= 5 ? 5 : 1 }}
            onClick={() => handleTurn(currentSheetIndex >= 5 ? 'prev' : 'next')}
        >
            {/* Front: PHOTOGRAPHY PART 2 - PAGE 10 - SECTION 06 */}
            <div className="page page-front">
                <ContentPage 
                    title="Photography" 
                    sectionNumber="06"
                    pageNumber="10"
                    projects={photoProjects.slice(2, 5)}
                    onProjectClick={handleProjectClick}
                    onCategoryClick={handleCategoryClick}
                    variant="photography-spread-2"
                />
            </div>

            {/* Back: BACK COVER - PAGE 11 */}
            <div className="page page-back flex items-center justify-center bg-[#111] text-white relative">
                <div className="text-center p-10">
                    <h2 className="text-2xl font-light mb-6">The End</h2>
                    <p className="text-sm text-gray-400 mb-10">Thank you for viewing.</p>
                    <button 
                        onClick={(e) => { e.stopPropagation(); setCurrentSheetIndex(-1); }}
                        className="px-6 py-3 border border-white/30 hover:bg-white hover:text-black transition-colors text-xs uppercase tracking-widest"
                    >
                        Close Book
                    </button>
                </div>
                 <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                    <span className="text-sm font-serif font-bold text-gray-500">11</span>
                </div>
            </div>
        </div>

      </div>

      {/* Navigation Controls (Tablet/Desktop) */}
      <div className="hidden md:flex mt-8 gap-4 pb-10">
          <button 
            className={`px-4 py-2 bg-gray-100 rounded text-xs uppercase tracking-widest ${currentSheetIndex === -1 ? 'opacity-50' : ''}`}
            onClick={() => handleTurn('prev')}
            disabled={currentSheetIndex === -1}
          >
            Prev Page
          </button>
          <button 
            className={`px-4 py-2 bg-black text-white rounded text-xs uppercase tracking-widest ${currentSheetIndex === totalSheets - 1 ? 'opacity-50' : ''}`}
            onClick={() => handleTurn('next')}
            disabled={currentSheetIndex === totalSheets - 1}
          >
            Next Page
          </button>
      </div>

    </Section>
  );
};

export default Projects;