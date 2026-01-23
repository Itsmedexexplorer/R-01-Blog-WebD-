import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BarChart2, ArrowUpRight } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link to={`/article/${article.id}`} className="block group h-full">
      <article className="
        relative flex flex-col h-full
        bg-transparent
        border-t border-b border-gray-200 dark:border-darkBorder
        md:border border-gray-200
        p-6 md:p-8
        transition-all duration-500 ease-soft
        hover:bg-white dark:hover:bg-darkPanel
        group-hover:border-terracotta/30 dark:group-hover:border-terracotta/30
      ">
        {/* Hover accent line */}
        <div className="absolute top-0 left-0 w-0 h-[2px] bg-terracotta transition-all duration-500 ease-soft group-hover:w-full"></div>

        <div className="flex items-start justify-between mb-6">
          <div className="flex flex-col">
             <span className="font-mono text-[10px] tracking-widest uppercase text-terracotta font-medium mb-1">
              {article.category}
            </span>
             <span className="font-mono text-[10px] text-gray-400 dark:text-gray-600">
              ID: {article.date.replace(/[^0-9]/g, '')}-{article.id}
            </span>
          </div>
          <ArrowUpRight size={18} className="text-gray-300 group-hover:text-terracotta transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        <div className="flex-grow">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal dark:text-gray-100 mb-4 leading-[1.15] group-hover:text-terracotta transition-colors duration-300">
            {article.title}
          </h2>
          
          <p className="font-body text-base text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
            {article.subtitle}
          </p>
        </div>

        <div className="flex items-center space-x-6 pt-8 mt-4 border-t border-dashed border-gray-200 dark:border-darkBorder/50">
          <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
            <Clock size={12} strokeWidth={1.5} />
            <span className="font-mono text-[10px] tracking-wider uppercase">{article.readingTime}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
            <BarChart2 size={12} strokeWidth={1.5} />
            <span className="font-mono text-[10px] tracking-wider uppercase">{article.complexity}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};