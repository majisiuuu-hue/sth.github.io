import React, { useEffect, useRef, useState } from 'react';

interface HeroProps {
  onNavigate?: (href: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Updated Image: Green/Yellow abstract oil painting texture with vertical strokes
  // Similar to the reference image provided
  const bgUrl = "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=2400&auto=format&fit=crop";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;
    
    // Ripple Simulation Variables
    const resolutionScale = 0.5; 
    let simWidth = 0;
    let simHeight = 0;
    
    let buffer1: Int16Array;
    let buffer2: Int16Array;
    let textureData: ImageData | null = null;
    let rippleData: ImageData | null = null;
    
    // Slightly more viscous for "calm" oil paint feeling
    const damping = 0.94; 

    // Load Background Image
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = bgUrl;
    
    img.onload = () => {
      setIsLoaded(true);
      handleResize(); 
      loop();
    };

    const initBuffers = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return;

      const size = w * h;
      buffer1 = new Int16Array(size);
      buffer2 = new Int16Array(size);
      
      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Draw image with "Object-Fit: Cover" logic to prevent stretching
      const hRatio = w / img.width;
      const vRatio = h / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (w - img.width * ratio) / 2;
      const centerShift_y = (h - img.height * ratio) / 2;
      
      ctx.drawImage(
        img, 
        0, 0, img.width, img.height, 
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );

      try {
        textureData = ctx.getImageData(0, 0, w, h);
        rippleData = ctx.createImageData(w, h);
      } catch (e) {
        console.error("Failed to get image data", e);
      }
    };

    const handleResize = () => {
      if (!img.complete) return;

      width = window.innerWidth;
      height = window.innerHeight;
      
      if (width === 0 || height === 0) return;

      canvas.width = Math.floor(width * resolutionScale);
      canvas.height = Math.floor(height * resolutionScale);
      
      simWidth = canvas.width;
      simHeight = canvas.height;
      
      // Guard against invalid dimensions
      if (simWidth <= 0 || simHeight <= 0) return;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initBuffers(simWidth, simHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!buffer1) return;

      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) * resolutionScale);
      const y = Math.floor((e.clientY - rect.top) * resolutionScale);

      const radius = 3;
      const intensity = 400; // Softer ripples

      for (let j = y - radius; j < y + radius; j++) {
        for (let k = x - radius; k < x + radius; k++) {
          if (j >= 0 && j < simHeight && k >= 0 && k < simWidth) {
             buffer1[j * simWidth + k] = intensity;
          }
        }
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
       if (!buffer1) return;
       const rect = canvas.getBoundingClientRect();
       const touch = e.touches[0];
       const x = Math.floor((touch.clientX - rect.left) * resolutionScale);
       const y = Math.floor((touch.clientY - rect.top) * resolutionScale);
       
       const radius = 4;
       const intensity = 500;

       for (let j = y - radius; j < y + radius; j++) {
        for (let k = x - radius; k < x + radius; k++) {
          if (j >= 0 && j < simHeight && k >= 0 && k < simWidth) {
             buffer1[j * simWidth + k] = intensity;
          }
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const processRipples = () => {
       if (!buffer1 || !buffer2 || !textureData || !rippleData) return;
       
       const w = simWidth;
       const h = simHeight;
       
       const b1 = buffer1;
       const b2 = buffer2;
       const pixelData = textureData.data;
       const outputData = rippleData.data;

       const temp = buffer1;
       buffer1 = buffer2;
       buffer2 = temp;

       for (let y = 1; y < h - 1; y++) {
         const row = y * w;
         for (let x = 1; x < w - 1; x++) {
            const i = row + x;
            
            let val = (
                b2[i - 1] + 
                b2[i + 1] + 
                b2[i - w] + 
                b2[i + w]
            ) >> 1;
            
            val -= b1[i];
            val -= val >> 4; // Adjusted damping for smoother fade
            
            b1[i] = val;
         }
       }
       
       for (let y = 0; y < h; y++) {
         const row = y * w;
         for (let x = 0; x < w; x++) {
             const i = row + x;
             
             let xoff = 0;
             let yoff = 0;
             
             if (x > 0 && x < w - 1) xoff = b1[i - 1] - b1[i + 1];
             if (y > 0 && y < h - 1) yoff = b1[i - w] - b1[i + w];
             
             const strength = 1024;
             
             let srcX = x + ((xoff * strength) >> 13);
             let srcY = y + ((yoff * strength) >> 13);
             
             if (srcX < 0) srcX = 0;
             if (srcX >= w) srcX = w - 1;
             if (srcY < 0) srcY = 0;
             if (srcY >= h) srcY = h - 1;
             
             const srcIdx = (srcY * w + srcX) * 4;
             const targetIdx = i * 4;
             
             outputData[targetIdx] = pixelData[srcIdx];
             outputData[targetIdx + 1] = pixelData[srcIdx + 1];
             outputData[targetIdx + 2] = pixelData[srcIdx + 2];
             outputData[targetIdx + 3] = 255; 
         }
       }
       
       ctx.putImageData(rippleData, 0, 0);
    };

    const loop = () => {
      processRipples();
      animationFrameId = requestAnimationFrame(loop);
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <header className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-brand-50 overflow-hidden">
      
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-brand-50">
           <div className="text-brand-400 font-light tracking-widest animate-pulse">LOADING CANVAS...</div>
        </div>
      )}

      {/* Ripple Canvas */}
      <canvas 
        ref={canvasRef}
        className={`absolute inset-0 z-0 object-cover w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ imageRendering: 'auto' }} 
        aria-label="Interactive Water Ripple Background"
      />

      {/* OVERLAY LAYERS - Engineered for Contrast with Colored Backgrounds */}
      {/* 1. High opacity white wash to ensure dark text pops against colorful texture (80% opacity) */}
      <div className="absolute inset-0 z-[1] bg-white/80 pointer-events-none" />
      
      {/* 2. Vertical Gradient to ensure header/footer areas blend seamlessly */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/95 via-transparent to-white/95 pointer-events-none" />
      
      {/* 3. Slight blur to soften the details behind the text */}
      <div className="absolute inset-0 z-[1] backdrop-blur-[1px] pointer-events-none" />

      {/* Content Layer */}
      <div 
        ref={containerRef}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center pointer-events-none"
      >
        <div className="pointer-events-auto">
            {/* 
                Modified H1: 
                - Single line (removed <br>)
                - Bolder font (font-extrabold)
                - Smaller font size (text-4xl md:text-6xl)
                - Added text shadow for outline effect
            */}
            <h1 
              className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-8 text-brand-950 font-sans"
              style={{ textShadow: '2px 2px 4px rgba(255,255,255, 0.8), -1px -1px 0 rgba(255,255,255, 0.5)' }}
            >
              Hello, I'm Maggie Shao.
            </h1>
            
            {/* Modified text: "My" -> "my" */}
            <p className="text-lg md:text-xl text-brand-900 leading-relaxed font-medium mb-10 max-w-3xl mx-auto font-sans drop-shadow-md shadow-white">
            Welcome to my official website, where you'll find my recent works in design, PR writing, copywriting, advertising, videos, and photography, including personal creations and published pieces.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
                href="#contact" 
                onClick={(e) => handleClick(e, '#contact')}
                className="px-10 py-4 bg-brand-900 text-white text-sm font-medium tracking-widest uppercase hover:bg-brand-800 transition-all hover:scale-105 duration-300 shadow-xl shadow-brand-900/20 backdrop-blur-sm"
            >
                Get In Touch
            </a>
            <a 
                href="#work" 
                onClick={(e) => handleClick(e, '#work')}
                className="px-10 py-4 bg-white/80 backdrop-blur-md border border-brand-900 text-brand-950 text-sm font-medium tracking-widest uppercase hover:bg-white transition-all hover:scale-105 duration-300 shadow-xl shadow-brand-900/10"
            >
                View Work
            </a>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;