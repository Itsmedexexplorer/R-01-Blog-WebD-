import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArticleCard } from '../components/ArticleCard';
import { useArticles } from '../context/ArticleContext';
import { ArticleCategory } from '../types';
import { ArrowDown } from 'lucide-react';

const RotatingOrbit = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 dark:opacity-10 z-0">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      className="w-[600px] h-[600px] border border-dashed border-charcoal dark:border-gray-500 rounded-full"
    />
    <motion.div 
      animate={{ rotate: -360 }}
      transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      className="absolute w-[450px] h-[450px] border border-terracotta rounded-full"
    />
     <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      className="absolute w-[300px] h-[300px] border border-charcoal dark:border-gray-500 rounded-full opacity-50"
    />
  </div>
);

export const Home: React.FC = () => {
  const { articles } = useArticles();
  const [filter, setFilter] = useState<ArticleCategory | 'All'>('All');

  const filteredArticles = articles.filter(article => {
    return filter === 'All' || article.category === filter;
  });

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-24 pb-16 px-6 bg-paper dark:bg-darkBg transition-colors duration-500 overflow-hidden"
    >
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center mb-24">
        <RotatingOrbit />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block mb-6 px-3 py-1 border border-terracotta/30 rounded-full font-mono text-[10px] tracking-[0.2em] text-terracotta uppercase bg-paper/50 dark:bg-darkBg/50 backdrop-blur-sm">
              Vol. 01 — The Foundation
            </span>
            <h1 className="font-serif text-6xl md:text-8xl font-medium text-charcoal dark:text-white mb-8 leading-[1.1] tracking-tight">
              A Thinking Space <br />
              <span className="italic font-serif text-terracotta">for Bharat</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
              Resisting the velocity of the modern web. <br/>
              A digital sanctuary for slow reading and long-term analysis.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12"
        >
          <ArrowDown className="animate-bounce text-terracotta" size={20} strokeWidth={1} />
        </motion.div>
      </section>

      {/* Analytical Archive */}
      <section className="max-w-7xl mx-auto">
        <div className="sticky top-20 z-30 bg-paper/90 dark:bg-darkBg/90 backdrop-blur-md py-6 mb-12 border-b border-charcoal/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-end md:items-center">
          <h2 className="font-serif text-3xl text-charcoal dark:text-white">Archive</h2>
          
          <div className="flex space-x-6 overflow-x-auto w-full md:w-auto mt-4 md:mt-0 pb-2 md:pb-0 hide-scrollbar">
            {['All', 'Systems', 'Responsibility', 'Long-term Decisions'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`
                  text-xs font-mono uppercase tracking-widest transition-all whitespace-nowrap pb-1 border-b-2
                  ${filter === cat 
                    ? 'border-terracotta text-terracotta' 
                    : 'border-transparent text-gray-400 hover:text-charcoal dark:hover:text-gray-200'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-gray-200 dark:border-darkBorder">
          {filteredArticles.length > 0 ? (
             filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94], // ease-soft
                  delay: index * 0.1 
                }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center border-r border-gray-200 dark:border-darkBorder border-b">
              <p className="font-serif text-2xl text-gray-400 italic mb-4">
                "Silence is also an answer."
              </p>
              <button 
                onClick={() => setFilter('All')}
                className="text-terracotta font-mono text-xs uppercase tracking-widest hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </motion.main>
  );
};