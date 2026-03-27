import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-muted dark:border-darkBorder bg-paper dark:bg-darkBg py-12 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        
        <div className="text-center md:text-left">
          <h4 className="font-serif text-xl font-bold text-charcoal dark:text-white mb-2">Rutansh</h4>
          <p className="font-sans text-xs text-gray-500 dark:text-gray-400 tracking-widest uppercase">
            Modern Heritage Digital Library
          </p>
        </div>

        <nav className="flex space-x-8">
          <Link to="/" className="font-sans text-sm text-gray-600 dark:text-gray-400 hover:text-terracotta transition-colors">Archive</Link>
          <Link to="/about" className="font-sans text-sm text-gray-600 dark:text-gray-400 hover:text-terracotta transition-colors">Manifesto</Link>
          <a href="#" className="font-sans text-sm text-gray-600 dark:text-gray-400 hover:text-terracotta transition-colors">Twitter</a>
          <Link to="/admin" className="font-sans text-sm text-gray-600 dark:text-gray-400 hover:text-terracotta transition-colors opacity-50 hover:opacity-100">Custodian</Link>
        </nav>

        <div className="text-center md:text-right">
          <p className="font-mono text-xs text-gray-400">
            &copy; {year} Rutansh. All rights reserved.
          </p>
          <p className="font-serif text-xs italic text-gray-500 mt-1">
            Built with patience.
          </p>
        </div>

      </div>
    </footer>
  );
};