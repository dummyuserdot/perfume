import React, { createContext, useContext, useState, useEffect } from 'react';
import { Perfume, CartItem, Order, CustomerInfo, PerfumeSize } from '../types/perfume';
import { PERFUMES_DATA } from '../data/perfumes';

interface Toast {
  id: number;
  message: string;
  type?: 'success' | 'info';
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[]; // Perfume IDs
  orders: Order[];
  recentlyViewed: string[];
  theme: 'light' | 'dark';
  activeTab: 'home' | 'shop' | 'cart' | 'wishlist' | 'checkout' | 'orders' | 'quiz' | 'notes-guide';
  selectedPerfumeId: string | null;
  quickViewPerfume: Perfume | null;
  toasts: Toast[];
  
  // Navigation & View Actions
  setActiveTab: (tab: 'home' | 'shop' | 'cart' | 'wishlist' | 'checkout' | 'orders' | 'quiz' | 'notes-guide') => void;
  openProductDetail: (id: string) => void;
  closeProductDetail: () => void;
  setQuickViewPerfume: (perfume: Perfume | null) => void;
  
  // Cart Actions
  addToCart: (perfume: Perfume, size: PerfumeSize, quantity?: number) => void;
  removeFromCart: (perfumeId: string, size: PerfumeSize) => void;
  updateCartQuantity: (perfumeId: string, size: PerfumeSize, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;

  // Wishlist Actions
  toggleWishlist: (perfumeId: string) => void;
  isInWishlist: (perfumeId: string) => boolean;
  moveWishlistToCart: (perfume: Perfume) => void;
  clearWishlist: () => void;

  // Order Actions
  placeOrder: (customerInfo: CustomerInfo) => Order;
  
  // Preferences
  toggleTheme: () => void;
  addToast: (message: string, type?: 'success' | 'info') => void;
  removeToast: (id: number) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const LOCAL_KEYS = {
  CART: 'ether_aura_cart_v1',
  WISHLIST: 'ether_aura_wishlist_v1',
  ORDERS: 'ether_aura_orders_v1',
  THEME: 'ether_aura_theme_v1',
  RECENT: 'ether_aura_recent_v1',
  PROMO: 'ether_aura_promo_v1',
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state initialization
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(LOCAL_KEYS.THEME);
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // High-end dark aesthetic default
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recently Viewed state
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_KEYS.RECENT);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active view navigation
  const [activeTab, setActiveTabState] = useState<'home' | 'shop' | 'cart' | 'wishlist' | 'checkout' | 'orders' | 'quiz' | 'notes-guide'>('home');
  const [selectedPerfumeId, setSelectedPerfumeId] = useState<string | null>(null);
  const [quickViewPerfume, setQuickViewPerfume] = useState<Perfume | null>(null);
  
  // Promo code state
  const [promoCode, setPromoCode] = useState<string>(() => {
    return localStorage.getItem(LOCAL_KEYS.PROMO) || '';
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync theme class to document elem
  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.THEME, theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.RECENT, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS.PROMO, promoCode);
  }, [promoCode]);

  // Toast handler
  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // View navigation helper
  const setActiveTab = (tab: typeof activeTab) => {
    setActiveTabState(tab);
    setSelectedPerfumeId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProductDetail = () => {
    setSelectedPerfumeId(null);
  };

  const openProductDetail = (id: string) => {
    setSelectedPerfumeId(id);
    setQuickViewPerfume(null);
    // Add to recently viewed
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [id, ...filtered].slice(0, 8);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart actions
  const addToCart = (perfume: Perfume, size: PerfumeSize, quantity: number = 1) => {
    const unitPrice = perfume.sizePrices[size] || perfume.price;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.perfume.id === perfume.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { perfume, selectedSize: size, price: unitPrice, quantity }];
      }
    });

    addToast(`Added ${quantity}x ${perfume.name} (${size}) to your Shopping Bag`);
  };

  const removeFromCart = (perfumeId: string, size: PerfumeSize) => {
    setCart((prev) => prev.filter((item) => !(item.perfume.id === perfumeId && item.selectedSize === size)));
    addToast('Item removed from Shopping Bag', 'info');
  };

  const updateCartQuantity = (perfumeId: string, size: PerfumeSize, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(perfumeId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.perfume.id === perfumeId && item.selectedSize === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  let cartDiscount = 0;
  if (promoCode.toUpperCase() === 'AURA10') {
    cartDiscount = cartSubtotal * 0.10; // 10% discount
  } else if (promoCode.toUpperCase() === 'HAUTE20') {
    cartDiscount = cartSubtotal * 0.20; // 20% VIP discount
  }

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AURA10' || clean === 'HAUTE20') {
      setPromoCode(clean);
      addToast(`Promo code ${clean} applied successfully!`);
      return true;
    } else {
      addToast('Invalid promo code. Try AURA10 or HAUTE20', 'info');
      return false;
    }
  };

  // Wishlist actions
  const toggleWishlist = (perfumeId: string) => {
    const perfume = PERFUMES_DATA.find((p) => p.id === perfumeId);
    setWishlist((prev) => {
      const exists = prev.includes(perfumeId);
      if (exists) {
        addToast(`Removed ${perfume?.name || 'Item'} from Wishlist`, 'info');
        return prev.filter((id) => id !== perfumeId);
      } else {
        addToast(`Saved ${perfume?.name || 'Item'} to Wishlist`);
        return [...prev, perfumeId];
      }
    });
  };

  const isInWishlist = (perfumeId: string) => wishlist.includes(perfumeId);

  const moveWishlistToCart = (perfume: Perfume) => {
    addToCart(perfume, '50ml', 1);
    setWishlist((prev) => prev.filter((id) => id !== perfume.id));
  };

  const clearWishlist = () => {
    setWishlist([]);
    addToast('Wishlist cleared', 'info');
  };

  // Place order handler
  const placeOrder = (customerInfo: CustomerInfo): Order => {
    const orderNumber = `EA-${Math.floor(100000 + Math.random() * 900000)}`;
    const shippingFee = cartSubtotal >= 150 ? 0 : 25;
    const totalAmount = cartTotal + shippingFee;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      items: [...cart],
      customer: customerInfo,
      summary: {
        subtotal: cartSubtotal,
        discountAmount: cartDiscount,
        promoCodeUsed: promoCode || undefined,
        shippingFee,
        totalAmount,
      },
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Confirmed',
      estimatedDelivery: '3 - 5 Atelier Working Days',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setPromoCode('');
    addToast(`Order ${orderNumber} placed successfully!`);
    return newOrder;
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        recentlyViewed,
        theme,
        activeTab,
        selectedPerfumeId,
        quickViewPerfume,
        toasts,
        
        setActiveTab,
        openProductDetail,
        closeProductDetail,
        setQuickViewPerfume,
        
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        promoCode,
        applyPromoCode,

        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        clearWishlist,

        placeOrder,
        toggleTheme,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
