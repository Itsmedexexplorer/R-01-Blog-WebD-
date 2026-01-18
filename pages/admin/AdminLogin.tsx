import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticles } from '../../context/ArticleContext';
import { Lock } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useArticles();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid passphrase. Try "rutansh".');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-darkBg px-6">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-muted dark:border-darkBorder p-8 rounded-sm shadow-sm">
        <div className="text-center mb-8">
          <Lock className="w-8 h-8 mx-auto text-terracotta mb-4" />
          <h1 className="font-serif text-2xl font-bold text-charcoal dark:text-white">Custodian Access</h1>
          <p className="text-gray-500 text-sm mt-2">Enter the passphrase to access the archives.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passphrase"
              className="w-full px-4 py-3 bg-transparent border border-muted dark:border-gray-700 rounded-sm focus:outline-none focus:border-terracotta text-charcoal dark:text-white font-mono"
            />
            {error && <p className="text-red-500 text-xs mt-2 font-mono">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-terracotta text-white font-sans text-sm font-medium uppercase tracking-wider hover:bg-terracotta/90 transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};