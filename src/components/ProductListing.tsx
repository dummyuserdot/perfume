import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES_DATA, BRANDS, CATEGORIES, FRAGRANCE_FAMILIES } from '../data/perfumes';
import { ProductCard } from './ProductCard';
import { FilterState, FragranceCategory, FragranceFamily } from '../types/perfume';
import { Filter, SlidersHorizontal, Search, RotateCcw, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductListing: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'All',
    brand: 'All',
    fragranceFamily: 'All',
    minPrice: 0,
    maxPrice: 600,
    minRating: 0,
    sortBy: 'featured',
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PERFUMES_DATA.filter((product) => {
      // Search
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesSub = product.subtitle.toLowerCase().includes(q);
        const matchesNotes = 
          product.fragranceNotes.top.some((n) => n.toLowerCase().includes(q)) ||
          product.fragranceNotes.heart.some((n) => n.toLowerCase().includes(q)) ||
          product.fragranceNotes.base.some((n) => n.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesSub && !matchesNotes) return false;
      }

      // Category
      if (filters.category !== 'All' && product.category !== filters.category) return false;

      // Brand
      if (filters.brand !== 'All' && product.brand !== filters.brand) return false;

      // Family
      if (filters.fragranceFamily !== 'All' && product.fragranceFamily !== filters.fragranceFamily) return false;

      // Price
      const price = product.discountPrice || product.price;
      if (price < filters.minPrice || price > filters.maxPrice) return false;

      // Rating
      if (product.rating < filters.minRating) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (filters.sortBy === 'price-asc') return priceA - priceB;
      if (filters.sortBy === 'price-desc') return priceB - priceA;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'All',
      brand: 'All',
      fragranceFamily: 'All',
      minPrice: 0,
      maxPrice: 600,
      minRating: 0,
      sortBy: 'featured',
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.category !== 'All' ||
    filters.brand !== 'All' ||
    filters.fragranceFamily !== 'All' ||
    filters.maxPrice < 600 ||
    filters.minRating > 0;

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Artisanal Collections
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-stone-900 dark:text-stone-100 mt-1">
            Haute Parfumerie Catalog
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 py-2.5 px-4 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{mobileFilterOpen ? 'Hide Filters' : 'Filter Catalog'}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-stone-500 font-medium">Sort By:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
              className="py-2.5 px-3 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-semibold text-stone-800 dark:text-stone-200 focus:outline-none focus:border-amber-500"
            >
              <option value="featured">Featured Masterpieces</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters - Desktop & Mobile Drawer */}
        <aside
          className={`lg:block ${
            mobileFilterOpen ? 'block' : 'hidden'
          } bg-stone-100/80 dark:bg-stone-900/40 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 h-fit space-y-6`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              <Filter className="w-4 h-4 text-amber-500" />
              <span>Filter Catalog</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Keyword / Note
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Search notes or names..."
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Olfactive Audience
            </label>
            <div className="flex flex-col gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters((prev) => ({ ...prev, category: cat as any }))}
                  className={`text-left text-xs font-medium py-1.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    filters.category === cat
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{cat} Fragrances</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fragrance Family Filter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Fragrance Accord / Family
            </label>
            <div className="flex flex-col gap-1.5">
              {FRAGRANCE_FAMILIES.map((fam) => (
                <button
                  key={fam}
                  onClick={() => setFilters((prev) => ({ ...prev, fragranceFamily: fam as any }))}
                  className={`text-left text-xs font-medium py-1.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    filters.fragranceFamily === fam
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{fam}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand Multi-Filter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Perfume House / Brand
            </label>
            <select
              value={filters.brand}
              onChange={(e) => setFilters((prev) => ({ ...prev, brand: e.target.value }))}
              className="w-full py-2 px-3 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-800 dark:text-stone-200 focus:outline-none focus:border-amber-500"
            >
              {BRANDS.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Max Price
              </label>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                ${filters.maxPrice}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="600"
              step="10"
              value={filters.maxPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full accent-amber-600"
            />
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Minimum Rating
            </label>
            <div className="grid grid-cols-4 gap-1">
              {[0, 4.5, 4.8, 4.9].map((star) => (
                <button
                  key={star}
                  onClick={() => setFilters((prev) => ({ ...prev, minRating: star }))}
                  className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg border text-center transition-colors ${
                    filters.minRating === star
                      ? 'border-amber-600 bg-amber-500/10 text-amber-700 dark:text-amber-400'
                      : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  {star === 0 ? 'All' : `${star}+ ★`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Product Grid */}
        <main className="lg:col-span-3">
          {/* Active Filters Tag Bar */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-stone-200/50 dark:bg-stone-900/40 rounded-xl border border-stone-200 dark:border-stone-800 text-xs">
              <span className="font-semibold text-stone-500">Active Filters:</span>
              {filters.category !== 'All' && (
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium rounded-md">
                  Category: {filters.category}
                </span>
              )}
              {filters.brand !== 'All' && (
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium rounded-md">
                  Brand: {filters.brand}
                </span>
              )}
              {filters.fragranceFamily !== 'All' && (
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium rounded-md">
                  Family: {filters.fragranceFamily}
                </span>
              )}
              {filters.maxPrice < 600 && (
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium rounded-md">
                  Under ${filters.maxPrice}
                </span>
              )}
              <button
                onClick={resetFilters}
                className="ml-auto text-amber-700 dark:text-amber-400 hover:underline font-semibold"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="mb-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Showing {filteredProducts.length} Haute Fragrances
          </div>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 px-4 bg-stone-100/60 dark:bg-stone-900/40 rounded-3xl border border-stone-200 dark:border-stone-800">
              <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-4 opacity-50" />
              <h3 className="font-serif-luxury text-2xl font-medium text-stone-900 dark:text-stone-100">
                No Perfumes Match Selected Filters
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 max-w-sm mx-auto">
                Try widening your price limit or clearing specific fragrance families.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 py-3 px-6 bg-amber-600 text-white text-xs font-bold uppercase rounded-xl hover:bg-amber-500 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((perfume) => (
                <ProductCard key={perfume.id} perfume={perfume} />
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};
