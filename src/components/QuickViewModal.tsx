import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PerfumeSize } from '../types/perfume';
import { X, Star, ShoppingBag, Heart, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickViewModal: React.FC = () => {
  const { quickViewPerfume, setQuickViewPerfume, addToCart, toggleWishlist, isInWishlist, openProductDetail } = useShop();
  const [selectedSize, setSelectedSize] = useState<PerfumeSize>('50ml');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewPerfume(null);
      }
    };
    if (quickViewPerfume) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewPerfume, setQuickViewPerfume]);

  if (!quickViewPerfume) return null;

  const perfume = quickViewPerfume;
  const inWishlist = isInWishlist(perfume.id);
  const currentPrice = perfume.sizePrices[selectedSize] || perfume.price;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewPerfume(null)}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF8F5] dark:bg-[#121110] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl overflow-hidden border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row z-10"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewPerfume(null)}
            className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 dark:hover:text-white bg-white/60 dark:bg-stone-900/60 rounded-full backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Column */}
          <div className="w-full md:w-1/2 relative bg-stone-200 dark:bg-stone-950 flex items-center justify-center p-6">
            <img
              src={perfume.images[0]}
              alt={perfume.name}
              referrerPolicy="no-referrer"
              className="w-full h-80 md:h-full object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Info Column */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Unboxed Header Metadata */}
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
                <span className="uppercase tracking-widest">{perfume.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{perfume.category}</span>
                <span aria-hidden="true">·</span>
                <span>{perfume.concentration}</span>
              </div>

              {/* Title & Price */}
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium mt-1">
                {perfume.name}
              </h2>

              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                  Pkr{currentPrice}
                </span>
                <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full text-amber-600 dark:text-amber-400 text-xs font-medium">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{perfume.rating} ({perfume.reviewsCount} reviews)</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-3 leading-relaxed line-clamp-3">
                {perfume.description}
              </p>

              {/* Fragrance Notes Quick Summary */}
              <div className="mt-4 p-3 bg-stone-200/50 dark:bg-stone-900/60 rounded-xl text-xs space-y-1 border border-stone-200/60 dark:border-stone-800">
                <div><strong className="text-amber-700 dark:text-amber-400">Top Notes:</strong> {perfume.fragranceNotes.top.join(', ')}</div>
                <div><strong className="text-amber-700 dark:text-amber-400">Heart Notes:</strong> {perfume.fragranceNotes.heart.join(', ')}</div>
                <div><strong className="text-amber-700 dark:text-amber-400">Base Notes:</strong> {perfume.fragranceNotes.base.join(', ')}</div>
              </div>

              {/* Size Selector */}
              <div className="mt-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Select Bottle Flacon Volume
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {perfume.sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                        selectedSize === size
                          ? 'border-amber-600 bg-amber-500/10 text-amber-700 dark:text-amber-400 shadow-sm'
                          : 'border-stone-300 dark:border-stone-700 hover:border-stone-400 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {size} (Pkr{perfume.sizePrices[size]})
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Quantity
                </label>
                <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden bg-white dark:bg-stone-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="mt-6 space-y-2 pt-4 border-t border-stone-200 dark:border-stone-800">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addToCart(perfume, selectedSize, quantity);
                    setQuickViewPerfume(null);
                  }}
                  className="flex-1 py-3 px-4 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag — Pkr{(currentPrice * quantity).toFixed(0)}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(perfume.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    inWishlist
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'border-stone-300 dark:border-stone-700 hover:border-stone-400'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  setQuickViewPerfume(null);
                  openProductDetail(perfume.id);
                }}
                className="w-full text-center text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline py-1"
              >
                View Full Fragrance Story & Note Pyramid →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
