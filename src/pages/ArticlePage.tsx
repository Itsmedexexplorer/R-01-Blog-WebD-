import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Clock, BarChart, Share2, Check, Bookmark } from 'lucide-react';
import { useArticles } from '../context/ArticleContext';
import { parseContent } from '../utils/contentParser';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getArticle } = useArticles();
  const article = getArticle(id || '');
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-darkBg">
        <div className="text-center">
          <h2 className="font-serif text-2xl mb-4 text-charcoal dark:text-white">Thought not found.</h2>
          <Link to="/" className="text-terracotta border-b border-terracotta hover:bg-terracotta/10 font-mono text-sm uppercase tracking-widest">Return to Archive</Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-paper dark:bg-darkBg pt-32 pb-32 transition-colors duration-500"
    >
      {/* Reading Progress Bar (Fixed) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-terracotta origin-left z-50"
        style={{ scaleX }}
      />

      <article className="max-w-[740px] mx-auto px-6 md:px-0">
        
        {/* Navigation */}
        <div className="flex justify-between items-center mb-16">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-terracotta transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest">Archive</span>
          </Link>
        </div>

        {/* Header Metadata */}
        <header className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <span className="px-2 py-1 border border-charcoal/20 dark:border-white/20 rounded-full font-mono text-[10px] text-terracotta uppercase tracking-widest">
              {article.category}
            </span>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{article.date}</span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-charcoal dark:text-white leading-[1.05] tracking-tight mb-8">
            {article.title}
          </h1>

          <p className="font-body text-xl md:text-2xl text-gray-600 dark:text-gray-300 italic leading-relaxed border-l-2 border-terracotta pl-6 py-2">
            {article.subtitle}
          </p>

          <div className="flex items-center space-x-8 mt-8 pt-8 border-t border-dashed border-gray-300 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-gray-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-charcoal dark:text-gray-300">{article.readingTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart size={16} className="text-gray-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-charcoal dark:text-gray-300">Complexity: {article.complexity}</span>
            </div>
          </div>
        </header>

        {/* Main Image */}
        {article.imageUrl && (
          <figure className="mb-16 -mx-6 md:-mx-12">
            <div className="relative overflow-hidden bg-gray-100 dark:bg-zinc-900 aspect-video">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 ease-in-out"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
            </div>
            {article.imageCaption && (
              <figcaption className="text-center mt-4 font-mono text-xs text-gray-500 uppercase tracking-wider">
                {article.imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Content Body */}
        <div className="font-body text-[19px] md:text-[21px] leading-[1.7] text-charcoal dark:text-gray-200 tracking-wide">
          {parseContent(article.content)}
        </div>

        {/* Footer / Share */}
        <div className="mt-24 pt-12 border-t-2 border-charcoal dark:border-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center text-white font-serif text-xl italic">R</div>
             <div>
                <p className="font-serif italic text-charcoal dark:text-white text-lg">
                  Rutansh Digital Library
                </p>
                <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">Preserving thought.</p>
             </div>
          </div>
          
          <button 
            onClick={handleShare}
            className="flex items-center space-x-3 px-6 py-3 border border-gray-300 dark:border-gray-700 hover:border-terracotta hover:text-terracotta transition-all duration-300 bg-white dark:bg-darkBg"
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            <span className="font-mono text-xs uppercase tracking-widest">
              {copied ? 'Link Copied' : 'Share Thought'}
            </span>
          </button>
        </div>

      </article>
    </motion.div>
  );
};