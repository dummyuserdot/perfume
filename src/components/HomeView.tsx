import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES_DATA, CATEGORIES } from '../data/perfumes';
import { Hero } from './Hero';
import { ProductCard } from './ProductCard';
import { FragrancePyramidVisual } from './FragrancePyramidVisual';
import { Sparkles, ArrowRight, ShieldCheck, Award, Star, Quote, Heart, Feather } from 'lucide-react';
import { motion } from 'framer-motion';

import grasseDistillationImg from '../assets/images/story_grasse_distillation_1791440900022.jpg';

export const HomeView: React.FC = () => {
  const { setActiveTab, openProductDetail } = useShop();

  const [activeCategoryTab, setActiveCategoryTab] = useState<'All' | 'BestSellers' | 'NewArrivals' | 'Offers'>('BestSellers');

  // Filtered lists for Home sections
  const bestSellers = PERFUMES_DATA.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PERFUMES_DATA.filter((p) => p.isNewArrival).slice(0, 4);
  const specialOffers = PERFUMES_DATA.filter((p) => p.discountPrice).slice(0, 4);

  const displayedProducts = 
    activeCategoryTab === 'BestSellers' ? bestSellers :
    activeCategoryTab === 'NewArrivals' ? newArrivals :
    activeCategoryTab === 'Offers' ? specialOffers :
    PERFUMES_DATA.slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Olfactive Categories Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Curated Collections
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-stone-900 dark:text-stone-100 mt-1">
            Shop by Olfactive Audience
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: 'Unisex Private Reserve',
              desc: 'Sublime balances of agarwood, amber, and Madagascar vanilla',
              cat: 'Unisex',
              img: 'src/assets/images/cloth.jpg',
            },
            {
              title: 'Women’s Floral Haute',
              desc: 'Velvety jasmine, May rose, and white tuberose bouquets',
              cat: 'Women',
              img: 'src/assets/images/cloth.jpg',
            },
            {
              title: 'Men’s Leather & Woody',
              desc: 'Distinguished saddle leather, smoked birch, and oakmoss',
              cat: 'Men',
              img: 'src/assets/images/cloth.jpg',
            },
          ].map((item) => (
            <div
              key={item.title}
              onClick={() => setActiveTab('shop')}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-900 cursor-pointer border border-stone-200 dark:border-stone-800 shadow-lg"
            >
              <img
                src={item.img}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-stone-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
                  {item.cat} Collection
                </span>
                <h3 className="font-serif-luxury text-2xl font-light">{item.title}</h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2">{item.desc}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase text-amber-400 group-hover:underline">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Tabs (Best Sellers / New / Special Offers) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200 dark:border-stone-800 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
              Handpicked Masterpieces
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-stone-900 dark:text-stone-100 mt-1">
              Featured Fragrances
            </h2>
          </div>

          {/* Interactive Filter Control Segmented Buttons */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/80 dark:bg-stone-900 rounded-xl">
            <button
              onClick={() => setActiveCategoryTab('BestSellers')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeCategoryTab === 'BestSellers'
                  ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveCategoryTab('NewArrivals')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeCategoryTab === 'NewArrivals'
                  ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveCategoryTab('Offers')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeCategoryTab === 'Offers'
                  ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Special Offers
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((perfume) => (
            <ProductCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setActiveTab('shop')}
            className="py-4 px-8 bg-stone-200 dark:bg-stone-900 text-stone-900 dark:text-stone-100 hover:bg-stone-300 dark:hover:bg-stone-800 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors border border-stone-300 dark:border-stone-700 inline-flex items-center gap-2"
          >
            <span>View Full Haute Catalog ({PERFUMES_DATA.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Atelier Story & Grasse Craftsmanship */}
      <section className="bg-stone-900 text-stone-100 dark:bg-stone-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Grasse Heritage & Alchemy
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light leading-tight">
                Crafted in Small Distillation Batches of 500 Flacons
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed font-normal">
                In our private atelier nestled in the hills of Grasse, France, master perfumers slow-macerate natural floral absolutes and aged Cambodian agarwoods for 60 full days before cold filtering into hand-faceted crystal glass flacons.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-800 text-xs">
                <div>
                  <h4 className="font-bold text-amber-400">60-Day Cold Maceration</h4>
                  <p className="text-stone-400 mt-1">Ensures smooth, uncompressed aromatic resonance</p>
                </div>
                <div>
                  <h4 className="font-bold text-amber-400">100% Pure Extraits</h4>
                  <p className="text-stone-400 mt-1">High fragrance oil concentration for 12+ hr wear</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('notes-guide')}
                  className="py-3 px-6 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase rounded-xl transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore Olfactive Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-stone-800 shadow-2xl aspect-[16/9]">
                <img
                  src={grasseDistillationImg}
                  alt="Grasse Perfumery Atelier Stills"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800';
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Connoisseur Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Connoisseur Acclaim
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-stone-900 dark:text-stone-100 mt-1">
            Words from Fragrance Collectors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: 'Nocturne Oud is quite simply the most captivating agarwood creation I have experienced in two decades of collecting.',
              author: 'Lord Julian Sterling',
              title: 'Fragrance Connoisseur & Critic',
              rating: 5,
            },
            {
              quote: 'Fleur Blanche Royal lasted on my silk gown for three full days. The jasmine quality is indistinguishable from live blooms in Grasse.',
              author: 'Baroness Camille de Valois',
              title: 'Haute Couture Stylist, Paris',
              rating: 5,
            },
            {
              quote: 'The unboxing experience alone feels like receiving a royal treasure. Customer service and sampler vials are impeccable.',
              author: 'Dr. Alistair Vance',
              title: 'Collector, London',
              rating: 5,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-stone-100/80 dark:bg-stone-900/40 rounded-3xl border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-amber-500/30 mb-2" />
                <p className="text-sm font-serif-luxury text-stone-800 dark:text-stone-200 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">{item.author}</div>
                <div className="text-[11px] text-stone-400">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
