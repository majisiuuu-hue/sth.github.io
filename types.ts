export interface Project {
  id: number;
  title: string;
  category: string;
  tags: string[];
  imageUrl: string;
  fullImageUrl?: string; // Optional: High-res or uncropped image for lightbox (Front)
  secondImageUrl?: string; // Optional back image thumbnail
  fullSecondImageUrl?: string; // Optional: High-res image for lightbox (Back)
  bookletPages?: string[]; // New: Array of image URLs for the flipbook effect
  imageAlt: string;
  externalUrl?: string; // New: Optional external link for the project (e.g. news article)
  description?: string; // New: Specific content description for the project page
  storyboardImgUrl?: string; // New: Optional storyboard image for video projects
  storyboardList?: { title: string; url: string }[]; // New: List of multiple storyboards for a single project
  workType: 'Design' | 'PR Writing' | 'Copywriting' | 'Advertising' | 'Video' | 'Photography';
  designCategory?: 'Poster' | 'Leaflet' | 'Booklet' | 'Board' | 'Souvenir' | 'Cover';
  prCategory?: 'Event' | 'Honour & Award' | 'Product';
  copywritingCategory?: 'NIO Summer' | 'SONY Handycam';
  videoCategory?: 'We are all Cantonese' | 'NIO ET7' | 'NIO Summer Recap' | 'Selected Storyboard';
}

export interface ExperienceItem {
  id: number;
  period: string;
  role: string;
  company: string;
}

export interface EducationItem {
  id: number;
  period: string;
  degree: string;
  school: string;
  details?: string;
}

export interface HonorItem {
  id: number;
  period: string;
  title: string;
}

export interface Skill {
  name: string;
}