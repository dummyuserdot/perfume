import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES_DATA } from '../data/perfumes';
import { Perfume } from '../types/perfume';
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScentQuizModal: React.FC = () => {
  const { openProductDetail, addToCart, setActiveTab } = useShop();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    vibe: '',
    accord: '',
    intensity: '',
  });

  const [recommended, setRecommended] = useState<Perfume[] | null>(null);

  const handleSelectVibe = (vibe: string) => {
    setAnswers((prev) => ({ ...prev, vibe }));
    setStep(2);
  };

  const handleSelectAccord = (accord: string) => {
    setAnswers((prev) => ({ ...prev, accord }));
    setStep(3);
  };

  const handleSelectIntensity = (intensity: string) => {
    const finalAnswers = { ...answers, intensity };
    setAnswers(finalAnswers);

    // Calculate matches
    let matches = PERFUMES_DATA.filter((p) => {
      if (finalAnswers.accord === 'Woody & Oud' && p.fragranceFamily.includes('Woody')) return true;
      if (finalAnswers.accord === 'Amber & Gourmand' && (p.fragranceFamily.includes('Amber') || p.fragranceFamily.includes('Gourmand'))) return true;
      if (finalAnswers.accord === 'Fresh Citrus & Ocean' && p.fragranceFamily.includes('Fresh')) return true;
      if (finalAnswers.accord === 'Floral & Rose' && p.fragranceFamily.includes('Floral')) return true;
      return true;
    });

    if (matches.length === 0) matches = PERFUMES_DATA.slice(0, 2);

    setRecommended(matches.slice(0, 2));
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ vibe: '', accord: '', intensity: '' });
    setRecommended(null);
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4">
      <div className="bg-stone-100/90 dark:bg-stone-900/60 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl text-stone-900 dark:text-stone-100">
        
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Artisanal Olfactive Profiler</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light">
            Discover Your Signature Scent
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-md mx-auto">
            Answer 3 refined questions and our master perfumer algorithm will match you with your ideal olfactive creation.
          </p>
        </div>

        {/* Step Indicator */}
        {step <= 3 && (
          <div className="flex justify-between items-center max-w-xs mx-auto mb-8 text-xs font-semibold text-stone-400">
            <span className={step >= 1 ? 'text-amber-600 font-bold' : ''}>1. Vibe</span>
            <span>—</span>
            <span className={step >= 2 ? 'text-amber-600 font-bold' : ''}>2. Accord</span>
            <span>—</span>
            <span className={step >= 3 ? 'text-amber-600 font-bold' : ''}>3. Intensity</span>
          </div>
        )}

        {/* Question Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-center font-serif-luxury text-2xl font-medium mb-6">
                What mood or atmosphere do you wish to project?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Midnight Opulence & Mystery', desc: 'Seductive, dark woods, smoked honey & evening romance' },
                  { title: 'Sun-Drenched Coastal Luxury', desc: 'Sea breezes, sparkling citrus groves & effortless warmth' },
                  { title: 'Timeless Elegant Sophistication', desc: 'Powdery iris, velvety rose & aristocratic leather' },
                  { title: 'Warm & Comforting Sensuality', desc: 'Addictive Madagascar vanilla, salted caramel & cashmere' },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleSelectVibe(item.title)}
                    className="p-6 text-left rounded-2xl bg-white/70 dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 hover:border-amber-600 dark:hover:border-amber-500 hover:scale-[1.01] transition-all group"
                  >
                    <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-center font-serif-luxury text-2xl font-medium mb-6">
                Which fragrance family speaks to your soul?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Woody & Oud', desc: 'Cambodian agarwood, smoked cedar, Haitian vetiver' },
                  { title: 'Amber & Gourmand', desc: 'Golden amber resins, bourbon vanilla bean, cinnamon' },
                  { title: 'Fresh Citrus & Ocean', desc: 'Amalfi lemons, coastal sage, crisp marine sea salt' },
                  { title: 'Floral & Rose', desc: 'Grasse jasmine sambac, May rose, white tuberose' },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleSelectAccord(item.title)}
                    className="p-6 text-left rounded-2xl bg-white/70 dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 hover:border-amber-600 dark:hover:border-amber-500 hover:scale-[1.01] transition-all group"
                  >
                    <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-center font-serif-luxury text-2xl font-medium mb-6">
                What level of sillage density do you prefer?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: 'Subtle & Intimate', desc: 'An intimate skin scent appreciated up close' },
                  { title: 'Enveloping Aura', desc: 'Leaves an undeniable, elegant scent trail' },
                  { title: 'Intense Masterpiece', desc: 'Maximum sillage & 12+ hour concentration' },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleSelectIntensity(item.title)}
                    className="p-6 text-left rounded-2xl bg-white/70 dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 hover:border-amber-600 dark:hover:border-amber-500 hover:scale-[1.01] transition-all group"
                  >
                    <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && recommended && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
                  Matched by Haute Parfumerie
                </span>
                <h3 className="font-serif-luxury text-3xl font-light">
                  Your Bespoke Olfactive Recommendations
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {recommended.map((perfume) => (
                  <div
                    key={perfume.id}
                    className="p-6 bg-white/80 dark:bg-stone-950/80 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-4"
                  >
                    <div className="flex gap-4">
                      <img
                        src={perfume.images[0]}
                        alt={perfume.name}
                        referrerPolicy="no-referrer"
                        className="w-24 h-24 object-cover rounded-xl shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-amber-600">
                          {perfume.brand}
                        </span>
                        <h4 className="font-serif-luxury text-lg font-medium text-stone-900 dark:text-stone-100">
                          {perfume.name}
                        </h4>
                        <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                          {perfume.description}
                        </p>
                        <div className="text-sm font-bold mt-2 tabular-nums">Pkr{perfume.price}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                      <button
                        onClick={() => openProductDetail(perfume.id)}
                        className="flex-1 py-2.5 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold rounded-xl hover:bg-stone-300"
                      >
                        Explore Story
                      </button>
                      <button
                        onClick={() => addToCart(perfume, '50ml', 1)}
                        className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add To Bag</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={handleReset}
                  className="text-xs font-bold uppercase text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 flex items-center justify-center gap-1.5 mx-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Scent Quiz</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
