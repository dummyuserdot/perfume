import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CustomerInfo, Order } from '../types/perfume';
import { ShieldCheck, Truck, Lock, CheckCircle2, ArrowRight, Sparkles, CreditCard, Gift, Printer, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const Checkout: React.FC = () => {
  const { cart, cartSubtotal, cartDiscount, cartTotal, placeOrder, setActiveTab } = useShop();

  const [form, setForm] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    giftMessage: '',
    paymentMethod: 'credit_card',
  });

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const shippingFee = cartSubtotal >= 150 ? 0 : 25;
  const finalTotal = cartTotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.address || !form.city) return;

    const newOrder = placeOrder(form);
    setCreatedOrder(newOrder);
  };

  // If order completed, show receipt
  if (createdOrder) {
    return (
      <div className="py-12 max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-stone-100/90 dark:bg-stone-900/60 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl text-stone-900 dark:text-stone-100"
        >
          {/* Header */}
          <div className="text-center pb-8 border-b border-stone-200 dark:border-stone-800">
            <div className="w-16 h-16 mx-auto bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
              Atelier Confirmation Receipt
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light mt-1">
              Order {createdOrder.orderNumber} Confirmed
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
              Placed on {createdOrder.createdAt} · Estimated Delivery: {createdOrder.estimatedDelivery}
            </p>
          </div>

          {/* Delivery Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 p-6 bg-stone-200/50 dark:bg-stone-950/60 rounded-2xl border border-stone-200/60 dark:border-stone-800 text-xs">
            <div>
              <span className="font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Recipient
              </span>
              <p className="font-semibold text-sm">{createdOrder.customer.fullName}</p>
              <p>{createdOrder.customer.email}</p>
              <p>{createdOrder.customer.phone}</p>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Delivery Address
              </span>
              <p className="font-semibold text-sm">{createdOrder.customer.address}</p>
              <p>{createdOrder.customer.city}, {createdOrder.customer.postalCode}</p>
              <p>{createdOrder.customer.country}</p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-4 mb-8">
            <h3 className="font-serif-luxury text-xl font-medium border-b border-stone-200 dark:border-stone-800 pb-2">
              Crafted Selection
            </h3>
            {createdOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.perfume.images[0]}
                    alt={item.perfume.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover rounded-lg shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-stone-900 dark:text-stone-100">{item.perfume.name}</h4>
                    <p className="text-stone-500">{item.selectedSize} × {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold tabular-nums text-stone-900 dark:text-stone-100">
                  Pkr{(item.price * item.quantity).toFixed(0)}
                </span>
              </div>
            ))}
          </div>

          {/* Total Breakdown */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2 text-xs">
            <div className="flex justify-between text-stone-500">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                Pkr{createdOrder.summary.subtotal.toFixed(0)}
              </span>
            </div>
            {createdOrder.summary.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount</span>
                <span className="tabular-nums">-Pkr{createdOrder.summary.discountAmount.toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-500">
              <span>Shipping Fee</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {createdOrder.summary.shippingFee === 0 ? 'FREE' : `Pkr${createdOrder.summary.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-900 dark:text-stone-100 pt-3 border-t border-stone-200 dark:border-stone-800">
              <span>Total Paid</span>
              <span className="text-amber-700 dark:text-amber-400 tabular-nums">
                Pkr{createdOrder.summary.totalAmount.toFixed(0)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 pt-6 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={() => window.print()}
              className="py-3.5 px-6 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-300 text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className="flex-1 py-3.5 px-6 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-amber-600 text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-2 shadow-xl"
            >
              <span>Continue Exploring</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-serif-luxury font-light">No Items in Bag for Checkout</h2>
        <button
          onClick={() => setActiveTab('shop')}
          className="mt-4 py-3 px-6 bg-amber-600 text-white text-xs font-bold uppercase rounded-xl"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={() => setActiveTab('cart')}
          className="flex items-center gap-2 text-xs font-semibold uppercase text-stone-500 hover:text-stone-900 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping Bag</span>
        </button>
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400 block">
          Secure Atelier Checkout
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light text-stone-900 dark:text-stone-100 mt-1">
          Express Delivery & Order Details
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Customer Form Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Personal Info */}
          <div className="p-6 bg-stone-100/80 dark:bg-stone-900/40 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-4">
            <h3 className="font-serif-luxury text-xl font-medium border-b border-stone-200 dark:border-stone-800 pb-3">
              1. Customer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  placeholder="e.g. Lady Clara Sterling"
                  className="w-full p-3 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="clara@example.com"
                  className="w-full p-3 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 019-2834"
                  className="w-full p-3 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="p-6 bg-stone-100/80 dark:bg-stone-900/40 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-4">
            <h3 className="font-serif-luxury text-xl font-medium border-b border-stone-200 dark:border-stone-800 pb-3">
              2. Atelier Shipping Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="740 Park Avenue, Apt 12B"
                  className="w-full p-3 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                  placeholder="New York"
                  className="w-full p-3 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  required
                  value={form.postalCode}
                  onChange={(e) => setForm((prev) => ({ ...prev, postalCode: e.target.value }))}
                  placeholder="10021"
                  className="w-full p-3 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">
                  Country
                </label>
                <select
                  value={form.country}
                  onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                  className="w-full p-3 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                >
                  <option value="United States">United States</option>
                  <option value="France">France</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 bg-stone-100/80 dark:bg-stone-900/40 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-4">
            <h3 className="font-serif-luxury text-xl font-medium border-b border-stone-200 dark:border-stone-800 pb-3">
              3. Payment Method
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, paymentMethod: 'credit_card' }))}
                className={`p-4 rounded-2xl border text-center text-xs font-bold transition-all ${
                  form.paymentMethod === 'credit_card'
                    ? 'border-amber-600 bg-amber-500/10 text-amber-700 dark:text-amber-400'
                    : 'border-stone-300 dark:border-stone-700 text-stone-600'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1" />
                <span>Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, paymentMethod: 'apple_pay' }))}
                className={`p-4 rounded-2xl border text-center text-xs font-bold transition-all ${
                  form.paymentMethod === 'apple_pay'
                    ? 'border-amber-600 bg-amber-500/10 text-amber-700 dark:text-amber-400'
                    : 'border-stone-300 dark:border-stone-700 text-stone-600'
                }`}
              >
                <Sparkles className="w-5 h-5 mx-auto mb-1" />
                <span>Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, paymentMethod: 'cod' }))}
                className={`p-4 rounded-2xl border text-center text-xs font-bold transition-all ${
                  form.paymentMethod === 'cod'
                    ? 'border-amber-600 bg-amber-500/10 text-amber-700 dark:text-amber-400'
                    : 'border-stone-300 dark:border-stone-700 text-stone-600'
                }`}
              >
                <Truck className="w-5 h-5 mx-auto mb-1" />
                <span>Cash On Delivery</span>
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary Right Column */}
        <div className="lg:col-span-5">
          <div className="p-6 bg-stone-100/90 dark:bg-stone-900/60 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-6 sticky top-28">
            <h3 className="font-serif-luxury text-xl font-medium pb-4 border-b border-stone-200 dark:border-stone-800">
              Order Summary ({cart.length} Fragrances)
            </h3>

            {/* Itemized List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.perfume.images[0]}
                      alt={item.perfume.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover rounded-lg shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    <div>
                      <h4 className="font-semibold text-stone-900 dark:text-stone-100 line-clamp-1">{item.perfume.name}</h4>
                      <p className="text-stone-500">{item.selectedSize} × {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold tabular-nums text-stone-900 dark:text-stone-100">
                    ${(item.price * item.quantity).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">Pkr{cartSubtotal.toFixed(0)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Privilege Discount</span>
                  <span className="tabular-nums">-Pkr{cartDiscount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-500">
                <span>Atelier Shipping</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {shippingFee === 0 ? 'FREE' : `Pkr${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 dark:text-stone-100 pt-3 border-t border-stone-200 dark:border-stone-800">
                <span>Total Due</span>
                <span className="text-amber-700 dark:text-amber-400 tabular-nums">
                  Pkr{finalTotal.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              className="w-full py-4 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-amber-600 dark:hover:bg-amber-400 dark:hover:text-stone-950 text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-xl transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Place Order — Pkr{finalTotal.toFixed(0)}</span>
            </button>

            <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>256-bit Encrypted Checkout · LocalStorage Order Persisted</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
