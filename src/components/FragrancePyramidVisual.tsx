import React from 'react';
import { FragranceNotes } from '../types/perfume';
import { Feather, Heart, Anchor } from 'lucide-react';

export const FragrancePyramidVisual: React.FC<{ notes: FragranceNotes; name?: string }> = ({ notes, name }) => {
  return (
    <div className="w-full bg-stone-100/70 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800">
      <div className="text-center mb-6">
        <h4 className="font-serif-luxury text-2xl font-medium text-stone-900 dark:text-stone-100">
          Fragrance Pyramid {name ? `— ${name}` : ''}
        </h4>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          How this olfactive composition unfolds over 12 hours on skin
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-xl mx-auto">
        {/* Top Notes (Head) */}
        <div className="relative p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/30 transition-transform hover:scale-[1.01]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400">
              <Feather className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Top Notes (Head)
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block">
                Initial impression · Evaporates in first 15–30 mins
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {notes.top.map((note) => (
              <span
                key={note}
                className="py-1 px-3 bg-white/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 text-xs font-medium rounded-lg shadow-sm border border-stone-200/60 dark:border-stone-700/60"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Heart Notes (Middle) */}
        <div className="relative p-4 rounded-2xl bg-rose-500/10 dark:bg-rose-500/5 border border-rose-500/30 transition-transform hover:scale-[1.01]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-700 dark:text-rose-400">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                Heart / Middle Notes (Soul)
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block">
                The core personality · Emerges after 30 mins, lasts 4–6 hrs
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {notes.heart.map((note) => (
              <span
                key={note}
                className="py-1 px-3 bg-white/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 text-xs font-medium rounded-lg shadow-sm border border-stone-200/60 dark:border-stone-700/60"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Base Notes (Foundation) */}
        <div className="relative p-4 rounded-2xl bg-stone-900/10 dark:bg-stone-100/5 border border-stone-400/30 transition-transform hover:scale-[1.01]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 rounded-lg bg-stone-700/20 dark:bg-stone-300/20 text-stone-900 dark:text-stone-100">
              <Anchor className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200">
                Base Notes (Dry Down)
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block">
                Deep lasting sillage · Lingers on skin for 8–12+ hrs
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {notes.base.map((note) => (
              <span
                key={note}
                className="py-1 px-3 bg-white/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 text-xs font-medium rounded-lg shadow-sm border border-stone-200/60 dark:border-stone-700/60"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
