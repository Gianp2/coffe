import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useMenu } from '../context/MenuContext';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  duration = 2300 
}) => {
  const { settings } = useMenu();
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Prevent background scrolling while splash is visible
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    // Smooth progress bar increment
    const intervalTime = 25;
    const step = (intervalTime / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    // Auto complete timeout
    const exitTimer = setTimeout(() => {
      onCompleteRef.current();
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(exitTimer);
    };
  }, [duration]);

  // Handle keyboard access (Enter / Space / Escape dismisses splash)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      e.preventDefault();
      onCompleteRef.current();
    }
  };

  return (
    <motion.div
      id="brand-splash-screen"
      role="button"
      tabIndex={0}
      aria-label="Bienvenido a Ámbar Café - Toca para ingresar al menú"
      onKeyDown={handleKeyDown}
      onClick={() => onCompleteRef.current()}
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.04,
        filter: 'blur(8px)',
        transition: { duration: 0.65, ease: [0.32, 0.72, 0, 1] } 
      }}
      className="fixed inset-0 z-[100] bg-[#140D09] text-[#FAF6F0] flex flex-col items-center justify-between p-6 select-none overflow-hidden cursor-pointer gpu-layer focus:outline-none"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep Golden Amber Radial Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] bg-radial from-[#D4A373]/20 via-[#8B4513]/10 to-transparent rounded-full blur-3xl animate-pulse" />
        
        {/* Subtle Vignette & Grain Overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#140D09]/40 to-[#140D09]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(#FAF6F0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
      </div>

      {/* Top Boutique Slogan */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10 pt-6 sm:pt-8"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-[#D4A373]/20 rounded-full backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-[#E0A96D]" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-[#D4A373]">
            Carta Digital 2026
          </span>
        </div>
      </motion.div>

      {/* Central Brand Identity & Artisan Logo */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto -mt-6">
        {/* Animated Brand Emblem / Logo */}
        <motion.div
          initial={{ scale: 0.75, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-[#D4A373]/40 via-[#8B4513]/30 to-[#E0A96D]/40 rounded-full blur-lg opacity-70 animate-pulse" />
          
          {/* Emblem Container */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#221610] border-2 border-[#D4A373]/50 flex items-center justify-center shadow-2xl backdrop-blur-md">
            {/* Inner Decorative Ring */}
            <div className="absolute inset-1.5 rounded-full border border-[#D4A373]/25 border-dashed animate-[spin_40s_linear_infinite]" />
            
            {/* Custom Artisan Coffee Logo SVG */}
            <svg 
              className="w-12 h-12 sm:w-14 sm:h-14 text-[#E0A96D] drop-shadow-md" 
              viewBox="0 0 64 64" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Rising Steam Waves */}
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                d="M24 14C23 10 26 8 26 4" 
                stroke="#E0A96D" 
                strokeWidth="2.2" 
                strokeLinecap="round"
              />
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
                d="M32 16C31 11 34 8 34 3" 
                stroke="#F2C594" 
                strokeWidth="2.2" 
                strokeLinecap="round"
              />
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 1.8, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
                d="M40 14C39 10 42 8 42 4" 
                stroke="#E0A96D" 
                strokeWidth="2.2" 
                strokeLinecap="round"
              />
              
              {/* Modern Espresso Cup Silhouette */}
              <path 
                d="M14 22H48C48 22 48 40 31 40C14 40 14 22 14 22Z" 
                fill="url(#cup_gradient)" 
                stroke="#E0A96D" 
                strokeWidth="2.2" 
                strokeLinejoin="round"
              />
              
              {/* Cup Handle */}
              <path 
                d="M48 25C52.5 25 55 27.5 55 31C55 34.5 52.5 37 48 37" 
                stroke="#E0A96D" 
                strokeWidth="2.2" 
                strokeLinecap="round"
              />
              
              {/* Elegant Saucer Base */}
              <path 
                d="M10 46H52" 
                stroke="#D4A373" 
                strokeWidth="2.2" 
                strokeLinecap="round"
              />
              
              {/* Amber Coffee Core Star / Sparkle */}
              <circle cx="31" cy="30" r="3.5" fill="#F8E5D0" />
              
              <defs>
                <linearGradient id="cup_gradient" x1="14" y1="22" x2="48" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B261C" />
                  <stop offset="1" stopColor="#1E120B" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.22em] text-[#FFFDF9] mb-3 drop-shadow-lg"
        >
          {settings.name}
        </motion.h1>

        {/* Brand Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#E0A96D] to-transparent my-2"
        />

        {/* Tagline / Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-editorial italic text-lg sm:text-xl text-[#E8D9C8] font-normal tracking-wide leading-relaxed text-balance"
        >
          {settings.tagline}
        </motion.p>
      </div>

      {/* Bottom Loading Progress & Tap to Enter Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="relative z-10 w-full max-w-xs flex flex-col items-center gap-3 pb-4 sm:pb-6"
      >
        {/* Subtle Minimalist Progress Track */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#8B4513] via-[#D4A373] to-[#F5D8B8] rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Skip / Enter Touch Prompt */}
        <div className="flex items-center gap-1.5 text-xs text-[#BAA797] hover:text-[#FAF6F0] transition-colors py-1">
          <span className="tracking-wider uppercase text-[10px] font-medium">
            Ingresar al menú
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D4A373] animate-pulse" />
        </div>
      </motion.div>
    </motion.div>
  );
};
