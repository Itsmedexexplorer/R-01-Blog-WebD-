import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ArticlePage } from './pages/ArticlePage';
import { About } from './pages/About';
import { ArticleProvider, useArticles } from './context/ArticleContext';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ArticleEditor } from './pages/admin/ArticleEditor';
import { AnimatePresence } from 'framer-motion';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useArticles();
  if (!isAdmin) return <Navigate to="/admin" replace />;
  return <>{children}</>;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/new" element={
          <ProtectedRoute>
            <ArticleEditor />
          </ProtectedRoute>
        } />
        <Route path="/admin/edit/:id" element={
          <ProtectedRoute>
            <ArticleEditor />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (localStorage.getItem('theme') === 'dark' || 
       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-paper dark:bg-darkBg transition-colors duration-700 text-charcoal dark:text-gray-100 font-sans selection:bg-terracotta/30">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <div className="flex-grow">
          <AnimatedRoutes />
        </div>

        <Footer />
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ArticleProvider>
      <AppContent />
    </ArticleProvider>
  );
};

export default App;