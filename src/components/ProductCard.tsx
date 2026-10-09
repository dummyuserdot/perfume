import React from 'react';
import { Perfume } from '../types/perfume';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductCard: React.FC<{ perfume: Perfume }> = ({ perfume }) => {
  const { openProductDetail, setQuickViewPerfume, addToCart, toggleWishlist, isInWishlist } = useShop();
  const inWishlist = isInWishlist(perfume.id);

  const displayPrice = perfume.discountPrice || perfume.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col bg-stone-100/60 dark:bg-stone-900/40 rounded-2xl overflow-hidden border border-stone-200/60 dark:border-stone-800/60 hover:border-amber-500/40 transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full bg-stone-200/50 dark:bg-stone-950 overflow-hidden cursor-pointer" onClick={() => openProductDetail(perfume.id)}>
        <img
          src={perfume.images[0]}
          alt={perfume.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            const target = e.currentTarget;
            if (perfume.images[1] && target.src !== perfume.images[1]) {
              target.src = perfume.images[1];
            } else {
              target.src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800';
            }
          }}
        />

        {/* Badges - Subtle text tag (Max 1) */}
        {perfume.isBestSeller ? (
          <span className="absolute top-3 left-3 bg-amber-600/90 text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded backdrop-blur-sm shadow-md">
            Best Seller
          </span>
        ) : perfume.isNewArrival ? (
          <span className="absolute top-3 left-3 bg-stone-900/90 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded backdrop-blur-sm shadow-md">
            New Arrival
          </span>
        ) : perfume.discountPrice ? (
          <span className="absolute top-3 left-3 bg-rose-700/90 text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded backdrop-blur-sm shadow-md">
            Special Offer
          </span>
        ) : null}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(perfume.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            inWishlist
              ? 'bg-rose-500 text-white shadow-lg'
              : 'bg-white/70 dark:bg-stone-900/70 text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-900'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Trigger overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewPerfume(perfume);
            }}
            className="flex items-center gap-1.5 py-2 px-3 bg-white/90 text-stone-900 hover:bg-white text-xs font-semibold rounded-lg shadow-md transition-transform active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(perfume, '50ml', 1);
            }}
            className="flex items-center gap-1.5 py-2 px-3 bg-amber-600 text-white hover:bg-amber-500 text-xs font-semibold rounded-lg shadow-md transition-transform active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">
            <span className="uppercase tracking-wider">{perfume.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{perfume.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-500 dark:text-stone-400">{perfume.fragranceFamily}</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => openProductDetail(perfume.id)}
            className="font-serif-luxury text-xl font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
          >
            {perfume.name}
          </h3>

          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
            {perfume.subtitle}
          </p>
        </div>

        {/* Notes preview pill-free text */}
        <div className="text-[11px] text-stone-600 dark:text-stone-400 bg-stone-200/50 dark:bg-stone-950/60 p-2 rounded-lg border border-stone-200/40 dark:border-stone-800/40">
          <span className="font-semibold text-stone-700 dark:text-stone-300">Top Notes: </span>
          {perfume.fragranceNotes.top.join(', ')}
        </div>

        {/* Rating and Price Row */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 dark:border-stone-800/60 mt-1">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-semibold tabular-nums text-stone-800 dark:text-stone-200">
              {perfume.rating}
            </span>
            <span className="text-[11px] text-stone-400">({perfume.reviewsCount})</span>
          </div>

          <div className="text-right">
            {perfume.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  Pkr{perfume.price}
                </span>
                <span className="text-base font-bold text-amber-700 dark:text-amber-400 tabular-nums">
                  Pkr{perfume.discountPrice}
                </span>
              </div>
            ) : (
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                Pkr{displayPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
