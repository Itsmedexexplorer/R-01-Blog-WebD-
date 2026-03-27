import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticles } from '../../context/ArticleContext';
import { Article } from '../../types';
import { ArrowLeft, Save, Bold, Italic, Quote, BookOpen, X, Wand2, Trash2, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const ArticleEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getArticle, addArticle, updateArticle, deleteArticle } = useArticles();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [formData, setFormData] = useState<Article>({
    id: '',
    title: '',
    subtitle: '',
    category: 'Systems',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase(),
    readingTime: '5 MIN READ',
    complexity: 'Mid',
    content: '',
    imageUrl: '',
    imageCaption: ''
  });

  // UI States
  const [isRewriting, setIsRewriting] = useState(false);
  const [showDefModal, setShowDefModal] = useState(false);
  
  // Definition Tool States
  const [defTerm, setDefTerm] = useState('');
  const [defDefinition, setDefDefinition] = useState('');
  const [defSelection, setDefSelection] = useState('');
  const [selectionRange, setSelectionRange] = useState<{start: number, end: number} | null>(null);

  useEffect(() => {
    if (id) {
      const existing = getArticle(id);
      if (existing) setFormData(existing);
    } else {
      setFormData(prev => ({ ...prev, id: Date.now().toString() }));
    }
  }, [id, getArticle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const insertFormat = (prefix: string, suffix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selection = text.substring(start, end);
    
    // Default to 'text' if nothing selected for context
    const replacement = prefix + (selection || 'text') + suffix;
    
    const newContent = text.substring(0, start) + replacement + text.substring(end);
    
    setFormData(prev => ({ ...prev, content: newContent }));
    
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selection.length || 4));
    }, 0);
  };

  // --- Gemini AI Rewrite Logic ---
  const handleAiRewrite = async () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selection = text.substring(start, end);

    if (!selection) {
      // In a real app, use a toast here.
      alert("Please select some text to rewrite."); 
      return;
    }

    setIsRewriting(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a sub-editor for "Rutansh", a digital library specializing in "Archival Modernism". 
        Rewrite the following text to be more insightful, calm, and structurally sound. 
        Maintain the original meaning but elevate the prose to be timeless and intellectual.
        Avoid buzzwords. Preserve any markdown formatting or custom syntax (like {{Term|Def|Text}}).
        
        Text to rewrite:
        "${selection}"`,
      });

      const newText = response.text;
      if (newText) {
        const newContent = text.substring(0, start) + newText.trim() + text.substring(end);
        setFormData(prev => ({ ...prev, content: newContent }));
      }
    } catch (error) {
      console.error("AI Rewrite Error:", error);
      alert("Unable to rewrite text. Please check your API configuration.");
    } finally {
      setIsRewriting(false);
    }
  };

  // --- Definition Tool Logic ---
  const handleDefineClick = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selection = text.substring(start, end);

    setDefSelection(selection); 
    setDefTerm(selection); 
    setDefDefinition('');
    setSelectionRange({ start, end });
    setShowDefModal(true);
  };

  const confirmDefinition = () => {
    if (!selectionRange) return;
    
    const textarea = textareaRef.current;
    if (!textarea) return;

    const text = textarea.value;
    const textToDisplay = defSelection || defTerm; 
    const insertion = `{{${defTerm}|${defDefinition}|${textToDisplay}}}`;
    
    const newContent = text.substring(0, selectionRange.start) + insertion + text.substring(selectionRange.end);
    
    setFormData(prev => ({ ...prev, content: newContent }));
    setShowDefModal(false);
  };

  // --- Save / Delete Logic ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateArticle(formData);
    } else {
      addArticle(formData);
    }
    navigate('/admin/dashboard');
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this article? This cannot be undone.")) {
      if (id) deleteArticle(id);
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-darkBg pt-24 pb-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate('/admin/dashboard')} className="flex items-center text-gray-500 hover:text-terracotta">
            <ArrowLeft size={16} className="mr-2" />
            <span className="font-sans text-xs uppercase tracking-wider">Cancel</span>
          </button>
          
          <div className="flex space-x-4">
             {id && (
              <button 
                onClick={handleDelete}
                className="flex items-center px-4 py-2 border border-red-200 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 rounded-sm transition-colors"
                title="Delete Article"
              >
                <Trash2 size={16} />
              </button>
            )}
            <button 
              onClick={handleSubmit}
              className="flex items-center bg-terracotta text-white px-6 py-2 rounded-sm hover:bg-terracotta/90 transition-all active:scale-95 shadow-sm"
            >
              <Save size={16} className="mr-2" />
              <span className="font-sans text-xs uppercase tracking-wider font-medium">Save Thought</span>
            </button>
          </div>
        </div>

        <form className="space-y-8">
          {/* Metadata Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block font-mono text-xs uppercase text-gray-500 mb-2">Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-muted dark:border-gray-700 py-2 font-serif text-2xl text-charcoal dark:text-white focus:outline-none focus:border-terracotta transition-colors placeholder-gray-300"
                  placeholder="The Title..."
                />
              </div>
              
              <div>
                <label className="block font-mono text-xs uppercase text-gray-500 mb-2">Subtitle</label>
                <textarea
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-transparent border-b border-muted dark:border-gray-700 py-2 font-body text-lg text-gray-600 dark:text-gray-300 focus:outline-none focus:border-terracotta resize-none transition-colors"
                  placeholder="A short description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase text-gray-500 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-zinc-800 border border-muted dark:border-gray-700 p-2 rounded-sm text-sm focus:border-terracotta focus:outline-none"
                  >
                    <option value="Systems">Systems</option>
                    <option value="Responsibility">Responsibility</option>
                    <option value="Long-term Decisions">Long-term Decisions</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-gray-500 mb-2">Complexity</label>
                  <select
                    name="complexity"
                    value={formData.complexity}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-zinc-800 border border-muted dark:border-gray-700 p-2 rounded-sm text-sm focus:border-terracotta focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Mid">Mid</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
               <div>
                <label className="block font-mono text-xs uppercase text-gray-500 mb-2">Reading Time</label>
                <input
                  name="readingTime"
                  value={formData.readingTime}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-muted dark:border-gray-700 py-2 font-mono text-sm focus:outline-none focus:border-terracotta"
                  placeholder="e.g. 5 MIN READ"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase text-gray-500 mb-2">Image URL</label>
                <input
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-muted dark:border-gray-700 py-2 font-mono text-sm focus:outline-none focus:border-terracotta"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase text-gray-500 mb-2">Image Caption</label>
                <input
                  name="imageCaption"
                  value={formData.imageCaption || ''}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-muted dark:border-gray-700 py-2 font-mono text-sm focus:outline-none focus:border-terracotta"
                  placeholder="Fig 1.1..."
                />
              </div>
            </div>
          </div>

          {/* Content Editor Section */}
          <div className="pt-6 border-t border-muted dark:border-darkBorder">
             <div className="flex justify-between items-center mb-4">
                <label className="block font-mono text-xs uppercase text-gray-500">Content Body</label>
                <div className="text-xs text-gray-400 font-mono">
                  {formData.content.length} chars
                </div>
             </div>

             {/* Editor Toolbar */}
             <div className="sticky top-24 z-20 flex items-center space-x-2 mb-2 p-2 bg-gray-50/95 dark:bg-zinc-800/95 backdrop-blur rounded-sm border border-muted dark:border-darkBorder shadow-sm">
                <button 
                  type="button" 
                  onClick={() => insertFormat('**', '**')}
                  className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-sm text-charcoal dark:text-white transition-colors"
                  title="Bold (Cmd+B)"
                >
                  <Bold size={16} />
                </button>
                <button 
                  type="button" 
                  onClick={() => insertFormat('*', '*')}
                  className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-sm text-charcoal dark:text-white transition-colors"
                  title="Italic (Cmd+I)"
                >
                  <Italic size={16} />
                </button>
                <button 
                  type="button" 
                  onClick={() => insertFormat('> ', '')}
                  className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-sm text-charcoal dark:text-white transition-colors"
                  title="Blockquote"
                >
                  <Quote size={16} />
                </button>
                
                <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-600 mx-2"></div>
                
                <button 
                  type="button" 
                  onClick={handleDefineClick}
                  className="flex items-center space-x-2 px-3 py-1 bg-white dark:bg-zinc-700 hover:bg-terracotta hover:text-white rounded-sm text-charcoal dark:text-white text-xs font-mono border border-gray-200 dark:border-gray-600 transition-colors"
                  title="Add Margin Definition"
                >
                  <BookOpen size={14} />
                  <span>Define</span>
                </button>

                <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-600 mx-2"></div>

                <button 
                  type="button" 
                  onClick={handleAiRewrite}
                  disabled={isRewriting}
                  className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800/30 hover:border-indigo-300 rounded-sm text-indigo-900 dark:text-indigo-200 text-xs font-mono transition-all disabled:opacity-50"
                  title="Rewrite selected text with AI"
                >
                  {isRewriting ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                  <span>{isRewriting ? 'Refining...' : 'Refine'}</span>
                </button>
             </div>

             <textarea
                ref={textareaRef}
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full h-[600px] p-8 bg-white dark:bg-zinc-900 border border-muted dark:border-darkBorder font-body text-lg leading-relaxed focus:outline-none focus:border-terracotta rounded-sm resize-none"
                placeholder="Start writing..."
             />
          </div>
        </form>
      </div>

      {/* Definition Modal */}
      {showDefModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-6 rounded-sm shadow-xl border border-muted dark:border-darkBorder animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl text-charcoal dark:text-white">Add Definition</h3>
              <button onClick={() => setShowDefModal(false)} className="text-gray-400 hover:text-terracotta">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase text-gray-500 mb-2">Term (The Word)</label>
                <input 
                  value={defTerm}
                  onChange={(e) => setDefTerm(e.target.value)}
                  className="w-full p-2 border border-muted dark:border-gray-700 bg-transparent rounded-sm text-charcoal dark:text-white focus:border-terracotta focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block font-mono text-xs uppercase text-gray-500 mb-2">Definition (The Meaning)</label>
                <textarea 
                  value={defDefinition}
                  onChange={(e) => setDefDefinition(e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-muted dark:border-gray-700 bg-transparent rounded-sm text-charcoal dark:text-white focus:border-terracotta focus:outline-none resize-none"
                  placeholder="Explain the concept..."
                />
              </div>

              {defSelection && defSelection !== defTerm && (
                <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-sm text-xs text-gray-500 border border-dashed border-gray-300 dark:border-gray-600">
                  <span className="font-bold">Context:</span> Attaching to selection: "{defSelection}"
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-2">
                <button 
                  onClick={() => setShowDefModal(false)}
                  className="px-4 py-2 text-xs font-mono uppercase text-gray-500 hover:text-charcoal"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDefinition}
                  className="px-6 py-2 bg-terracotta text-white text-xs font-mono uppercase rounded-sm hover:bg-terracotta/90"
                >
                  Insert Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};