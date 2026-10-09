import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Trash2, ArrowRight, Tag, ShieldCheck, Sparkles, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    promoCode,
    applyPromoCode,
    setActiveTab,
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    applyPromoCode(inputCode);
    setInputCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-stone-100/70 dark:bg-stone-900/40 p-12 rounded-3xl border border-stone-200 dark:border-stone-800"
        >
          <div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif-luxury text-3xl font-light text-stone-900 dark:text-stone-100">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-md mx-auto leading-relaxed">
            Your personal fragrance wardrobe awaits. Explore our artisanal extraits and discover your next signature scent.
          </p>
          <button
            onClick={() => setActiveTab('shop')}
            className="mt-8 py-4 px-8 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-amber-600 dark:hover:bg-amber-400 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl"
          >
            Explore Haute Catalog
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-end mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Your Personal Selection
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light text-stone-900 dark:text-stone-100 mt-1">
            Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)} Items)
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-stone-400 hover:text-rose-500 transition-colors underline"
        >
          Clear Selection
        </button>
      </div>

      {/* Free Shipping Progress Bar */}
      <div className="mb-8 p-4 bg-stone-100 dark:bg-stone-900/60 rounded-2xl border border-stone-200 dark:border-stone-800">
        <div className="flex justify-between items-center text-xs font-semibold mb-2">
          {remainingForFreeShipping > 0 ? (
            <span className="text-stone-700 dark:text-stone-300">
              Add <strong className="text-amber-600 dark:text-amber-400">/Pkr{remainingForFreeShipping.toFixed(0)}</strong> more for Complimentary Express Delivery
            </span>
          ) : (
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              You've unlocked Complimentary Express Delivery & Atelier Sampler Set!
            </span>
          )}
          <span className="tabular-nums text-stone-400">{progressToFreeShipping.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-amber-600 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={`pkr{item.perfume.id}-pkr{item.selectedSize}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-5 bg-stone-100/80 dark:bg-stone-900/40 rounded-2xl border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row items-center gap-5 justify-between"
              >
                {/* Image & Details */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.perfume.images[0]}
                    alt={item.perfume.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-xl shrink-0 border border-stone-200/60 dark:border-stone-800"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      {item.perfume.brand}
                    </span>
                    <h3 className="font-serif-luxury text-lg font-medium text-stone-900 dark:text-stone-100">
                      {item.perfume.name}
                    </h3>
                    <p className="text-xs text-stone-500">
                      Volume: <strong className="text-stone-700 dark:text-stone-300">{item.selectedSize}</strong> · {item.perfume.concentration}
                    </p>
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100 mt-1 tabular-nums">
                      Pkr{item.price} each
                    </div>
                  </div>
                </div>

                {/* Quantity Stepper & Remove */}
                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-200 dark:border-stone-800">
                  <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden bg-white dark:bg-stone-950">
                    <button
                      onClick={() => updateCartQuantity(item.perfume.id, item.selectedSize, item.quantity - 1)}
                      className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold tabular-nums">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.perfume.id, item.selectedSize, item.quantity + 1)}
                      className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                      Pkr{(item.price * item.quantity).toFixed(0)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.perfume.id, item.selectedSize)}
                    className="p-2 text-stone-400 hover:text-rose-500 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-4">
          <div className="p-6 bg-stone-100/90 dark:bg-stone-900/60 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-6 sticky top-28">
            <h3 className="font-serif-luxury text-xl font-medium pb-4 border-b border-stone-200 dark:border-stone-800">
              Order Summary
            </h3>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="block text-xs font-semibold uppercase text-stone-500">
                Privilege Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="e.g. AURA10 or HAUTE20"
                  className="flex-1 p-2.5 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium uppercase focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase rounded-xl transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoCode && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Promo {promoCode} active!</span>
                </div>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-3 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">Pkr{cartSubtotal.toFixed(0)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Privilege Discount</span>
                  <span className="tabular-nums">-Pkr{cartDiscount.toFixed(0)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Atelier Express Delivery</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {cartSubtotal >= freeShippingThreshold ? 'FREE' : 'Pkr25'}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-stone-900 dark:text-stone-100 pt-3 border-t border-stone-200 dark:border-stone-800">
                <span>Total Amount</span>
                <span className="tabular-nums text-amber-700 dark:text-amber-400">
                  Pkr{(cartTotal + (cartSubtotal >= freeShippingThreshold ? 0 : 25)).toFixed(0)}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => setActiveTab('checkout')}
              className="w-full py-4 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-amber-600 dark:hover:bg-amber-400 dark:hover:text-stone-950 text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-xl transition-all"
            >
              <span>Proceed to Atelier Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Complimentary Returns within 30 Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
