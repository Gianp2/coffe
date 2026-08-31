import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useMenu } from '../context/MenuContext';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { setActiveCategory, categories } = useMenu();

  useEffect(() => {
    const handleScroll = () => {
      // Show button once user has scrolled past 320px (past header)
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    // Smooth scroll to the top of page
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Reset active category to first category
    if (categories.length > 0) {
      setActiveCategory(categories[0].id);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="btn-scroll-to-top"
          onClick={handleScrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Volver al inicio de la carta"
          title="Volver al inicio"
          className="fixed bottom-6 right-5 sm:right-8 z-40 p-3 rounded-full bg-[#241711]/90 hover:bg-[#1A100B] text-[#FAF5EF] border border-[#D4A373]/40 shadow-lg hover:shadow-xl backdrop-blur-md transition-colors cursor-pointer group flex items-center justify-center ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
        >
          <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#E0A96D] transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span className="sr-only">Volver al inicio</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
