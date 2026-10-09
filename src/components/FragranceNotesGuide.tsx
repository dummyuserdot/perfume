import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FRAGRANCE_FAMILIES } from '../data/perfumes';
import { BookOpen, Sparkles, Droplets, Feather, Heart, Anchor, Sun, Wind, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const FragranceNotesGuide: React.FC = () => {
  const { setActiveTab } = useShop();

  const familyDetails = [
    {
      family: 'Woody Oud',
      icon: Anchor,
      desc: 'Dark, earthy, and opulent compositions featuring Cambodian agarwood, cedar, smoked sandalwood, and Haitian vetiver.',
      idealFor: 'Evening galas, autumn/winter wear, charismatic statement occasions.',
      examples: 'Nocturne Oud, Santal Séraphique',
    },
    {
      family: 'Floral Oriental',
      icon: Heart,
      desc: 'Luminous white petals of Grasse jasmine and tuberose draped in warm amber resin, cashmere, and bourbon vanilla.',
      idealFor: 'Romantic dates, spring garden parties, daily luxury elegance.',
      examples: 'Fleur Blanche Royal, Velours de Rose',
    },
    {
      family: 'Amber Warm',
      icon: Sun,
      desc: 'Golden solar resins, cinnamon bark, labdanum, and saffron creating an intoxicating, sun-drenched olfactory trail.',
      idealFor: 'Sunset cruises, late afternoon soirees, cozy winter gatherings.',
      examples: 'Soleil d’Ambre',
    },
    {
      family: 'Fresh Citrus',
      icon: Wind,
      desc: 'Vibrant splashes of Amalfi lemon, green neroli, coastal sage, and crushed mint sea salt.',
      idealFor: 'Summer mornings, Mediterranean getaways, active outdoor days.',
      examples: 'Citrus Riviera',
    },
    {
      family: 'Gourmand Musk',
      icon: Sparkles,
      desc: 'Addictive Madagascar vanilla bean, salted caramel, bitter almond milk, and white musks.',
      idealFor: 'Cozy evenings, skin-to-skin intimacy, lingering comforting allure.',
      examples: 'Vanille Vanité',
    },
    {
      family: 'Chypre Leather',
      icon: Compass,
      desc: 'Supple Tuscan saddle leather, oakmoss, crisp green apple, and smoked birch wood.',
      idealFor: 'Executive boardrooms, tailored suits, timeless authority.',
      examples: 'Cuir Impérial',
    },
  ];

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Title */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Haute Perfumery Education</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light text-stone-900 dark:text-stone-100">
          The Art of Olfactive Architecture
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-xl mx-auto leading-relaxed">
          Understanding the 3-tiered fragrance pyramid and selecting the accord that reflects your personal presence.
        </p>
      </div>

      {/* Pyramid Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 bg-amber-500/10 dark:bg-amber-500/5 rounded-3xl border border-amber-500/30 text-stone-900 dark:text-stone-100">
          <div className="w-10 h-10 bg-amber-500/20 text-amber-600 rounded-xl flex items-center justify-center mb-4">
            <Feather className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
            01. Top Notes (The Opening)
          </span>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Light, volatile citrus and herb molecules that greet the senses immediately upon application. They dissipate after 15 to 30 minutes, creating the initial invitation.
          </p>
        </div>

        <div className="p-6 bg-rose-500/10 dark:bg-rose-500/5 rounded-3xl border border-rose-500/30 text-stone-900 dark:text-stone-100">
          <div className="w-10 h-10 bg-rose-500/20 text-rose-600 rounded-xl flex items-center justify-center mb-4">
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 block mb-1">
            02. Heart Notes (The Soul)
          </span>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            The core theme of the perfume. Blossoms, spices, and floral absolutes emerge after the top notes soften, lingering for 4 to 6 hours.
          </p>
        </div>

        <div className="p-6 bg-stone-900/10 dark:bg-stone-100/5 rounded-3xl border border-stone-300/30 text-stone-900 dark:text-stone-100">
          <div className="w-10 h-10 bg-stone-700/20 dark:bg-stone-300/20 text-stone-800 dark:text-stone-200 rounded-xl flex items-center justify-center mb-4">
            <Anchor className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 block mb-1">
            03. Base Notes (The Dry Down)
          </span>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Heavy, resinous woods, musks, and ouds that bind to skin lipids. These provide lingering sillage and stay present for 8 to 12+ hours.
          </p>
        </div>
      </div>

      {/* Olfactive Families Grid */}
      <div className="mb-16">
        <h2 className="font-serif-luxury text-3xl font-light text-center mb-8">
          The 6 Major Olfactive Accord Families
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyDetails.map((f) => {
            const IconComp = f.icon;
            return (
              <div
                key={f.family}
                className="p-6 bg-stone-100/80 dark:bg-stone-900/40 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-luxury text-xl font-medium text-stone-900 dark:text-stone-100">
                    {f.family}
                  </h3>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {f.desc}
                </p>
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 space-y-1">
                  <div><strong className="text-stone-700 dark:text-stone-300">Best Occasions:</strong> {f.idealFor}</div>
                  <div><strong className="text-amber-700 dark:text-amber-400">Creation Examples:</strong> {f.examples}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sillage Application Tips */}
      <div className="p-8 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 dark:text-amber-700 block mb-1">
            Master Perfumer Tip
          </span>
          <h3 className="font-serif-luxury text-2xl font-light">
            How to Apply Extrait de Parfum for Maximum Sillage
          </h3>
          <p className="text-xs text-stone-300 dark:text-stone-700 mt-2 max-w-xl leading-relaxed">
            Apply 1-2 sprays directly onto warm pulse points: wrist insides, behind earlobes, and the base of the neck. Never rub wrists together, as friction crushes delicate top note molecules.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('shop')}
          className="py-4 px-6 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase rounded-xl shrink-0 transition-colors"
        >
          Explore Collections
        </button>
      </div>
    </div>
  );
};
