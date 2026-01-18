import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Article } from '../types';
import { INITIAL_ARTICLES } from '../constants';

interface ArticleContextType {
  articles: Article[];
  getArticle: (id: string) => Article | undefined;
  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) throw new Error('useArticles must be used within an ArticleProvider');
  return context;
};

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load articles from localStorage or fallback to constants
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('rutansh_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('rutansh_admin') === 'true';
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('rutansh_articles', JSON.stringify(articles));
  }, [articles]);

  const getArticle = (id: string) => articles.find(a => a.id === id);

  const addArticle = (article: Article) => {
    setArticles(prev => [article, ...prev]);
  };

  const updateArticle = (updatedArticle: Article) => {
    setArticles(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const login = (password: string) => {
    // Demo password
    if (password === 'rutansh') {
      setIsAdmin(true);
      localStorage.setItem('rutansh_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('rutansh_admin');
  };

  return (
    <ArticleContext.Provider value={{ articles, getArticle, addArticle, updateArticle, deleteArticle, isAdmin, login, logout }}>
      {children}
    </ArticleContext.Provider>
  );
};