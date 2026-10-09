import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Mail, Send, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, addToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    addToast('Welcome to the Éther & Aura VIP Private Reserve Circle.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 dark:bg-stone-950 dark:text-stone-400 border-t border-stone-800 transition-colors pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-stone-800">
          
          {/* Brand Vision Column */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif-luxury text-2xl tracking-widest text-stone-100 uppercase">
              ÉTHER & AURA
            </h3>
            <p className="text-xs leading-relaxed text-stone-400 max-w-sm">
              Haute Parfumerie born in Grasse and perfected in Paris. Artisanal Extraits de Parfum crafted from rare botanicals, wild agarwoods, and pure floral absolutes.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 pt-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Atelier Principal: Route de Napoleon, Grasse, France</span>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-amber-400 transition-colors">
                  Haute Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Scent Profile Quiz
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('notes-guide')} className="hover:text-amber-400 transition-colors">
                  Fragrance Pyramid Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Account & Care Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setActiveTab('cart')} className="hover:text-amber-400 transition-colors">
                  Shopping Bag
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('wishlist')} className="hover:text-amber-400 transition-colors">
                  Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('orders')} className="hover:text-amber-400 transition-colors">
                  My Orders
                </button>
              </li>
              <li>
                <span className="text-stone-500 cursor-default">
                  Complimentary Returns
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100">
              Private Reserve Circle
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe to receive invitations to limited-edition batch drops, rare vintage distillations, and complimentary sampler sets.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2 pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 p-2.5 bg-stone-800 border border-stone-700 rounded-xl text-xs font-medium text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase rounded-xl transition-colors shrink-0"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} ÉTHER & AURA Haute Parfumerie. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Authenticity Certificate</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
