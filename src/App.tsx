/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MenuProvider } from './context/MenuContext';
import { HeaderHero } from './components/HeaderHero';
import { CategoryNav } from './components/CategoryNav';
import { ProductList } from './components/ProductList';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { ToastNotification } from './components/ToastNotification';

const MainMenuContent: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen flex flex-col font-sans bg-[#F9F6F0] text-[#2C2420] selection:bg-[#D4A373]/30"
    >
      {/* Header Hero with Cafe Identity, Search & Dietary Filter */}
      <HeaderHero />

      {/* Sticky Category Tabs Bar */}
      <CategoryNav />

      {/* Categories & Dishes / Platos List */}
      <ProductList />

      {/* Full-Screen Immersive & Organized Footer */}
      <Footer />

      {/* Floating Scroll to Top Button */}
      <ScrollToTopButton />
    </motion.div>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <MenuProvider>
      {/* Intro Splash Screen with Smooth Fade Transition */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen 
            key="splash-screen"
            onComplete={() => setShowSplash(false)} 
            duration={2300}
          />
        )}
      </AnimatePresence>

      {/* Global Toast Alert Notifications */}
      <ToastNotification />

      {/* Main Digital Menu Content */}
      <MainMenuContent />
    </MenuProvider>
  );
}
