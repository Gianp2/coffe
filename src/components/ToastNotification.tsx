import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useMenu } from '../context/MenuContext';
import { Check, Info, Sparkles } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast } = useMenu();

  return (
    <div className="fixed top-5 left-0 right-0 z-50 pointer-events-none flex justify-center px-4">
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            id="app-global-toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto max-w-md shadow-2xl"
          >
            <div className="relative overflow-hidden flex items-center gap-3 px-4 py-3 bg-[#1B120D]/95 text-[#FAF6F0] rounded-2xl border border-[#D4A373]/40 backdrop-blur-xl shadow-lux">
              {/* Icon badge */}
              <div className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 ${
                toast.type === 'amber'
                  ? 'bg-[#D4A373]/20 text-[#E0A96D] border border-[#D4A373]/30'
                  : toast.type === 'info'
                  ? 'bg-[#3A4B58]/40 text-[#90B5D0] border border-[#506B7F]/40'
                  : 'bg-[#2E6B4F]/30 text-[#6BBF8C] border border-[#2E6B4F]/50'
              }`}>
                {toast.type === 'amber' ? (
                  <Sparkles className="w-3.5 h-3.5" />
                ) : toast.type === 'info' ? (
                  <Info className="w-3.5 h-3.5" />
                ) : (
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
              </div>

              {/* Message content */}
              <p className="text-xs font-semibold tracking-wide text-[#FAF6F0] pr-1">
                {toast.message}
              </p>

              {/* Subtle bottom progress bar */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 2.8, ease: 'linear' }}
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4A373] to-[#8B4513]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
