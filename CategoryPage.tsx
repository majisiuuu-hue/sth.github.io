import React, { useEffect, useRef, useState } from 'react';
import Section from './Section';
import { PROJECTS } from '../constants';
import { Project } from '../types';

interface CategoryPageProps {
  filterType: string;
  filterValue: string;
  title: string;
  onBack: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ filterType, filterValue, title, onBack }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = PROJECTS.filter((p: any) => {
    return p[filterType] === filterValue;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        const scrollAmount = window.innerWidth < 768 ? 300 : 600; 
        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
  };

  const scrollICCN = (direction: 'left' | 'right', e: React.MouseEvent) => {
    e.stopPropagation();
    const container = document.getElementById('iccn-slider');
    if (container) {
        const scrollAmount = container.clientWidth;
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
  };

  const isPosterMode = filterValue === 'Poster';
  const isLeafletMode = filterValue === 'Leaflet';
  const isBookletMode = filterValue === 'Booklet';
  const isSouvenirMode = filterValue === 'Souvenir';
  const isEventMode = filterValue === 'Event';
  const isProductMode = filterValue === 'Product';
  const isHonourAwardMode = filterValue === 'Honour & Award';
  const isNioSummerMode = filterValue === 'NIO Summer';
  const isAdvertisingMode = filterValue === 'Advertising';
  const isVideoMode = filterType === 'videoCategory';
  const isPhotographyMode = filterValue === 'Photography' || (filterType === 'workType' && filterValue === 'Photography');

  const NIO_SUMMER_DATA = [
    {
      id: 1,
      image: 'https://i.imgur.com/68pjsJ0.jpeg',
      title: '在山野，窺見夏日蔥鬱',
      text: [
        '蔥鬱山野，是夏日的贈禮。',
        '以漫山綠茵為伴，',
        '悠然步於溪邊，放肆歌唱於山谷。',
        '把盛夏的炙熱浮躁隱於山野，',
        '開啟一場適意暢快的夏季旅行。',
        '一起與蔚來一起旅行!'
      ]
    },
    {
      id: 2,
      image: 'https://i.imgur.com/UEcQeac.jpeg',
      title: '演出終有落幕，夏天永不謝幕',
      text: [
        '在日落之時，',
        '去聆听文字的重量。',
        '它不單單只有欣賞，',
        '它在療癒城市每次太陽落山的晚上，',
        '給我們一個不落幕的夏天。'
      ]
    },
    {
      id: 3,
      image: 'https://i.imgur.com/VG9RKng.jpeg',
      title: '在蔚來，一探未來之美',
      text: [
        '夏天和某些時間節點重合，',
        '比如畢業、比如暑假。',
        '蔚來探索營正式開營，',
        '探秘蔚來世界級工廠，',
        '感受工業設計之美，',
        '激發靈感與思想的火花。'
      ]
    },
    {
      id: 4,
      image: 'https://i.imgur.com/CVk4HYr.jpeg',
      title: '離水更近的地方，好事就會發生',
      text: [
        '穿上背心短褲，',
        '迎著風吹熱浪。',
        '在海與天的呼吸中，',
        '任細小汗珠滲出細膩肌膚，',
        '任水花濺起輕輕拍打腳背，',
        '感受它浸入靈魂的舒暢。'
      ]
    }
  ];

  const EVENT_SLIDER_IMAGES = [
    { id: 1, url: 'https://i.imgur.com/YERk1DX.jpeg', caption: 'Group Photo' },
    { id: 2, url: 'https://i.imgur.com/m2SlHIk.jpeg', caption: '' },
    { id: 3, url: 'https://i.imgur.com/24Tugzq.jpeg', caption: '' },
    { id: 4, url: 'https://i.imgur.com/gq11S5q.jpeg', caption: '' },
  ];

  const EVENT_LINKS = [
    {
      category: "International Conference",
      title: "9th International Conference on Cognitive Neurodynamics (ICCN) on 7-10 Dec, 2024",
      url: "https://physics.hkbu.edu.hk/news/9th-international-conference-on-cognitive-neurodynamics-iccn-on-7-10-dec-2024"
    },
    {
      category: "Workshop",
      title: "One-day Research Postgraduate Workshop 2025 Showcases Young Talent and Academic Exchange",
      url: "https://physics.hkbu.edu.hk/news/one-day-research-postgraduate-workshop-2025-showcases-young-talent-and-academic-exchange"
    },
    {
      category: "Seminar",
      title: "Seminar: Jordan's Solar Surge, Policy Shifts and Technology Innovations",
      url: "https://physics.hkbu.edu.hk/news/seminar-jordan-s-solar-surge-policy-shifts-and-technology-innovations"
    },
    {
      category: "Summer Research Experience Programme",
      title: "Department of Physics Welcomes 11 Outstanding Students to Summer Research Experience Programme 2025",
      url: "https://physics.hkbu.edu.hk/news/department-of-physics-welcomes-11-outstanding-students-to-summer-research-experience-programme-2025"
    },
    {
      category: "Talk",
      title: "Two Physics Members Engage in the talk \"Networked Brain: Complex Systems Approach to Cognition and Mental Health\" Co-organized by the Faculty of Science and Alumni Affairs Office",
      url: "https://physics.hkbu.edu.hk/news/two-physics-members-engage-in-the-talk-networked-brain-complex-systems-approach-to-cognition-and-mental-health-co-organized-by-the-faculty-of-science-and-alumni-affairs-office"
    },
    {
      category: "Visit",
      title: "Inside BYD's Shenzhen Headquarters: Physics Students Explore How China's EV giant is shaping the future of mobility",
      url: "https://physics.hkbu.edu.hk/news/inside-byd-s-shenzhen-headquarters-physics-students-explore-how-china-s-ev-giant-is-shaping-the-future-of-mobility"
    },
    {
      category: "Orientation",
      title: "The Department of Physics concludes Orientation Day for new MSc students in Green Technology (Energy) programme",
      url: "https://physics.hkbu.edu.hk/news/the-department-of-physics-concludes-orientation-day-for-new-msc-students-in-green-technology-energy-programme"
    }
  ];

  const PRODUCT_PRESS_RELEASES = [
    {
      media: "中国日报",
      title: "“子曰”教育大模型最新应用成果亮相世界人工智能大会 有道词典笔X7重磅登场",
      url: "https://tech.chinadaily.com.cn/a/202407/05/WS668791bca3107cd55d26a0a9.html"
    },
    {
      media: "北京日报",
      title: "继全球发音后再度“整活”，网易有道词典联动网易云音乐推出“音乐例句”功能",
      url: "https://finance.sina.com.cn/tjhz/2024-06-20/doc-inazkcpk2211048.shtml"
    }
  ];

  const HONOUR_AWARD_LINKS = [
    {
      category: "Research Achievement",
      title: "Professor Zhu Furong's Research Selected as ESI Global Top 0.1% Hot Paper",
      url: "https://physics.hkbu.edu.hk/news/professor-zhu-furong-s-research-selected-as-esi-global-top-0-1-hot-paper"
    },
    {
      category: "Grant",
      title: "Professor Guancong MA awarded Grant from the National Natural Science Foundation of China (NSFC)",
      url: "https://physics.hkbu.edu.hk/news/professor-guancong-ma-awarded-grant-from-the-national-natural-science-foundation-of-china-nsfc"
    },
    {
      category: "Award",
      title: "Two Faculty Members in Department of Physics Achieved Outstanding Performance Award 2025",
      url: "https://physics.hkbu.edu.hk/news/two-faculty-members-in-department-of-physics-achieved-outstanding-performance-award-2025"
    },
    {
      category: "Publication",
      title: "Professor Shu Kong SO's Team Unveils Strategies for High-Performance Semi-Transparent Solar Cells",
      url: "https://physics.hkbu.edu.hk/news/professor-shu-kong-so-s-team-unveils-strategies-for-high-performance-semi-transparent-solar-cells"
    },
    {
      category: "Student Award",
      title: "GEST Student Awarded 2025 IET PES Outstanding Power and Energy Engineering Graduate Award",
      url: "https://physics.hkbu.edu.hk/news/gest-student-awarded-2025-iet-pes-outstanding-power-and-energy-engineering-graduate-award"
    }
  ];

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handlePrevPage = (e: React.MouseEvent) => {
    // Legacy placeholder, functionality moved to scroll view
    e.stopPropagation();
  };
  const handleNextPage = (e: React.MouseEvent) => {
    // Legacy placeholder
    e.stopPropagation();
  };

  // Helper to render Souvenir Content specifically
  const renderSouvenirContent = () => {
    const toteBag = filteredProjects.find(p => p.id === 105);
    const usb = filteredProjects.find(p => p.id === 110);
    const pen = filteredProjects.find(p => p.id === 111);
    const folder = filteredProjects.find(p => p.id === 112);
    const others = filteredProjects.filter(p => ![105, 110, 111, 112].includes(p.id));

    return (
        <div className="flex flex-col gap-20 pb-20">
            {toteBag && (
                <div className="flex flex-col">
                     <div className="mb-6 border-l-2 border-black pl-4">
                        <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">{toteBag.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                        <div className="relative mb-3 bg-gray-50 shadow-md border border-gray-100 overflow-hidden aspect-[16/9] group">
                             <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-black text-white px-3 py-1 z-10 shadow-sm">Black Version</span>
                             <img src={toteBag.imageUrl} alt="Black Tote" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="relative mb-3 bg-gray-50 shadow-md border border-gray-100 overflow-hidden aspect-[16/9] group">
                             <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-white text-black border border-black px-3 py-1 z-10 shadow-sm">White Version</span>
                             <img src={toteBag.secondImageUrl || toteBag.imageUrl} alt="White Tote" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                    </div>
                </div>
            )}
            {usb && (
                <div className="flex flex-col">
                    <div className="mb-6 border-l-2 border-black pl-4">
                        <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">{usb.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                         <div className="relative mb-3 bg-gray-50 shadow-md border border-gray-100 overflow-hidden aspect-[16/9] group">
                             <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-black/80 text-white px-2 py-1 z-10 backdrop-blur-sm shadow-sm">USB-1</span>
                             <img src={usb.imageUrl} alt="USB 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         </div>
                         <div className="relative mb-3 bg-gray-50 shadow-md border border-gray-100 overflow-hidden aspect-[16/9] group">
                             <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-black/80 text-white px-2 py-1 z-10 backdrop-blur-sm shadow-sm">USB-2</span>
                             <img src={usb.secondImageUrl || usb.imageUrl} alt="USB 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         </div>
                    </div>
                </div>
            )}
            {(pen || folder) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {pen && (
                         <div className="flex flex-col">
                            <div className="mb-6 border-l-2 border-black pl-4">
                                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">{pen.title}</h3>
                            </div>
                            <div className="relative mb-3 bg-gray-50 shadow-md border border-gray-100 overflow-hidden aspect-[16/9] group">
                                <img src={pen.imageUrl} alt={pen.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                         </div>
                    )}
                    {folder && (
                         <div className="flex flex-col">
                            <div className="mb-6 border-l-2 border-black pl-4">
                                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">{folder.title}</h3>
                            </div>
                            <div className="relative mb-3 bg-gray-50 shadow-md border border-gray-100 overflow-hidden aspect-[16/9] group">
                                <img src={folder.imageUrl} alt={folder.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                         </div>
                    )}
                </div>
            )}
             {others.map(p => (
                 <div key={p.id} className="flex flex-col">
                     <div className="mb-6 border-l-2 border-black pl-4">
                        <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">{p.title}</h3>
                    </div>
                    <div className="relative mb-3 bg-gray-50 shadow-md border border-gray-100 overflow-hidden aspect-[16/9] group">
                         <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                 </div>
             ))}
        </div>
    );
  };

  // Helper to render the Booklet as a scrollable spread view
  const renderBookletReader = (project: Project) => {
    if (!project.bookletPages) return null;
    const pages = project.bookletPages;
    const cover = pages[0];
    const spreads = [];
    
    // Group remaining pages into pairs for spreads
    for (let i = 1; i < pages.length; i += 2) {
        spreads.push({
            left: pages[i],
            right: pages[i + 1] || null // Handle odd last page if any
        });
    }

    return (
        <div 
            className="w-full h-full overflow-y-auto bg-[#e8e8e5] animate-fade-in relative scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Sticky Header/Controls */}
            <div className="sticky top-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:p-6 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="flex flex-col">
                     <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">{project.title}</h3>
                     <span className="text-[10px] text-gray-500 uppercase tracking-wider">Booklet Reader</span>
                </div>
                <button 
                    onClick={() => setSelectedProject(null)}
                    className="group flex items-center gap-2 px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-full shadow-lg"
                >
                    <span>Close</span>
                    <span className="text-lg leading-none">&times;</span>
                </button>
            </div>

            {/* Content Container */}
            <div className="max-w-6xl mx-auto p-4 md:p-12 flex flex-col items-center gap-8 md:gap-12 pb-24">
                
                {/* 1. Cover (Single, Centered, Shadow) */}
                <div className="w-full md:w-[45%] shadow-2xl relative group">
                    <img 
                        src={cover} 
                        alt="Cover" 
                        className="w-full h-auto block" 
                    />
                    {/* Spine Effect (Left side) */}
                    <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-r from-black/20 to-transparent"></div>
                </div>

                {/* 2. Spreads */}
                {spreads.map((spread, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row w-full shadow-2xl bg-white">
                        {/* Left Page */}
                        <div className="w-full md:w-1/2 relative">
                            <img src={spread.left} alt={`Page ${idx * 2 + 1}`} className="w-full h-auto block" />
                            {/* Inner Shadow Gradient for Spine (Right side of left page) */}
                            <div className="absolute top-0 bottom-0 right-0 w-[4%] bg-gradient-to-l from-black/10 to-transparent pointer-events-none mix-blend-multiply"></div>
                        </div>

                        {/* Right Page */}
                        {spread.right ? (
                            <div className="w-full md:w-1/2 relative">
                                <img src={spread.right} alt={`Page ${idx * 2 + 2}`} className="w-full h-auto block" />
                                {/* Inner Shadow Gradient for Spine (Left side of right page) */}
                                <div className="absolute top-0 bottom-0 left-0 w-[4%] bg-gradient-to-r from-black/10 to-transparent pointer-events-none mix-blend-multiply"></div>
                            </div>
                        ) : (
                            // Empty Right Page (if needed for balance on last page)
                            <div className="w-full md:w-1/2 bg-white hidden md:block"></div>
                        )}
                    </div>
                ))}

                <div className="text-gray-400 text-xs uppercase tracking-widest pt-10">End of Document</div>
            </div>
        </div>
    );
  };

  return (
    <div className="pt-24 min-h-screen animate-fade-in relative">
      <Section id="category-detail" className="min-h-[60vh]">
        <div className="mb-8">
           <button 
             onClick={onBack} 
             className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors mb-6 uppercase tracking-widest"
           >
             <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portfolio
           </button>
           <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">{title}</h2>
           <div className="h-1 w-20 bg-gray-900"></div>
        </div>

        {isPosterMode ? (
            <div className="relative group/carousel">
                <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 pointer-events-none px-4">
                     <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-black pointer-events-auto hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100">←</button>
                     <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-black pointer-events-auto hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100">→</button>
                </div>
                <div ref={scrollContainerRef} className="flex overflow-x-auto snap-x snap-mandatory pb-12 gap-6 md:gap-12 scrollbar-hide items-center" style={{ scrollBehavior: 'smooth' }}>
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="snap-center flex-shrink-0 w-[85vw] md:w-[45vh] lg:w-[400px] flex flex-col group cursor-pointer" onClick={() => handleOpenProject(project)}>
                            <div className="w-full aspect-[2/3] md:aspect-[3/4] bg-gray-50 shadow-sm border border-gray-100 overflow-hidden relative mb-6">
                                <img src={project.imageUrl} alt={project.imageAlt} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 text-white text-xs uppercase tracking-widest bg-black/50 px-3 py-1 rounded backdrop-blur-sm transition-opacity">View Full</span>
                                </div>
                            </div>
                            <div className="text-center md:text-left transition-opacity duration-300">
                                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2">{project.title}</h3>
                                <div className="h-px w-10 bg-gray-200 mx-auto md:mx-0 mb-3"></div>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{project.category}</p>
                            </div>
                        </div>
                    ))}
                    <div className="w-4 md:w-20 flex-shrink-0"></div>
                </div>
            </div>
        ) : isLeafletMode ? (
            <div className="flex flex-col gap-20 pb-20">
                {filteredProjects.map((project) => (
                <div key={project.id} className="flex flex-col">
                    <div className="mb-8 border-l-2 border-black pl-4">
                        <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">{project.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">{project.category}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                        <div className="group cursor-pointer" onClick={() => handleOpenProject(project)}>
                            <div className="relative mb-3 bg-gray-50 shadow-md border border-gray-100 overflow-hidden">
                                <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-black text-white px-3 py-1 z-10 shadow-sm">Front Side</span>
                                <img src={project.imageUrl} alt={`${project.title} Front`} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"/>
                            </div>
                        </div>
                        <div className="group cursor-pointer" onClick={() => {
                                if (project.fullSecondImageUrl || project.secondImageUrl) {
                                    handleOpenProject({ ...project, imageUrl: project.secondImageUrl || project.imageUrl, fullImageUrl: project.fullSecondImageUrl });
                                }
                            }}>
                            <div className="relative mb-3 bg-gray-50 shadow-md border border-gray-100 overflow-hidden">
                                <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-white text-black border border-black px-3 py-1 z-10 shadow-sm">Back Side</span>
                                {project.secondImageUrl ? (
                                    <img src={project.secondImageUrl} alt={`${project.title} Back`} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"/>
                                ) : (
                                    <div className="w-full aspect-[3/4] flex flex-col gap-2 items-center justify-center text-gray-400 bg-gray-100"><span className="text-2xl">?</span><span className="text-xs uppercase tracking-widest">Back Unavailable</span></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        ) : isBookletMode ? (
             <div className="flex flex-col gap-20 pb-20 w-full">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="flex flex-col w-full">
                         <div className="mb-8 border-l-2 border-black pl-4">
                            <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">{project.title}</h3>
                            {/* <p className="text-gray-500 text-sm mt-1">{project.category}</p> */}
                             {project.description && (
                                <p className="text-gray-600 mt-4 max-w-3xl leading-relaxed">{project.description}</p>
                            )}
                        </div>

                        {/* Booklet Cover Only - Clicking opens the Spread Reader */}
                        <div 
                            className="group cursor-pointer flex flex-col gap-2 max-w-sm"
                            onClick={() => handleOpenProject(project)}
                        >
                            <div className="relative w-full aspect-[3/4] bg-gray-50 shadow-lg border border-gray-100 overflow-hidden">
                                <img 
                                    src={project.imageUrl} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 text-white text-xs uppercase tracking-widest bg-black/50 px-3 py-1 rounded backdrop-blur-sm transition-opacity">Read Booklet</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : isSouvenirMode ? (
            renderSouvenirContent()
        ) : isEventMode ? (
            <div className="flex flex-col gap-10 max-w-5xl w-full">
                {filteredProjects.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 mb-16 border-b border-gray-100 pb-16">
                        {filteredProjects.map(project => {
                             if (project.id === 210) {
                                return (
                                    <div key={project.id} className="group cursor-pointer">
                                        <div className="w-full aspect-[4/3] bg-gray-100 mb-6 overflow-hidden relative group/slider">
                                             <div 
                                                id="iccn-slider"
                                                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full h-full"
                                                style={{ scrollBehavior: 'smooth' }}
                                             >
                                                {EVENT_SLIDER_IMAGES.map((img, idx) => (
                                                    <img 
                                                        key={idx} 
                                                        src={img.url} 
                                                        alt={img.caption}
                                                        className="w-full h-full object-cover flex-shrink-0 snap-center" 
                                                        onClick={() => handleOpenProject(project)}
                                                    />
                                                ))}
                                             </div>

                                             <div className="absolute inset-0 pointer-events-none flex justify-between items-center px-4 opacity-0 group-hover/slider:opacity-100 transition-opacity">
                                                 <button 
                                                    onClick={(e) => scrollICCN('left', e)} 
                                                    className="w-8 h-8 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center text-black pointer-events-auto hover:bg-white transition-colors"
                                                 >
                                                    ←
                                                 </button>
                                                 <button 
                                                    onClick={(e) => scrollICCN('right', e)} 
                                                    className="w-8 h-8 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center text-black pointer-events-auto hover:bg-white transition-colors"
                                                 >
                                                    →
                                                 </button>
                                             </div>
                                             
                                             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
                                                 {EVENT_SLIDER_IMAGES.map((_, i) => (
                                                     <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/50 backdrop-blur shadow-sm"></div>
                                                 ))}
                                             </div>
                                        </div>
                                        <h3 className="text-2xl font-light text-gray-900 mb-2">{project.title}</h3>
                                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-3">{project.category}</p>
                                    </div>
                                );
                             }

                            return (
                                <div key={project.id} className="group cursor-pointer" onClick={() => handleOpenProject(project)}>
                                    <div className="w-full aspect-[4/3] bg-gray-100 mb-6 overflow-hidden relative">
                                        <img src={project.imageUrl} alt={project.imageAlt} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                                    </div>
                                    <h3 className="text-2xl font-light text-gray-900 mb-2">{project.title}</h3>
                                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-3">{project.category}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
                
                <div className="flex flex-col">
                    <h3 className="text-xs font-bold uppercase tracking-[3px] text-gray-400 mb-8">Selected Press Release</h3>
                    <div className="flex flex-col gap-10">
                        {EVENT_LINKS.map((event, index) => (
                            <div key={index} className="group border-b border-gray-100 pb-10 last:border-0 relative">
                                <div className="flex flex-col md:flex-row gap-4 md:items-baseline">
                                    <span className="w-48 flex-shrink-0 text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">
                                        {event.category}
                                    </span>
                                    <div className="flex-1">
                                        <a 
                                            href={event.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <h4 className="text-base md:text-lg font-bold font-sans text-gray-900 group-hover:text-gray-600 transition-colors leading-relaxed">
                                                {event.title}
                                                <span className="inline-block ml-2 text-xs align-top text-gray-300 group-hover:text-black transition-colors -translate-y-1 group-hover:translate-x-1 duration-300">↗</span>
                                            </h4>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ) : isProductMode ? (
            <div className="flex flex-col gap-16 max-w-5xl w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 border-b border-gray-100 pb-16">
                    {filteredProjects.map(project => (
                        <div 
                            key={project.id} 
                            className={`group ${project.externalUrl ? 'cursor-pointer' : ''}`}
                            onClick={() => {
                                if (project.externalUrl) {
                                    window.open(project.externalUrl, '_blank');
                                }
                            }}
                        >
                            <div className="w-full aspect-[4/3] bg-gray-100 mb-6 overflow-hidden relative">
                                <img src={project.imageUrl} alt={project.imageAlt} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                            </div>
                            <h3 className="text-2xl font-light text-gray-900 mb-2">{project.title}</h3>
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-3">{project.category}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col">
                    <h3 className="text-xs font-bold uppercase tracking-[3px] text-gray-400 mb-8">Selected Press Release</h3>
                    <div className="flex flex-col gap-10">
                        {PRODUCT_PRESS_RELEASES.map((item, index) => (
                             <div key={index} className="group border-b border-gray-100 pb-10 last:border-0 relative">
                                <div className="flex flex-col md:flex-row gap-4 md:items-baseline">
                                    <span className="w-48 flex-shrink-0 text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">
                                        {item.media}
                                    </span>
                                    <div className="flex-1">
                                        <a 
                                            href={item.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <h4 className="text-base md:text-lg font-bold font-sans text-gray-900 group-hover:text-gray-600 transition-colors leading-relaxed">
                                                {item.title}
                                                <span className="inline-block ml-2 text-xs align-top text-gray-300 group-hover:text-black transition-colors -translate-y-1 group-hover:translate-x-1 duration-300">↗</span>
                                            </h4>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ) : isHonourAwardMode ? (
            <div className="flex flex-col gap-16 max-w-5xl w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 border-b border-gray-100 pb-16">
                    {filteredProjects.map(project => (
                        <div 
                            key={project.id} 
                            className={`group ${project.externalUrl ? 'cursor-pointer' : ''}`}
                            onClick={() => {
                                if (project.externalUrl) {
                                    window.open(project.externalUrl, '_blank');
                                }
                            }}
                        >
                            <div className="w-full aspect-[4/3] bg-gray-100 mb-6 overflow-hidden relative">
                                <img src={project.imageUrl} alt={project.imageAlt} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                            </div>
                            <h3 className="text-2xl font-light text-gray-900 mb-2">{project.title}</h3>
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-3">{project.category}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col">
                    <h3 className="text-xs font-bold uppercase tracking-[3px] text-gray-400 mb-8">Selected Press Release</h3>
                    <div className="flex flex-col gap-10">
                        {HONOUR_AWARD_LINKS.map((item, index) => (
                             <div key={index} className="group border-b border-gray-100 pb-10 last:border-0 relative">
                                <div className="flex flex-col md:flex-row gap-4 md:items-baseline">
                                    <span className="w-48 flex-shrink-0 text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">
                                        {item.category}
                                    </span>
                                    <div className="flex-1">
                                        <a 
                                            href={item.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <h4 className="text-base md:text-lg font-bold font-sans text-gray-900 group-hover:text-gray-600 transition-colors leading-relaxed">
                                                {item.title}
                                                <span className="inline-block ml-2 text-xs align-top text-gray-300 group-hover:text-black transition-colors -translate-y-1 group-hover:translate-x-1 duration-300">↗</span>
                                            </h4>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ) : isNioSummerMode ? (
            <div className="flex flex-col gap-24 py-10 w-full max-w-5xl">
                {NIO_SUMMER_DATA.map((item, index) => (
                  <div key={item.id} className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                     <div className="w-full md:w-1/2">
                        <div className="w-full bg-gray-100 overflow-hidden shadow-sm relative group">
                            <img src={item.image} alt={item.title} className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105" />
                        </div>
                     </div>
                     <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <h3 className="text-3xl font-light text-gray-900">{item.title}</h3>
                        <div className="w-12 h-px bg-black opacity-20"></div>
                        <p className="text-gray-600 leading-relaxed text-lg font-serif italic">
                            {item.text.map((line, idx) => (
                                <React.Fragment key={idx}>
                                    {line}
                                    {idx < item.text.length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>
                     </div>
                  </div>
                ))}
            </div>
        ) : isVideoMode ? (
            <div className="flex flex-col gap-24 max-w-5xl w-full pb-20">
                {filteredProjects.map(project => (
                    <div key={project.id} className="flex flex-col gap-8">
                         {project.category && (
                             <div className="border-l-4 border-black pl-6">
                                <h3 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">{project.category}</h3>
                            </div>
                         )}
                         {project.videoCategory === 'We are all Cantonese' && (
                             <div className="border-l-4 border-black pl-6">
                                <h3 className="text-3xl font-bold text-gray-900 tracking-wide">
                                    我哋都係广东靓仔
                                </h3>
                            </div>
                         )}
                         {project.videoCategory === 'NIO ET7' && (
                             <div className="border-l-4 border-black pl-6">
                                <h3 className="text-3xl font-bold text-gray-900 tracking-wide">
                                    NIO ET7 TVC
                                </h3>
                            </div>
                         )}
                         {project.videoCategory === 'NIO ET7' && (
                            <div className="max-w-3xl mt-0 mb-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Creative Point</h4>
                                <p className="text-gray-600 leading-relaxed text-sm text-justify">
                                    By telling the story of “Shadow” (the protagonist) driving an ET7 to pick up a cake and delivering it intact to the campsite for his daughter's birthday celebration, the film demonstrates the ET7's experience of balancing performance and comfort.
                                </p>
                            </div>
                         )}
                         {project.videoCategory === 'NIO Summer Recap' && (
                             <div className="border-l-4 border-black pl-6">
                                <h3 className="text-3xl font-bold text-gray-900 tracking-wide">
                                    NIO Summer Recap
                                </h3>
                            </div>
                         )}
                         {project.videoCategory === 'NIO Summer Recap' && (
                            <div className="max-w-3xl mt-0 mb-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Creative Point</h4>
                                <p className="text-gray-600 leading-relaxed text-sm text-justify">
                                    Through the joyful atmosphere of NIO Summer, this video aims to resonate with users about NIO's sustainable lifestyle philosophy, inviting more people to understand and experience the lifestyle NIO advocates.
                                </p>
                            </div>
                         )}
                        
                        {project.videoCategory === 'Selected Storyboard' ? (
                             <div className="flex flex-col gap-12">
                                <div className="mb-4">
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">Product: Colgate® Optic White® Renewal Whitening Toothpaste</h4>
                                    <a 
                                        href="https://www.colgate.com.hk/products/toothpaste/colgate-optic-white-renewal#accordion-b431609044-item-54d4a6ec79" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-500 hover:text-black underline underline-offset-4 mb-4 block transition-colors"
                                    >
                                        View Product ↗
                                    </a>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        <span className="font-bold text-gray-800">Key Selling Point: </span>
                                        Features Colgate Optic White®'s unique whitening acceleration technology, which deeply removes stains and gently whitens the tooth surface.
                                    </p>
                                </div>
                                {project.storyboardList?.map((item, idx) => (
                                    <div key={idx} className="flex flex-col gap-4">
                                        <h4 className="text-xl font-bold uppercase tracking-widest text-gray-900 border-b border-gray-100 pb-2">{item.title}</h4>
                                        <div 
                                            className="w-full shadow-sm group cursor-pointer relative"
                                            onClick={() => handleOpenProject({
                                                ...project,
                                                imageUrl: item.url, // Override main image with specific storyboard for modal
                                                fullImageUrl: item.url,
                                                title: item.title // Update title for modal context
                                            })}
                                        >
                                            <img src={item.url} alt={item.title} className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center pointer-events-none">
                                                <span className="opacity-0 group-hover:opacity-100 text-white text-xs uppercase tracking-widest bg-black/50 px-3 py-1 rounded backdrop-blur-sm transition-opacity">View Full</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {!project.storyboardList && (
                                     <div className="w-full shadow-sm">
                                        <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-contain" />
                                     </div>
                                )}
                             </div>
                        ) : (
                            <div className="w-full aspect-video bg-black shadow-2xl relative overflow-hidden group">
                                {project.videoCategory === 'We are all Cantonese' && (
                                   <div className="w-full h-full relative group cursor-pointer" onClick={() => project.externalUrl && window.open(project.externalUrl, '_blank')}>
                                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/60 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-6 left-0 right-0 text-center">
                                            <span className="inline-block px-4 py-2 bg-black/60 text-white text-xs uppercase tracking-widest backdrop-blur-sm rounded-sm">
                                                Watch on CCTV ↗
                                            </span>
                                        </div>
                                   </div>
                                )}
                                {project.videoCategory === 'NIO ET7' && (
                                    <video className="w-full h-full object-cover" controls muted playsInline poster={project.imageUrl}>
                                        <source src="https://i.imgur.com/5PgEota.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                                {project.videoCategory === 'NIO Summer Recap' && (
                                    <video className="w-full h-full object-cover" controls muted playsInline poster={project.imageUrl}>
                                        <source src="https://i.imgur.com/gQEqnEZ.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                        )}
                        {project.videoCategory === 'NIO ET7' && project.storyboardImgUrl && (
                             <div className="mt-8">
                                 <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-400">Video Script / Storyboard</h4>
                                 <img src={project.storyboardImgUrl} alt="Storyboard" className="w-full h-auto shadow-sm" />
                             </div>
                        )}
                        {project.videoCategory === 'We are all Cantonese' && (
                            <div className="max-w-3xl mt-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Project Background</h4>
                                <p className="text-gray-600 leading-relaxed text-sm text-justify">
                                    The local news center introduced a National Day special program "Looking at Today's China," a 60-minute feature on Guangdong's historic progress. My work "We Are All Cantonese"(3-minute video) uses a cross-narrative approach to connect the stories of migrant workers from different industries and regions, reflecting Guangdong Province's preferential policies for migrant workers.
                                </p>
                            </div>
                        )}
                        {project.description && (
                            <div className="max-w-3xl">
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {project.description}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        ) : isAdvertisingMode ? (
            <div className="w-full flex flex-col items-center gap-32 pb-20">
                 {(() => {
                    const dogglesProject = filteredProjects.find(p => p.id === 6);
                    if (!dogglesProject) return null;
                    return (
                        <div className="w-full flex flex-col items-center">
                            <div className="text-center mb-10 -mt-4">
                                <span className="block text-sm font-bold uppercase tracking-[3px] text-gray-400 mb-2">Digital Out-of-Home (DOOH)</span>
                                <h3 className="text-2xl md:text-3xl font-serif italic text-gray-900">"Doggles, The Switch For the Eyes."</h3>
                            </div>
                            <div className="relative w-full max-w-4xl mx-auto">
                                <img 
                                    src={dogglesProject.imageUrl} 
                                    alt={dogglesProject.title} 
                                    className="w-full h-auto block"
                                />
                                <div className="absolute top-[36%] left-[11%] w-[13%] h-[18%] group cursor-pointer">
                                    <div className="absolute inset-[-20%] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 pointer-events-none z-20">
                                        <div className="absolute inset-0 bg-yellow-500/40 rounded-full blur-xl mix-blend-screen"></div>
                                        <div className="absolute inset-2 bg-yellow-200/60 rounded-full blur-md shadow-[0_0_30px_10px_rgba(253,224,71,0.6)]"></div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white rounded-full blur-[4px] shadow-[0_0_20px_8px_white]"></div>
                                    </div>
                                    <div className="absolute inset-0 cursor-crosshair z-10 rounded-full" title="Switch on"></div>
                                </div>
                                <div className="absolute top-[36%] left-[43.5%] w-[13%] h-[18%] group cursor-pointer">
                                    <div className="absolute inset-[-20%] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 pointer-events-none z-20">
                                        <div className="absolute inset-0 bg-yellow-500/40 rounded-full blur-xl mix-blend-screen"></div>
                                        <div className="absolute inset-2 bg-yellow-200/60 rounded-full blur-md shadow-[0_0_30px_10px_rgba(253,224,71,0.6)]"></div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white rounded-full blur-[4px] shadow-[0_0_20px_8px_white]"></div>
                                    </div>
                                    <div className="absolute inset-0 cursor-crosshair z-10 rounded-full" title="Switch on"></div>
                                </div>
                                <div className="absolute top-[36%] left-[76%] w-[13%] h-[18%] group cursor-pointer">
                                    <div className="absolute inset-[-20%] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 pointer-events-none z-20">
                                        <div className="absolute inset-0 bg-yellow-500/40 rounded-full blur-xl mix-blend-screen"></div>
                                        <div className="absolute inset-2 bg-yellow-200/60 rounded-full blur-md shadow-[0_0_30px_10px_rgba(253,224,71,0.6)]"></div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white rounded-full blur-[4px] shadow-[0_0_20px_8px_white]"></div>
                                    </div>
                                    <div className="absolute inset-0 cursor-crosshair z-10 rounded-full" title="Switch on"></div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2 animate-pulse mt-8 mb-16">
                                <div className="text-2xl text-gray-300">👆</div>
                                <p className="text-[10px] font-bold uppercase tracking-[3px] text-gray-500">
                                    Tap the dogs' eyes to experience
                                </p>
                            </div>
                        </div>
                    );
                 })()}
                 {(() => {
                    const manholeProject = filteredProjects.find(p => p.category === 'Manhole Cover Advertising' || p.id === 601);
                    if (!manholeProject) return null;
                    return (
                        <div className="w-full max-w-4xl flex flex-col items-center">
                            <div className="text-center mb-10">
                                <span className="block text-sm font-bold uppercase tracking-[3px] text-gray-400 mb-2">Manhole Cover Advertising</span>
                                <h3 className="text-2xl md:text-3xl font-serif italic text-gray-900">{manholeProject.title}</h3>
                            </div>
                            <div className="w-full shadow-lg">
                                <img src={manholeProject.imageUrl} alt={manholeProject.imageAlt} className="w-full h-auto object-cover" />
                            </div>
                        </div>
                    );
                 })()}
                 {(() => {
                    const billboardProject = filteredProjects.find(p => p.category === 'Billboard' || p.id === 602);
                    if (!billboardProject) return null;
                    return (
                        <div className="w-full max-w-4xl flex flex-col items-center">
                            <div className="text-center mb-10">
                                <span className="block text-sm font-bold uppercase tracking-[3px] text-gray-400 mb-2">Billboard</span>
                                <h3 className="text-2xl md:text-3xl font-serif italic text-gray-900">{billboardProject.title}</h3>
                            </div>
                             <div className="w-full shadow-lg">
                                <img src={billboardProject.imageUrl} alt={billboardProject.imageAlt} className="w-full h-auto object-cover" />
                            </div>
                        </div>
                    );
                 })()}
                 <div className="w-full max-w-2xl text-center px-6 py-10 border-t border-gray-100">
                    <h4 className="text-xl font-bold mb-4 text-gray-900 font-sans tracking-wide">About Doggles</h4>
                    <p className="text-gray-600 leading-relaxed mb-8 font-serif">
                        Doggles® are the first protective goggles designed just for dogs. 22 years of experience has made our dog goggles the very best in pet eyewear.
                    </p>
                    <a 
                        href="https://doggles.com/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block border-b border-black pb-1 text-sm font-bold uppercase tracking-widest hover:text-gray-600 hover:border-gray-400 transition-colors"
                    >
                        Visit Doggles.com ↗
                    </a>
                </div>
            </div>
        ) : isPhotographyMode ? (
            <div className="flex flex-col gap-12 pb-20">
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((p) => (
                    <div key={p.id} className="w-full aspect-[3/4] bg-gray-100 overflow-hidden">
                      <img src={p.imageUrl} alt={p.imageAlt} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-center">
                    <p className="text-xs font-bold uppercase tracking-[3px] text-gray-400">
                        More photos coming soon. Stay tuned.
                    </p>
                </div>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="group cursor-pointer" onClick={() => handleOpenProject(project)}>
                        <div className="w-full aspect-[3/4] bg-gray-100 mb-4 overflow-hidden relative">
                             <img src={project.imageUrl} alt={project.imageAlt} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{project.title}</h3>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{project.category}</p>
                    </div>
                ))}
            </div>
        )}
      </Section>
      
      {/* Lightbox/Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-fade-in" onClick={() => setSelectedProject(null)}>
            <button className="absolute top-4 right-4 md:top-8 md:right-8 text-black/50 hover:text-black transition-colors p-2 z-50">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            {/* Conditional Rendering: Vertical Spread Reader or Standard Image */}
            {selectedProject.bookletPages && selectedProject.bookletPages.length > 0 ? (
                // Use new scrollable spread reader
                renderBookletReader(selectedProject)
            ) : (
                // --- STANDARD IMAGE VIEWER ---
                <div className="relative max-w-full max-h-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                    <img 
                        src={selectedProject.fullImageUrl || selectedProject.imageUrl} 
                        alt={selectedProject.title} 
                        className="max-w-full max-h-[80vh] object-contain shadow-2xl" 
                    />
                    <div className="mt-6 text-center max-w-2xl">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProject.title}</h3>
                        {selectedProject.description && <p className="text-gray-600">{selectedProject.description}</p>}
                    </div>
                </div>
            )}
        </div>
      )}

      {/* Global Style for 3D Transforms (Kept for potential future use or cleanup) */}
      <style>{`
        .perspective-[2000px] { perspective: 2000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .origin-top { transform-origin: top; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </div>
  );
};

export default CategoryPage;