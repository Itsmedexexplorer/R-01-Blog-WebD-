import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface MarginNoteProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export const MarginNote: React.FC<MarginNoteProps> = ({ term, definition, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <span
        className="cursor-pointer border-b border-dashed border-terracotta hover:bg-terracotta/10 transition-colors duration-200"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-label={`Definition of ${term}`}
      >
        {children}
      </span>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 5, x: '-50%' }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 bottom-full mb-2 w-64 p-4 z-50 bg-paper dark:bg-darkBg border border-terracotta shadow-lg rounded-sm"
            style={{ translateX: '-50%' }}
          >
            <div className="font-serif font-bold text-terracotta mb-1">{term}</div>
            <div className="font-body text-sm leading-relaxed text-charcoal dark:text-gray-300">
              {definition}
            </div>
            {/* Tiny arrow */}
            <div className="absolute left-1/2 bottom-[-5px] w-2 h-2 bg-paper dark:bg-darkBg border-r border-b border-terracotta transform rotate-45 -translate-x-1/2"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};