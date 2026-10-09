import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES_DATA } from '../data/perfumes';
import { ProductCard } from './ProductCard';
import { FragrancePyramidVisual } from './FragrancePyramidVisual';
import { PerfumeSize } from '../types/perfume';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, Sparkles, Award, ArrowLeft, Send, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDetail: React.FC = () => {
  const { selectedPerfumeId, addToCart, toggleWishlist, isInWishlist, setActiveTab, openProductDetail, closeProductDetail, addToast } = useShop();
  
  const perfume = PERFUMES_DATA.find((p) => p.id === selectedPerfumeId) || PERFUMES_DATA[0];
  const inWishlist = isInWishlist(perfume.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<PerfumeSize>('50ml');
  const [quantity, setQuantity] = useState(1);

  // Review Form state
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Evelyn V.',
      rating: 5,
      date: 'October 2, 2026',
      title: 'Transcendent and otherworldly fragrance',
      comment: 'The dry down on skin after 4 hours is absolute perfection. Smoked honey and Cambodian oud blend seamlessly.',
      verified: true,
    },
    {
      id: 2,
      author: 'Marcus L.',
      rating: 5,
      date: 'September 28, 2026',
      title: 'Compliments wherever I step',
      comment: 'Packaging is royal level and the longevity exceeds 12 hours. Unbelievable craftsmanship.',
      verified: true,
    },
  ]);

  const [newReview, setNewReview] = useState({ author: '', rating: 5, comment: '', title: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment || !newReview.title) return;

    setReviewsList((prev) => [
      {
        id: Date.now(),
        author: newReview.author,
        rating: newReview.rating,
        date: 'Today',
        title: newReview.title,
        comment: newReview.comment,
        verified: true,
      },
      ...prev,
    ]);

    setNewReview({ author: '', rating: 5, comment: '', title: '' });
    setReviewSubmitted(true);
    addToast('Thank you! Your fragrance review has been published.');
  };

  const currentPrice = perfume.sizePrices[selectedSize] || perfume.price;

  // Related products
  const relatedPerfumes = PERFUMES_DATA.filter(
    (p) => p.id !== perfume.id && (p.category === perfume.category || p.fragranceFamily === perfume.fragranceFamily)
  ).slice(0, 3);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => closeProductDetail()}
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Haute Catalog</span>
      </button>

      {/* Main PDP Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Gallery Column */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl overflow-hidden bg-stone-200 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shadow-xl">
            <img
              src={perfume.images[selectedImageIndex] || perfume.images[0]}
              alt={perfume.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-500"
              onError={(e) => {
                const target = e.currentTarget;
                target.src = perfume.images[0] || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800';
              }}
            />
            <button
              onClick={() => toggleWishlist(perfume.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-lg transition-all ${
                inWishlist
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {perfume.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {perfume.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-amber-600 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Product Purchase Module */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Kicker Metadata */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-2">
              <span>{perfume.brand}</span>
              <span aria-hidden="true">·</span>
              <span>{perfume.category}</span>
              <span aria-hidden="true">·</span>
              <span>{perfume.concentration}</span>
            </div>

            {/* Name */}
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light text-stone-900 dark:text-stone-100 tracking-tight">
              {perfume.name}
            </h1>

            <p className="text-sm font-medium text-stone-500 dark:text-stone-400 mt-1 italic">
              "{perfume.subtitle}"
            </p>

            {/* Rating & Review summary */}
            <div className="flex items-center gap-3 mt-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <span className="text-xs font-bold tabular-nums text-stone-800 dark:text-stone-200">
                {perfume.rating} / 5.0
              </span>
              <span className="text-xs text-stone-400">({perfume.reviewsCount} verified connoisseurs)</span>
            </div>

            {/* Price Row */}
            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-3xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                Pkr{currentPrice}
              </span>
              {perfume.discountPrice && selectedSize === '50ml' && (
                <span className="text-lg text-stone-400 line-through tabular-nums">
                  Pkr{perfume.price}
                </span>
              )}
              <span className="text-xs font-semibold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                In Atelier Stock
              </span>
            </div>

            {/* Story & Description */}
            <div className="mt-6 space-y-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>{perfume.description}</p>
              <p className="text-xs italic text-stone-500 dark:text-stone-400 bg-stone-100/80 dark:bg-stone-900/50 p-3 rounded-xl border border-stone-200/60 dark:border-stone-800">
                "{perfume.story}"
              </p>
            </div>

            {/* Technical Attributes Pills */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-stone-100/80 dark:bg-stone-900/40 rounded-xl border border-stone-200/60 dark:border-stone-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Sillage Density</span>
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">{perfume.sillage}</span>
              </div>
              <div className="p-3 bg-stone-100/80 dark:bg-stone-900/40 rounded-xl border border-stone-200/60 dark:border-stone-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Skin Longevity</span>
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">{perfume.longevity}</span>
              </div>
            </div>

            {/* Bottle Volume Selector */}
            <div className="mt-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                Select Bottle Flacon Volume
              </label>
              <div className="grid grid-cols-3 gap-3">
                {perfume.sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 text-xs font-bold rounded-2xl border transition-all text-center ${
                      selectedSize === size
                        ? 'border-amber-600 bg-amber-500/10 text-amber-700 dark:text-amber-400 shadow-md'
                        : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                    }`}
                  >
                    <div>{size}</div>
                    <div className="text-[11px] font-normal text-stone-500 mt-0.5">Pkr{perfume.sizePrices[size]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Buy Actions */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Quantity
                </span>
                <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 font-bold"
                  >
                    -
                  </button>
                  <span className="px-5 py-2 text-xs font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => addToCart(perfume, selectedSize, quantity)}
                  className="flex-1 py-4 px-6 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-amber-600 dark:hover:bg-amber-400 dark:hover:text-stone-950 text-xs font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-all duration-300"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag — Pkr{(currentPrice * quantity).toFixed(0)}</span>
                </button>

                <button
                  onClick={() => {
                    addToCart(perfume, selectedSize, quantity);
                    setActiveTab('checkout');
                  }}
                  className="py-4 px-6 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-widest rounded-2xl shadow-xl transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Service Guarantees */}
            <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-4 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Complimentary Express Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>2 Free Atelier Sampler Vials</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>100% Authentic Grasse Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Complimentary Bottle Engraving</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fragrance Pyramid Visual Section */}
      <div className="mt-16">
        <FragrancePyramidVisual notes={perfume.fragranceNotes} name={perfume.name} />
      </div>

      {/* Reviews Section */}
      <section className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
              Connoisseur Impressions
            </span>
            <h3 className="font-serif-luxury text-3xl font-light text-stone-900 dark:text-stone-100 mt-1">
              Ratings & Reviews
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Reviews List */}
            <div className="md:col-span-7 space-y-4">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="p-5 bg-stone-100/70 dark:bg-stone-900/40 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">{rev.author}</span>
                      <span className="text-[10px] text-stone-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <h5 className="font-semibold text-xs text-stone-800 dark:text-stone-200">{rev.title}</h5>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <div className="md:col-span-5 bg-stone-100/90 dark:bg-stone-900/60 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 h-fit">
              <h4 className="font-serif-luxury text-xl font-medium mb-4">Share Your Olfactive Review</h4>
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.author}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, author: e.target.value }))}
                    placeholder="e.g. Lady Clara"
                    className="w-full p-2.5 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">Review Headline</label>
                  <input
                    type="text"
                    required
                    value={newReview.title}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Unforgettable sillage"
                    className="w-full p-2.5 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full p-2.5 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                  >
                    <option value={5}>5 Stars — Sublime</option>
                    <option value={4}>4 Stars — Very Good</option>
                    <option value={3}>3 Stars — Average</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">Comments</label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.comment}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                    placeholder="Describe how the fragrance evolved on your skin..."
                    className="w-full p-2.5 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Connoisseur Review</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedPerfumes.length > 0 && (
        <section className="mt-20 pt-12 border-t border-stone-200 dark:border-stone-800">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                You May Also Admire
              </span>
              <h3 className="font-serif-luxury text-3xl font-light text-stone-900 dark:text-stone-100 mt-1">
                Complementary Creations
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('shop')}
              className="text-xs font-semibold uppercase text-amber-600 dark:text-amber-400 hover:underline"
            >
              Explore Full Collection →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPerfumes.map((rel) => (
              <ProductCard key={rel.id} perfume={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
