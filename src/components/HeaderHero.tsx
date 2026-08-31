import React, { useState, useEffect, useRef } from 'react';
import { useMenu } from '../context/MenuContext';
import { 
  MapPin, 
  Clock 
} from 'lucide-react';

export const HeaderHero: React.FC = () => {
  const { settings } = useMenu();

  const [bgOffsetY, setBgOffsetY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // Parallax applied smoothly to the background image
  useEffect(() => {
    let animationFrameId: number;

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const clampedY = Math.min(Math.max(0, currentY), 650);
        setBgOffsetY(clampedY * 0.35);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <header 
      ref={headerRef}
      id="hero-header"
      className="relative w-full overflow-hidden text-[#FAF6F0] border-b border-[#3D2C24]/60 shadow-lg select-none"
    >
      {/* Background Image with Parallax ONLY */}
      <div 
        className="absolute -top-[20%] -bottom-[20%] left-0 right-0 z-0 bg-[#1D130E] bg-cover bg-center bg-no-repeat pointer-events-none gpu-layer"
        style={{
          backgroundImage: `url(${settings.heroImage})`,
          transform: `translate3d(0, ${bgOffsetY}px, 0)`,
          willChange: 'transform',
        }}
      >
        {/* Warm photo overlays and gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#150D0A]/92 via-[#20140E]/82 to-[#180F0B]/96" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#150D0A]/40 to-[#150D0A]/90" />
      </div>

      {/* Static Warm Ambient Lights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-gradient-to-b from-[#E0A96D]/20 via-[#C27D38]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-16 w-80 h-80 bg-[#D4A373]/12 rounded-full blur-3xl" />
        <div className="absolute bottom-4 -left-16 w-80 h-64 bg-[#8B4513]/20 rounded-full blur-3xl" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 pt-12 pb-10 max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Cafe Identity Title */}
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFDF9] mb-2 drop-shadow-sm">
          {settings.name}
        </h1>

        {/* Editorial Subtitle */}
        <p className="font-editorial italic text-base sm:text-lg text-[#EDE1D4] max-w-md mx-auto leading-relaxed text-balance">
          {settings.tagline}
        </p>

        {/* Information Meta (Address & Schedule) */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-[#D8C7B8] font-medium">
          <span className="inline-flex items-center gap-1.5 bg-black/35 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs">
            <MapPin className="w-3.5 h-3.5 text-[#E0A96D]" />
            {settings.address}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-black/35 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs">
            <Clock className="w-3.5 h-3.5 text-[#E0A96D]" />
            {settings.hours}
          </span>
        </div>
      </div>
    </header>
  );
};
