import React from 'react';
import { useShop } from '../context/ShopContext';
import { Package, Clock, CheckCircle, Truck, ArrowRight, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

export const OrderHistory: React.FC = () => {
  const { orders, setActiveTab, openProductDetail } = useShop();

  if (orders.length === 0) {
    return (
      <div className="py-20 max-w-2xl mx-auto px-4 text-center">
        <div className="bg-stone-100/70 dark:bg-stone-900/40 p-12 rounded-3xl border border-stone-200 dark:border-stone-800">
          <Package className="w-12 h-12 text-stone-400 mx-auto mb-4" />
          <h2 className="font-serif-luxury text-3xl font-light text-stone-900 dark:text-stone-100">
            No Previous Orders Found
          </h2>
          <p className="text-sm text-stone-500 mt-2 max-w-md mx-auto">
            Once you place an order, your complete order history, status tracking, and downloadable receipts will appear here.
          </p>
          <button
            onClick={() => setActiveTab('shop')}
            className="mt-6 py-3 px-6 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase rounded-xl"
          >
            Explore Haute Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
          Atelier Account
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light text-stone-900 dark:text-stone-100 mt-1">
          My Order History ({orders.length})
        </h1>
      </div>

      <div className="space-y-8">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-stone-100/80 dark:bg-stone-900/40 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-6"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-stone-200 dark:border-stone-800 gap-2">
              <div>
                <span className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
                  Order Number: {order.orderNumber}
                </span>
                <p className="text-xs text-stone-500">Placed on {order.createdAt}</p>
              </div>

              <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{order.status}</span>
              </div>
            </div>

            {/* Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center bg-white/60 dark:bg-stone-950/60 p-3 rounded-2xl border border-stone-200/60 dark:border-stone-800">
                  <img
                    src={item.perfume.images[0]}
                    alt={item.perfume.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-xl shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div>
                    <h4
                      onClick={() => openProductDetail(item.perfume.id)}
                      className="font-serif-luxury text-base font-medium cursor-pointer hover:underline text-stone-900 dark:text-stone-100"
                    >
                      {item.perfume.name}
                    </h4>
                    <p className="text-xs text-stone-500">
                      {item.selectedSize} × {item.quantity} · Pkr{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-stone-200 dark:border-stone-800 gap-4 text-xs">
              <div>
                <span className="text-stone-500">Ship To: </span>
                <strong className="text-stone-800 dark:text-stone-200">
                  {order.customer.fullName}, {order.customer.city}
                </strong>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-stone-500">Total Amount: </span>
                  <strong className="text-base font-bold text-amber-700 dark:text-amber-400 tabular-nums">
                    Pkr{order.summary.totalAmount.toFixed(0)}
                  </strong>
                </div>

                <button
                  onClick={() => window.print()}
                  className="p-2.5 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-xl hover:bg-stone-300"
                  title="Print Order Receipt"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
