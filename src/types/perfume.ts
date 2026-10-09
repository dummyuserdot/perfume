export type FragranceCategory = 'Unisex' | 'Men' | 'Women';

export type FragranceFamily = 
  | 'Woody Oud' 
  | 'Floral Oriental' 
  | 'Amber Warm' 
  | 'Fresh Citrus' 
  | 'Gourmand Musk' 
  | 'Chypre Leather';

export type PerfumeSize = '50ml' | '100ml' | '200ml';

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  subtitle: string;
  category: FragranceCategory;
  fragranceFamily: FragranceFamily;
  concentration: 'Extrait de Parfum' | 'Eau de Parfum' | 'Parfum Pure';
  price: number; // Base price for 50ml
  discountPrice?: number;
  sizeOptions: PerfumeSize[];
  sizePrices: Record<PerfumeSize, number>;
  rating: number;
  reviewsCount: number;
  description: string;
  story: string;
  fragranceNotes: FragranceNotes;
  sillage: 'Moderate' | 'Intense' | 'Enveloping' | 'Subtle';
  longevity: '8-10 Hours' | '12+ Hours' | 'All Day & Night';
  images: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  stock: number;
}

export interface CartItem {
  perfume: Perfume;
  selectedSize: PerfumeSize;
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  giftMessage?: string;
  paymentMethod: 'credit_card' | 'apple_pay' | 'cod';
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customer: CustomerInfo;
  summary: {
    subtotal: number;
    discountAmount: number;
    promoCodeUsed?: string;
    shippingFee: number;
    totalAmount: number;
  };
  createdAt: string;
  status: 'Confirmed' | 'Crafting in Atelier' | 'Dispatched' | 'Delivered';
  estimatedDelivery: string;
}

export interface FilterState {
  searchQuery: string;
  category: FragranceCategory | 'All';
  brand: string | 'All';
  fragranceFamily: FragranceFamily | 'All';
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
