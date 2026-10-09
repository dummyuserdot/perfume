import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Sun, Moon, Search, Sparkles, BookOpen, Menu, X, Package, Home, Grid, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC<{ onSearchOpen: () => void }> = ({ onSearchOpen }) => {
  const { cart, wishlist, theme, toggleTheme, activeTab, setActiveTab, orders } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNav = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 dark:bg-[#0D0C0B]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-300">
        {/* Top Announcement Bar */}
        <div className="bg-stone-900 text-stone-200 dark:bg-stone-950 dark:text-stone-300 text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide">
          <span className="hidden sm:inline">Complimentary Express Delivery & Atelier Sampler Set on all orders over Pkr150</span>
          <span className="sm:hidden">Complimentary Express Delivery on orders over Pkr150</span>
        </div>

        {/* Main Header Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          
          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-stone-800 dark:text-stone-200 hover:text-amber-600 focus:outline-none shrink-0"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Wordmark */}
          <button
            onClick={() => handleNav('home')}
            className="text-xl sm:text-3xl font-serif-luxury tracking-widest text-stone-900 dark:text-stone-100 hover:opacity-90 transition-opacity text-center lg:text-left uppercase font-medium shrink-0"
          >
            ÉTHER & AURA
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-300">
            <button
              onClick={() => handleNav('home')}
              className={`transition-colors hover:text-amber-700 dark:hover:text-amber-400 ${
                activeTab === 'home' ? 'text-amber-700 dark:text-amber-400 font-semibold border-b-2 border-amber-600 pb-0.5' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('shop')}
              className={`transition-colors hover:text-amber-700 dark:hover:text-amber-400 ${
                activeTab === 'shop' ? 'text-amber-700 dark:text-amber-400 font-semibold border-b-2 border-amber-600 pb-0.5' : ''
              }`}
            >
              Haute Catalog
            </button>
            <button
              onClick={() => handleNav('quiz')}
              className={`flex items-center gap-1.5 transition-colors hover:text-amber-700 dark:hover:text-amber-400 ${
                activeTab === 'quiz' ? 'text-amber-700 dark:text-amber-400 font-semibold border-b-2 border-amber-600 pb-0.5' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Scent Profile Quiz</span>
            </button>
            <button
              onClick={() => handleNav('notes-guide')}
              className={`flex items-center gap-1.5 transition-colors hover:text-amber-700 dark:hover:text-amber-400 ${
                activeTab === 'notes-guide' ? 'text-amber-700 dark:text-amber-400 font-semibold border-b-2 border-amber-600 pb-0.5' : ''
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>Fragrance Pyramid Guide</span>
            </button>
            <button
              onClick={() => handleNav('orders')}
              className={`flex items-center gap-1.5 transition-colors hover:text-amber-700 dark:hover:text-amber-400 ${
                activeTab === 'orders' ? 'text-amber-700 dark:text-amber-400 font-semibold border-b-2 border-amber-600 pb-0.5' : ''
              }`}
            >
              <Package className="w-3.5 h-3.5 text-amber-500" />
              <span>My Orders {orders.length > 0 ? `(${orders.length})` : ''}</span>
            </button>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            {/* Quick Search */}
            <button
              onClick={onSearchOpen}
              className="p-2 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              title="Search fragrances"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle (Desktop & Tablet) */}
            <button
              onClick={toggleTheme}
              className="hidden sm:block p-2 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-700" />}
            </button>

            {/* Wishlist (Desktop & Tablet) */}
            <button
              onClick={() => handleNav('wishlist')}
              className="hidden sm:block relative p-2 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => handleNav('cart')}
              className="relative flex items-center gap-2 py-2 px-3 sm:px-4 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white text-xs font-semibold tracking-wider rounded-xl transition-colors whitespace-nowrap shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-amber-500 dark:text-amber-600" />
              <span className="hidden sm:inline">BAG</span>
              {totalCartItems > 0 && (
                <span className="bg-amber-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* App-Style Slide-Over Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-4/5 max-w-sm h-full bg-[#FAF8F5] dark:bg-[#0D0C0B] text-stone-900 dark:text-stone-100 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-r border-stone-200 dark:border-stone-800"
            >
              {/* Drawer Top Row */}
              <div className="p-6 border-b border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
                    Haute Parfumerie
                  </span>
                  <span className="font-serif-luxury text-xl font-medium tracking-wider">
                    ÉTHER & AURA
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-white rounded-full bg-stone-200/60 dark:bg-stone-900"
                  aria-label="Close Navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Quick Search Trigger */}
              <div className="px-6 pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSearchOpen();
                  }}
                  className="w-full py-3 px-4 bg-stone-200/60 dark:bg-stone-900 rounded-xl text-xs font-medium text-stone-500 dark:text-stone-400 flex items-center justify-between border border-stone-300/40 dark:border-stone-800"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-amber-500" />
                    <span>Search notes or perfumes...</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="p-6 space-y-2 flex-1">
                <button
                  onClick={() => handleNav('home')}
                  className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                    activeTab === 'home'
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                      : 'hover:bg-stone-200/60 dark:hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-amber-500" />
                    <span>Home</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => handleNav('shop')}
                  className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                    activeTab === 'shop'
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                      : 'hover:bg-stone-200/60 dark:hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Grid className="w-4 h-4 text-amber-500" />
                    <span>Haute Catalog</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => handleNav('quiz')}
                  className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                    activeTab === 'quiz'
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                      : 'hover:bg-stone-200/60 dark:hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Scent Profile Quiz</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => handleNav('notes-guide')}
                  className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                    activeTab === 'notes-guide'
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                      : 'hover:bg-stone-200/60 dark:hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <span>Fragrance Pyramid Guide</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => handleNav('wishlist')}
                  className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                    activeTab === 'wishlist'
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                      : 'hover:bg-stone-200/60 dark:hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-amber-500" />
                    <span>Wishlist ({wishlistCount})</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => handleNav('orders')}
                  className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                      : 'hover:bg-stone-200/60 dark:hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-amber-500" />
                    <span>My Orders ({orders.length})</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              </div>

              {/* Drawer Bottom Controls */}
              <div className="p-6 border-t border-stone-200/80 dark:border-stone-800/80 space-y-4">
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                    Theme Mode
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="py-2 px-3 rounded-xl bg-stone-200 dark:bg-stone-900 text-xs font-bold flex items-center gap-2 text-stone-800 dark:text-stone-200"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="w-4 h-4 text-amber-400" />
                        <span>Light</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 text-stone-700" />
                        <span>Dark</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-stone-400 text-center pt-2">
                  Atelier Grasse & Paris · 100% Authentic Extraits
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sleek Fixed Mobile Bottom Dock (App-Style Navigation) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#0D0C0B]/95 border-t border-stone-200/80 dark:border-stone-800/80 py-2 px-4 flex justify-around items-center backdrop-blur-md transition-colors">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-medium transition-colors ${
            activeTab === 'home' ? 'text-amber-700 dark:text-amber-400 font-bold' : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('shop')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-medium transition-colors ${
            activeTab === 'shop' ? 'text-amber-700 dark:text-amber-400 font-bold' : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span>Catalog</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-medium transition-colors ${
            activeTab === 'quiz' ? 'text-amber-700 dark:text-amber-400 font-bold' : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`relative flex flex-col items-center gap-1 p-1 text-[10px] font-medium transition-colors ${
            activeTab === 'wishlist' ? 'text-amber-700 dark:text-amber-400 font-bold' : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>Saved</span>
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 bg-amber-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('cart')}
          className={`relative flex flex-col items-center gap-1 p-1 text-[10px] font-medium transition-colors ${
            activeTab === 'cart' ? 'text-amber-700 dark:text-amber-400 font-bold' : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Bag</span>
          {totalCartItems > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 bg-amber-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </button>
      </nav>
    </>
  );
};
