import React, { useRef, useEffect } from 'react';
import { useMenu } from '../context/MenuContext';
import { CategoryId } from '../types';
import { motion } from 'motion/react';
import {
  Coffee,
  Sparkles,
  Flame,
  Leaf,
  Croissant,
  Sun,
  Utensils,
  Award,
  GlassWater,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Coffee: <Coffee className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  Leaf: <Leaf className="w-4 h-4" />,
  Croissant: <Croissant className="w-4 h-4" />,
  Sun: <Sun className="w-4 h-4" />,
  Utensils: <Utensils className="w-4 h-4" />,
  Award: <Award className="w-4 h-4" />,
  GlassWater: <GlassWater className="w-4 h-4" />,
};

export const CategoryNav: React.FC = () => {
  const { 
    categories, 
    activeCategory, 
    products,
    scrollToCategory 
  } = useMenu();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll active category tab horizontally into view
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeBtn = scrollContainerRef.current.querySelector(
        `[data-category="${activeCategory}"]`
      ) as HTMLElement;
      if (activeBtn) {
        const container = scrollContainerRef.current;
        const scrollLeft =
          activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeCategory]);

  return (
    <nav 
      id="category-navigation"
      aria-label="Categorías del menú"
      className="sticky top-0 z-30 backdrop-blur-md bg-[#F9F6F0]/95 border-b border-[#E8DFC8]/80 shadow-xs transition-all"
    >
      <div 
        ref={scrollContainerRef}
        className="max-w-2xl mx-auto px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = products.filter((p) => p.categoryId === cat.id && p.isAvailable).length;
          const icon = CATEGORY_ICONS[cat.iconName] || <Coffee className="w-4 h-4" />;

          return (
            <button
              key={cat.id}
              id={`cat-nav-btn-${cat.id}`}
              data-category={cat.id}
              onClick={() => scrollToCategory(cat.id as CategoryId)}
              className={`relative group flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0 cursor-pointer ${
                isActive
                  ? 'text-[#F9F6F0] shadow-md ring-1 ring-[#D4A373]/40 font-bold'
                  : 'bg-[#ECE3D4]/80 text-[#544337] hover:bg-[#E2D4C0] hover:text-[#261A14]'
              }`}
            >
              {/* Active Tab Animated Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="active-category-pill"
                  className="absolute inset-0 bg-[#261A14] rounded-2xl -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <span className={`transition-transform duration-200 ${
                isActive ? 'text-[#D4A373] scale-110' : 'text-[#8A7568]'
              }`}>
                {icon}
              </span>
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                  isActive
                    ? 'bg-[#D4A373]/25 text-[#D4A373]'
                    : 'bg-black/5 text-[#7E695C]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
