import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Command } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledPct = (winScroll / height) * 100;
      setScrolled(scrolledPct);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-soft border-b
        ${scrolled > 2 
          ? 'bg-paper/90 dark:bg-darkBg/90 backdrop-blur-md border-gray-200 dark:border-darkBorder py-2' 
          : 'bg-transparent border-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="relative z-50 flex items-center gap-3 group">
            <div className="w-8 h-8 bg-terracotta text-white flex items-center justify-center font-serif italic text-xl">
              R
            </div>
            <div className="flex flex-col">
              <h1 className="font-serif text-lg font-bold tracking-tight text-charcoal dark:text-white leading-none group-hover:text-terracotta transition-colors">
                Rutansh
              </h1>
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mt-1">
                Digital Library
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="relative font-sans text-xs uppercase tracking-widest font-medium text-charcoal dark:text-gray-300 hover:text-terracotta transition-colors group">
              Archive
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-terracotta transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="relative font-sans text-xs uppercase tracking-widest font-medium text-charcoal dark:text-gray-300 hover:text-terracotta transition-colors group">
              Manifesto
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-terracotta transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-700"></div>

            <button 
              onClick={toggleDarkMode}
              className="text-gray-400 hover:text-terracotta transition-colors"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-6 z-50">
             <button 
              onClick={toggleDarkMode}
              className="text-charcoal dark:text-gray-300 hover:text-terracotta transition-colors"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-charcoal dark:text-gray-300">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Progress Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-transparent">
          <div 
            className="h-full bg-terracotta transition-all duration-100 ease-out"
            style={{ width: `${scrolled}%` }}
          />
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-paper dark:bg-darkBg pt-32 px-6 md:hidden flex flex-col items-center"
          >
            <nav className="flex flex-col space-y-8 text-center">
              <Link onClick={() => setIsMenuOpen(false)} to="/" className="font-serif text-4xl text-charcoal dark:text-white hover:text-terracotta transition-colors">Archive</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/about" className="font-serif text-4xl text-charcoal dark:text-white hover:text-terracotta transition-colors">Manifesto</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/admin" className="font-serif text-4xl text-charcoal dark:text-white hover:text-terracotta transition-colors">Login</Link>
              
              <div className="w-12 h-[2px] bg-terracotta mx-auto mt-8"></div>
              <p className="font-sans text-xs uppercase tracking-widest text-gray-500">Read slowly.</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};