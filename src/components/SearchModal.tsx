import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES_DATA } from '../data/perfumes';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { openProductDetail, setActiveTab } = useShop();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PERFUMES_DATA.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.fragranceFamily.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fragranceNotes.top.some((n) => n.toLowerCase().includes(q)) ||
        p.fragranceNotes.heart.some((n) => n.toLowerCase().includes(q)) ||
        p.fragranceNotes.base.some((n) => n.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
        />

        {/* Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="relative w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#121110] border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden z-10 p-6"
        >
          {/* Header & Input */}
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-stone-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by perfume name, brand (e.g., Tom Ford), or notes (Oud, Jasmine, Vanilla)..."
              className="w-full pl-12 pr-10 py-3.5 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-sm font-medium text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
            />
            {query ? (
              <button onClick={() => setQuery('')} className="absolute right-3 p-1 text-stone-400 hover:text-stone-600">
                <X className="w-4 h-4" />
              </button>
            ) : null}
          </div>

          {/* Popular Tag Quick Search */}
          {!query && (
            <div className="mt-6">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                Popular Scent Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['Oud', 'Jasmine', 'Vanilla', 'Amber', 'Creed', 'Unisex', 'Rose'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-200/60 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-amber-500/20 hover:text-amber-600 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query && (
            <div className="mt-6 max-h-80 overflow-y-auto space-y-3">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                Found {searchResults.length} matching fragrances
              </span>

              {searchResults.length === 0 ? (
                <div className="text-center py-8 text-stone-500 dark:text-stone-400 text-sm">
                  No perfumes found for "{query}". Try searching for notes like "Oud", "Vanilla", or "Rose".
                </div>
              ) : (
                searchResults.map((perfume) => (
                  <div
                    key={perfume.id}
                    onClick={() => {
                      onClose();
                      openProductDetail(perfume.id);
                    }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-stone-100/50 dark:bg-stone-900/50 hover:bg-stone-200/60 dark:hover:bg-stone-800/80 cursor-pointer transition-colors border border-stone-200/40 dark:border-stone-800/40"
                  >
                    <img
                      src={perfume.images[0]}
                      alt={perfume.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-lg shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                        {perfume.brand} · {perfume.category}
                      </div>
                      <h4 className="font-serif-luxury text-base font-medium truncate text-stone-900 dark:text-stone-100">
                        {perfume.name}
                      </h4>
                      <p className="text-xs text-stone-500 truncate">
                        Notes: {perfume.fragranceNotes.top.join(', ')}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                        Pkr{perfume.discountPrice || perfume.price}
                      </span>
                      <ArrowRight className="w-4 h-4 text-stone-400 mt-1 ml-auto" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-between items-center text-xs">
            <button
              onClick={() => {
                onClose();
                setActiveTab('shop');
              }}
              className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
            >
              Browse Full Haute Catalog →
            </button>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
              Close (ESC)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
