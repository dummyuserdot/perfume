import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProductListing } from './components/ProductListing';
import { ProductDetail } from './components/ProductDetail';
import { CartView } from './components/CartView';
import { Wishlist } from './components/Wishlist';
import { Checkout } from './components/Checkout';
import { OrderHistory } from './components/OrderHistory';
import { ScentQuizModal } from './components/ScentQuizModal';
import { FragranceNotesGuide } from './components/FragranceNotesGuide';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/Toast';

const AppContent: React.FC = () => {
  const { activeTab, selectedPerfumeId } = useShop();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0D0C0B] text-[#1C1917] dark:text-[#E7E5E4] transition-colors duration-300 font-sans">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Global Navigation Bar */}
      <Header onSearchOpen={() => setSearchOpen(true)} />

      {/* Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <QuickViewModal />

      {/* Main View Router */}
      <main className="flex-1 pb-16 lg:pb-0">
        {selectedPerfumeId ? (
          <ProductDetail />
        ) : activeTab === 'home' ? (
          <HomeView />
        ) : activeTab === 'shop' ? (
          <ProductListing />
        ) : activeTab === 'cart' ? (
          <CartView />
        ) : activeTab === 'wishlist' ? (
          <Wishlist />
        ) : activeTab === 'checkout' ? (
          <Checkout />
        ) : activeTab === 'orders' ? (
          <OrderHistory />
        ) : activeTab === 'quiz' ? (
          <ScentQuizModal />
        ) : activeTab === 'notes-guide' ? (
          <FragranceNotesGuide />
        ) : (
          <HomeView />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
