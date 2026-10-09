import React from 'react';
import { useShop } from '../context/ShopContext';
import heroImg from '../assets/images/hero_perfume_atelier_1791440846408.jpg';
import { Sparkles, ArrowRight, ShieldCheck, Award, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const { setActiveTab } = useShop();

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Quiet Unboxed Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-700 dark:text-amber-400 uppercase mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grasse & Paris Haute Parfumerie</span>
              <span aria-hidden="true">·</span>
              <span>2026 Private Reserve</span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light text-stone-900 dark:text-stone-100 tracking-tight leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Immerse in the Alchemy of Extraordinary Scent
            </motion.h1>

            {/* Body Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-stone-600 dark:text-stone-300 font-normal leading-relaxed max-w-2xl"
            >
              Artisanal Extraits de Parfum distilled from rare natural botanicals, wild agarwoods, and hand-picked Grasse petals. Crafted for those who wear fragrance as a personal signature.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => setActiveTab('shop')}
                className="w-full sm:w-auto py-4 px-8 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-amber-600 dark:hover:bg-amber-400 dark:hover:text-stone-950 text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 shadow-xl transition-all duration-300 transform active:scale-98"
              >
                <span>Explore Haute Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full sm:w-auto py-4 px-6 bg-stone-200/80 dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-800 border border-stone-300/80 dark:border-stone-700 text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Take Scent Finder Quiz</span>
              </button>
            </motion.div>

            {/* Claim-to-Proof Adjacency Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-stone-300/60 dark:border-stone-800/80 grid grid-cols-3 gap-6 text-stone-700 dark:text-stone-300 w-full"
            >
              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif-luxury text-stone-900 dark:text-stone-100 tabular-nums">
                  100%
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                  Natural Extraits
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif-luxury text-stone-900 dark:text-stone-100 tabular-nums">
                  12+ Hrs
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                  Sillage Longevity
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif-luxury text-stone-900 dark:text-stone-100 tabular-nums">
                  4.9 / 5
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                  Connoisseur Rating
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Visual Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 dark:border-stone-800 aspect-[16/9] lg:aspect-[4/5] bg-stone-900">
              <img
                src={heroImg}
                alt="Éther & Aura Haute Parfumerie Bottle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800';
                }}
              />
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

              {/* Floating Featured Fragrance Callout */}
              <div className="absolute bottom-6 left-6 right-6 bg-stone-950/85 backdrop-blur-md p-4 rounded-2xl border border-stone-800 text-stone-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider block">
                    Featured Masterpiece
                  </span>
                  <h4 className="font-serif-luxury text-lg font-medium text-white">
                    Nocturne Oud Extrait
                  </h4>
                  <p className="text-xs text-stone-400">
                    Cambodian Oud, Smoked Honey & Leather
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('shop')}
                  className="py-2 px-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase rounded-lg shrink-0 transition-colors"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
