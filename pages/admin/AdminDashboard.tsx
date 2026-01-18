import React from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../../context/ArticleContext';
import { Plus, Edit2, Trash2, LogOut } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { articles, deleteArticle, logout } = useArticles();

  return (
    <div className="min-h-screen bg-paper dark:bg-darkBg pt-24 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-serif text-4xl text-charcoal dark:text-white mb-2">Archive Control</h1>
            <p className="font-mono text-sm text-gray-500">Manage your long-term thoughts.</p>
          </div>
          <div className="flex space-x-4">
            <Link 
              to="/admin/new" 
              className="flex items-center space-x-2 bg-terracotta text-white px-6 py-2 rounded-sm hover:bg-terracotta/90 transition-colors"
            >
              <Plus size={16} />
              <span className="font-sans text-xs uppercase tracking-wider font-medium">New Thought</span>
            </Link>
            <button 
              onClick={logout}
              className="p-2 text-gray-500 hover:text-terracotta border border-muted dark:border-darkBorder rounded-sm"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <div className="bg-white dark:bg-zinc-900 border border-muted dark:border-darkBorder rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-zinc-800 border-b border-muted dark:border-darkBorder">
              <tr>
                <th className="px-6 py-4 font-mono text-xs uppercase text-gray-500 font-medium">Title</th>
                <th className="px-6 py-4 font-mono text-xs uppercase text-gray-500 font-medium">Category</th>
                <th className="px-6 py-4 font-mono text-xs uppercase text-gray-500 font-medium">Date</th>
                <th className="px-6 py-4 font-mono text-xs uppercase text-gray-500 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted dark:divide-darkBorder">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-serif font-medium text-charcoal dark:text-white">{article.title}</div>
                    <div className="text-xs text-gray-400 truncate max-w-xs">{article.subtitle}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 bg-terracotta/10 text-terracotta text-xs font-mono rounded-sm">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">
                    {article.date}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link to={`/admin/edit/${article.id}`} className="inline-block text-gray-400 hover:text-terracotta transition-colors">
                      <Edit2 size={16} />
                    </Link>
                    <button 
                      onClick={() => {
                        if(window.confirm('Are you sure you want to delete this thought?')) {
                          deleteArticle(article.id);
                        }
                      }}
                      className="inline-block text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {articles.length === 0 && (
            <div className="p-12 text-center text-gray-500 font-serif italic">
              No thoughts documented yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};