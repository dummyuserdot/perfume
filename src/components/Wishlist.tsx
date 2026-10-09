import React from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES_DATA } from '../data/perfumes';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist, moveWishlistToCart, clearWishlist, setActiveTab } = useShop();

  const savedPerfumes = PERFUMES_DATA.filter((p) => wishlist.includes(p.id));

  if (savedPerfumes.length === 0) {
    return (
      <div className="py-20 max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-stone-100/70 dark:bg-stone-900/40 p-12 rounded-3xl border border-stone-200 dark:border-stone-800"
        >
          <div className="w-16 h-16 mx-auto bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif-luxury text-3xl font-light text-stone-900 dark:text-stone-100">
            Your Wishlist is Empty
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-md mx-auto leading-relaxed">
            Curate your private fragrance wishlist. Click the heart icon on any perfume to save it for later.
          </p>
          <button
            onClick={() => setActiveTab('shop')}
            className="mt-8 py-4 px-8 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-amber-600 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl"
          >
            Explore Haute Catalog
          </button>
        </motion.div>
      </div>
    );
  }

  const handleMoveAllToCart = () => {
    savedPerfumes.forEach((perfume) => {
      moveWishlistToCart(perfume);
    });
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-stone-200 dark:border-stone-800 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Curated Favorites
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light text-stone-900 dark:text-stone-100 mt-1">
            My Fragrance Wishlist ({savedPerfumes.length})
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={clearWishlist}
            className="py-2.5 px-4 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 text-xs font-semibold rounded-xl transition-colors"
          >
            Clear Wishlist
          </button>
          <button
            onClick={handleMoveAllToCart}
            className="py-2.5 px-5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Move All to Bag</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {savedPerfumes.map((perfume) => (
            <motion.div
              key={perfume.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-stone-100/70 dark:bg-stone-900/40 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 flex flex-col justify-between p-5 space-y-4"
            >
              <div className="flex gap-4">
                <img
                  src={perfume.images[0]}
                  alt={perfume.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 object-cover rounded-xl shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    {perfume.brand} · {perfume.category}
                  </span>
                  <h3 className="font-serif-luxury text-lg font-medium text-stone-900 dark:text-stone-100">
                    {perfume.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                    {perfume.subtitle}
                  </p>
                  <div className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-2 tabular-nums">
                    Pkr{perfume.discountPrice || perfume.price}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-stone-200 dark:border-stone-800">
                <button
                  onClick={() => moveWishlistToCart(perfume)}
                  className="flex-1 py-2.5 px-3 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-amber-600 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Bag</span>
                </button>
                <button
                  onClick={() => toggleWishlist(perfume.id)}
                  className="p-2.5 text-stone-400 hover:text-rose-500 bg-stone-200/50 dark:bg-stone-800/50 rounded-xl transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
