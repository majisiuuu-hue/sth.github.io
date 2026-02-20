import { Project, ExperienceItem, EducationItem, Skill, HonorItem } from './types';

export const NAV_LINKS = [
  { 
    name: 'Portfolio', 
    href: '#work',
    dropdown: [
      { name: 'Design', href: '#portfolio/Design' },
      { name: 'PR Writing', href: '#portfolio/PR Writing' },
      { name: 'Copywriting', href: '#portfolio/Copywriting' },
      { name: 'Advertising', href: '#portfolio/Advertising' },
      { name: 'Video', href: '#portfolio/Video' },
      { name: 'Photography', href: '#portfolio/Photography' },
    ]
  },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const PROJECTS: Project[] = [
  // --- DESIGN ---
  
  // === [PAGE 03] CONTENTS ===
  
  // Poster
  {
    id: 107,
    title: 'Career Talk 2025',
    category: 'MSc',
    tags: ['Alumni', 'Talk'],
    imageUrl: 'https://i.imgur.com/DMOPGOr.jpeg',
    fullImageUrl: 'https://i.imgur.com/uEVH3Zl.png', 
    imageAlt: 'Career Talk Poster',
    workType: 'Design',
    designCategory: 'Poster'
  },
  {
    id: 102,
    title: 'IET Professional Talk',
    category: 'MSc',
    tags: [' Career', 'Talk'],
    imageUrl: 'https://i.imgur.com/oN13mrE.png',
    fullImageUrl: 'https://i.imgur.com/e53Jkev.png',
    imageAlt: 'IET Professional Talk Poster',
    workType: 'Design',
    designCategory: 'Poster'
  },
  {
    id: 101,
    title: 'Summer Research Program 2025',
    category: 'RPg',
    tags: ['Academic', 'Campaign', 'Recruitment'],
    imageUrl: 'https://i.imgur.com/tNQRK5F.jpeg', 
    fullImageUrl: 'https://i.imgur.com/nJHrOh9.png',
    imageAlt: 'Summer Research Experience Program Poster',
    workType: 'Design',
    designCategory: 'Poster'
  },
  {
    id: 108,
    title: 'Seminar',
    category: 'Dept',
    tags: ['Academic', 'Sharing'],
    imageUrl: 'https://i.imgur.com/ujkHXIH.jpeg',
    fullImageUrl: 'https://i.imgur.com/haGjiQ5.jpeg',
    imageAlt: 'Seminar Poster',
    workType: 'Design',
    designCategory: 'Poster'
  },
  
  // Leaflet
  {
    id: 103,
    title: 'Programme Leaflet',
    category: 'Print Layout',
    tags: ['Information Design', 'Layout'],
    imageUrl: 'https://i.imgur.com/IwJIXma.jpeg',
    fullImageUrl: 'https://i.imgur.com/hYfjwWd.png', 
    secondImageUrl: 'https://i.imgur.com/msolB0o.jpeg', 
    fullSecondImageUrl: 'https://i.imgur.com/7yY0QyB.png',
    imageAlt: 'Course Leaflet',
    workType: 'Design',
    designCategory: 'Leaflet'
  },
  
  // Booklet
  {
    id: 1,
    title: 'Career Prospects Booklet',
    category: 'Department Rebranding',
    tags: ['Brand Identity', 'Editorial'],
    // [!] 列表缩略图：这是在作品集列表页显示的封面小图
    imageUrl: 'https://i.imgur.com/R2Bk4oM.jpeg',
    imageAlt: 'HKBU Physics Brand Book',
    workType: 'Design',
    designCategory: 'Booklet',
    // [BOOKLET 内容]
    // 包含封面和内页
    bookletPages: [
        // [!] 详情页封面 (View Full 模式)：修改下方链接以更换打开后的第一张封面大图
        'https://i.imgur.com/Q61lgUL.jpeg',
        
        // Page 2 (Left Page 1)
        'https://i.imgur.com/7nH0Xr9.jpeg',
        // Page 3 (Right Page 1)
        'https://i.imgur.com/jkh2U7l.jpeg',
        
        // Page 4 (Left Page 2)
        'https://i.imgur.com/AnUcljf.jpeg',
        // Page 5 (Right Page 2)
        'https://i.imgur.com/kZUJ9Nd.jpeg',
        
        // Page 6 ...
        'https://i.imgur.com/qC5YsZv.jpeg',
        // Page 7
        'https://i.imgur.com/A76msue.png',
        // Page 8
        'https://i.imgur.com/T7KQLNi.png',
        // Page 9
        'https://i.imgur.com/MMF6voi.jpeg',
        // Page 10
        'https://i.imgur.com/GpwkYWx.png',
        // Page 11
        'https://i.imgur.com/yFZvTwf.png',
        // Page 12
        'https://i.imgur.com/RT6X3Ia.png',
        // Page 13
        'https://i.imgur.com/n2xv0CR.png',
        // Page 14
        'https://i.imgur.com/4LZL1WJ.png',
        // Page 15
        'https://i.imgur.com/NPBfkO1.jpeg',
        // Page 16
        'https://i.imgur.com/m5ZRlig.png',
        // Page 17
        'https://i.imgur.com/KrFWqoU.png',
        // Page 18
        'https://i.imgur.com/JIHJGH4.png',
        // Page 19
        'https://i.imgur.com/na5y36G.png',
        // Page 20
        'https://i.imgur.com/XVUxhVs.png',
        // Page 21
        'https://i.imgur.com/KokK8Oh.jpeg',
        // Page 22
        'https://i.imgur.com/o1hRVte.png',
        // Page 23
        'https://i.imgur.com/yh9zmCy.png',
        // Page 24
        'https://i.imgur.com/J2ryQlc.png',
        // Page 25
        'https://i.imgur.com/YyPOFwa.png',
        // Page 26
        'https://i.imgur.com/FrgwRUh.png',
        // Page 27 (Last Page)
        'https://i.imgur.com/0KlSBDk.jpeg',
    ]
  },
  
  // Board
  {
    id: 104,
    title: 'Display Board',
    category: 'Large Format Print',
    tags: ['Spatial Design', 'Display'],
    imageUrl: 'https://i.imgur.com/o2YY5pH.jpeg',
    fullImageUrl: 'https://i.imgur.com/I2hYrWI.jpeg',
    imageAlt: 'Exhibition Board',
    workType: 'Design',
    designCategory: 'Board'
  },
  
  // Souvenir 1: Tote Bag
  {
    id: 105,
    title: 'Department Tote Bag',
    category: '', // Removed 'Merchandise Design'
    tags: ['Product Design', 'Graphics'],
    imageUrl: 'https://i.imgur.com/yEgIUO8.jpeg', // Black Version
    // [!] 请在此处替换为白色版 Tote Bag 的图片链接
    secondImageUrl: 'https://i.imgur.com/KUkX2zE.jpeg', // White Version (Placeholder, currently same as black)
    imageAlt: 'Tote Bag Design',
    workType: 'Design',
    designCategory: 'Souvenir'
  },

  // Souvenir 2: USB
  {
    id: 110,
    title: 'USB',
    category: '', // Removed 'Merchandise Design'
    tags: ['Product Design'],
    imageUrl: 'https://i.imgur.com/3MFsVwZ.jpeg', // USB-1 Placeholder
    secondImageUrl: 'https://i.imgur.com/9jcVV5R.jpeg', // USB-2 Placeholder
    imageAlt: 'USB Design',
    workType: 'Design',
    designCategory: 'Souvenir'
  },

  // Souvenir 3: Pen
  {
    id: 111,
    title: 'Pen',
    category: '', // Removed 'Merchandise Design'
    tags: ['Product Design'],
    imageUrl: 'https://i.imgur.com/s8OUim8.jpeg', // Placeholder (16:9)
    imageAlt: 'Pen Design',
    workType: 'Design',
    designCategory: 'Souvenir'
  },

  // Souvenir 4: File Folder
  {
    id: 112,
    title: 'File Folder',
    category: '', // Removed 'Merchandise Design'
    tags: ['Stationery Design'],
    imageUrl: 'https://i.imgur.com/JEHmPMN.jpeg', // Placeholder (16:9)
    imageAlt: 'File Folder Design',
    workType: 'Design',
    designCategory: 'Souvenir'
  },

  // Cover
  {
    id: 106,
    title: 'Magazine Cover',
    category: 'Editorial Design',
    tags: ['Layout', 'Typography'],
    imageUrl: 'https://picsum.photos/800/1000?random=106',
    imageAlt: 'Magazine Cover',
    workType: 'Design',
    designCategory: 'Cover'
  },

  // --- PR WRITING ---
  
  // 1. Event
  {
    id: 210, 
    title: '9th International Conference on Cognitive Neurodynamics (ICCN)',
    category: 'International Conference', 
    tags: ['Media Relations', 'Conference'],
    // [!] 更改 ICCN 图片：替换下方的 imageUrl
    imageUrl: 'https://i.imgur.com/YERk1DX.jpeg', 
    imageAlt: 'ICCN Conference',
    workType: 'PR Writing',
    prCategory: 'Event'
  },
  
  // 2. Honour & Award
  {
    id: 202,
    title: 'ESI Global Top 0.1% Hot Paper',
    category: 'Research Achievement',
    tags: ['Award', 'Research'],
    imageUrl: 'https://i.imgur.com/EtrzeAt.jpeg', 
    imageAlt: 'Research Achievement',
    externalUrl: 'https://physics.hkbu.edu.hk/news/professor-zhu-furong-s-research-selected-as-esi-global-top-0-1-hot-paper',
    workType: 'PR Writing',
    prCategory: 'Honour & Award'
  },
  {
    id: 203,
    title: 'National Natural Science Foundation of China',
    category: 'Grant',
    tags: ['Award', 'Grant'],
    imageUrl: 'https://i.imgur.com/dxvEMyB.jpeg', 
    imageAlt: 'NSFC Grant',
    externalUrl: 'https://physics.hkbu.edu.hk/news/professor-guancong-ma-awarded-grant-from-the-national-natural-science-foundation-of-china-nsfc',
    workType: 'PR Writing',
    prCategory: 'Honour & Award'
  },
  
  // 3. Product
  {
    id: 204,
    title: 'NetEase Youdao Dictionary Pen EX7',
    category: 'Product Launch',
    tags: ['Product', 'Tech', 'Education'],
    imageUrl: 'https://i.imgur.com/AhOE4uK.jpeg', 
    imageAlt: 'NetEase Youdao Dictionary Pen',
    workType: 'PR Writing',
    prCategory: 'Product',
    externalUrl: 'https://tech.chinadaily.com.cn/a/202407/05/WS668791bca3107cd55d26a0a9.html'
  },
  {
    id: 205,
    title: 'NetEase Youdao Dictionary x NetEase Cloud Music',
    category: 'Product Update',
    tags: ['Product', 'Music', 'App'],
    imageUrl: 'https://i.imgur.com/ePHRkM2.png', 
    imageAlt: 'NetEase Cloud Music',
    workType: 'PR Writing',
    prCategory: 'Product',
    externalUrl: 'https://finance.sina.com.cn/tjhz/2024-06-20/doc-inazkcpk2211048.shtml'
  },

  // --- COPYWRITING ---
  {
    id: 501,
    title: 'NIO Summer Project',
    category: 'Copywriting',
    tags: [],
    imageUrl: 'https://picsum.photos/800/600?random=501',
    imageAlt: 'NIO Summer',
    workType: 'Copywriting',
    copywritingCategory: 'NIO Summer'
  },
  {
    id: 503,
    title: 'SONY Handycam Project',
    category: 'Copywriting',
    tags: [],
    imageUrl: 'https://i.imgur.com/n60Xyru.jpeg',
    imageAlt: 'SONY Handycam',
    description: 'Sony Handycam camcorder offers the NightShot Infrared System, which allows for something we like to call “O Lux recording.”',
    workType: 'Copywriting',
    copywritingCategory: 'SONY Handycam'
  },

  // --- ADVERTISING ---
  {
    id: 6,
    title: 'Doggles',
    category: 'Outdoor Advertising',
    tags: ['Outdoor advertising'],
    imageUrl: 'https://i.imgur.com/cb1Zzug.png',
    imageAlt: 'Doggles',
    workType: 'Advertising',
  },
  {
    id: 601,
    title: 'Good Eyesight, Good Performance.',
    category: 'Manhole Cover Advertising',
    tags: ['Ambient'],
    imageUrl: 'https://i.imgur.com/SYpR7tC.jpeg',
    imageAlt: 'Manhole Cover Advertising',
    workType: 'Advertising',
  },
  {
    id: 602,
    title: 'Good Eyesight, Good Performance.',
    category: 'Billboard',
    tags: ['OOH'],
    imageUrl: 'https://i.imgur.com/ie1QnU5.png',
    imageAlt: 'Billboard Advertising',
    workType: 'Advertising',
  },

  // --- VIDEO ---
  {
    id: 301,
    title: 'We are all Cantonese',
    category: '', // Removed 'Video Production'
    tags: [],
    imageUrl: 'https://i.imgur.com/psVu5lY.png',
    imageAlt: 'We are all Cantonese',
    workType: 'Video',
    videoCategory: 'We are all Cantonese',
    externalUrl: 'https://tv.cctv.com/2024/09/22/VIDEZ09cKm8unXjyHZUy6PYc240922.shtml'
  },
  {
    id: 302,
    title: 'NIO ET7 TVC',
    category: '', // Removed 'Video Production'
    tags: [],
    imageUrl: 'https://i.imgur.com/S6kdTZ0.jpeg',
    imageAlt: 'NIO ET7',
    workType: 'Video',
    videoCategory: 'NIO ET7',
    storyboardImgUrl: 'https://i.imgur.com/DQ1BARl.jpeg' // Storyboard image placeholder
  },
  {
    id: 303,
    title: 'NIO Summer Recap',
    category: '', // Removed 'Video Production'
    tags: [],
    imageUrl: 'https://i.imgur.com/2Jrct9l.jpeg',
    imageAlt: 'NIO Summer Recap',
    workType: 'Video',
    videoCategory: 'NIO Summer Recap'
  },
  {
    id: 304,
    title: 'Selected Storyboard', 
    category: 'Colgate', // Subtitle Colgate
    tags: [],
    imageUrl: 'https://i.imgur.com/HBYVbh0.png', // Main thumbnail
    imageAlt: 'Colgate Storyboard',
    workType: 'Video',
    videoCategory: 'Selected Storyboard',
    storyboardList: [
        { title: 'Storyboard-1', url: 'https://i.imgur.com/E4OpcSG.png' },
        { title: 'Storyboard-2', url: 'https://i.imgur.com/Xi6gMjw.png' },
        { title: 'Storyboard-3', url: 'https://i.imgur.com/LznYnRB.png' }
    ]
  },

  // --- PHOTOGRAPHY (18 Images Total) ---
  {
    id: 7,
    title: 'Street Photography',
    category: 'Street Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/mFMLkvW.jpeg',
    imageAlt: 'Street Photography',
    workType: 'Photography',
  },
  {
    id: 701,
    title: 'Urban Life',
    category: 'Street Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/C27exUu.jpeg',
    imageAlt: 'Urban Life',
    workType: 'Photography',
  },
  {
    id: 702,
    title: 'Night Lights',
    category: 'Street Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/LGRAvEL.jpeg',
    imageAlt: 'Night Lights',
    workType: 'Photography',
  },
  {
    id: 703,
    title: 'Portraits',
    category: 'Portrait',
    tags: [],
    imageUrl: 'https://i.imgur.com/nIZ7pRz.jpeg',
    imageAlt: 'Portraits',
    workType: 'Photography',
  },
  {
    id: 704,
    title: 'Architecture',
    category: 'Architecture',
    tags: [],
    imageUrl: 'https://i.imgur.com/DUSxUne.jpeg',
    imageAlt: 'Architecture',
    workType: 'Photography',
  },
  {
    id: 705,
    title: 'Silence',
    category: 'Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/d5xYqrq.jpeg',
    imageAlt: 'Silence',
    workType: 'Photography',
  },
  {
    id: 706,
    title: 'Motion',
    category: 'Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/cvhyaP7.jpeg',
    imageAlt: 'Motion',
    workType: 'Photography',
  },
  {
    id: 707,
    title: 'Perspective',
    category: 'Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/sX6ERJe.jpeg',
    imageAlt: 'Perspective',
    workType: 'Photography',
  },
  {
    id: 708,
    title: 'Light and Shadow',
    category: 'Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/BlQGyFI.jpeg',
    imageAlt: 'Light and Shadow',
    workType: 'Photography',
  },
  {
    id: 709,
    title: 'Structure',
    category: 'Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/9vs0fx9.jpeg',
    imageAlt: 'Structure',
    workType: 'Photography',
  },
  {
    id: 710,
    title: 'Nature',
    category: 'Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/g9gV9si.jpeg',
    imageAlt: 'Nature',
    workType: 'Photography',
  },
  {
    id: 711,
    title: 'Reflections',
    category: 'Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/G66MvD8.jpeg',
    imageAlt: 'Reflections',
    workType: 'Photography',
  },
  {
    id: 712,
    title: 'Solitude',
    category: 'Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/zSEWLqa.jpeg',
    imageAlt: 'Solitude',
    workType: 'Photography',
  },
  {
    id: 713,
    title: 'Crowd',
    category: 'Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/HqyUtZL.jpeg',
    imageAlt: 'Crowd',
    workType: 'Photography',
  },
  {
    id: 714,
    title: 'Abstract',
    category: 'Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/Wgd1doE.jpeg',
    imageAlt: 'Abstract',
    workType: 'Photography',
  },
  {
    id: 715,
    title: 'Minimalism',
    category: 'Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/UbW4Z2w.jpeg',
    imageAlt: 'Minimalism',
    workType: 'Photography',
  },
  {
    id: 716,
    title: 'Vibrance',
    category: 'Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/ab4SwOk.jpeg',
    imageAlt: 'Vibrance',
    workType: 'Photography',
  },
  {
    id: 717,
    title: 'Dusk',
    category: 'Photography',
    tags: [],
    imageUrl: 'https://i.imgur.com/wJJEHl3.jpeg',
    imageAlt: 'Dusk',
    workType: 'Photography',
  },
];

export const SKILLS: Skill[] = [
  { name: 'Adobe Photoshop' },
  { name: 'Adobe Illustrator' },
  { name: 'Adobe InDesign' },
  { name: 'Premiere Pro' },
  { name: 'Canva' },
  { name: 'AI Tools (ChatGPT/DeepSeek/Gemini)' },
  { name: 'Microsoft Office' },
  { name: 'Public Relations' },
  { name: 'Content Marketing' },
  { name: 'SEO' },
  { name: 'Google Analytics' },
  { name: 'Data Analysis (SPSS)' },
  { name: 'Mandarin (Native)' },
  { name: 'English (Proficient)' },
  { name: 'Cantonese (Intermediate)' },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 1,
    period: 'Nov 2024 - Nov 2025',
    role: 'Assistant Executive Officer (Promotion and Branding)',
    company: 'HKBU, Department of Physics',
  },
  {
    id: 2,
    period: 'Jul 2024 - Nov 2024',
    role: 'Public Relations (Intern)',
    company: 'NetEase (网易) Marketing Department',
  },
  {
    id: 3,
    period: 'Apr 2024 - Jul 2024',
    role: 'Journalist (Intern)',
    company: 'China Media Group (中央广播电视总台)',
  },
  {
    id: 4,
    period: 'Jul 2022 - Sep 2022',
    role: 'Marketing and Communication (Intern)',
    company: 'NIO (蔚来)',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 1,
    period: 'Sep 2023 - Jun 2024',
    degree: 'Master of Arts in Gender Studies',
    school: 'The Chinese University of Hong Kong',
    // Details removed
  },
  {
    id: 2,
    period: 'Sep 2019 - Jun 2023',
    degree: 'Bachelor of Social Sciences in Integrated Communication Management',
    school: 'Hong Kong Baptist University',
    details: '*First Class Honours',
  },
];

export const HONORS: HonorItem[] = [
  { id: 1, period: 'Jun 2023', title: 'Certificate of International Advertising Association (IAA)' },
  { id: 2, period: 'Nov 2022', title: 'One-Off Scholarship (Top 10%)' },
  { id: 3, period: 'Sep 2021', title: 'Entrance Scholarship (Top 5%)' },
];