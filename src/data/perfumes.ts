import { Perfume } from '../types/perfume';

// Image assets generated and curated
import nocturneOudImg from '../assets/images/images (5).jpg';
import fleurBlancheImg from '../assets/images/perfume_fleur_blanche_1791440867226.jpg';
import soleilAmbreImg from '../assets/images/perfume_soleil_ambre_1791440877095.jpg';
import veloursRoseImg from '../assets/images/perfume_velours_rose_1791440887310.jpg';

export const PERFUMES_DATA: Perfume[] = [
  {
    id: 'nocturne-oud',
    name: 'Nocturne Oud Extrait',
    brand: 'Éther & Aura',
    subtitle: 'Mystic Arabian Wood & Smoked Honey',
    category: 'Unisex',
    fragranceFamily: 'Woody Oud',
    concentration: 'Extrait de Parfum',
    price: 240,
    discountPrice: 215,
    sizeOptions: ['50ml', '100ml', '200ml'],
    sizePrices: {
      '50ml': 215,
      '100ml': 320,
      '200ml': 480,
    },
    rating: 4.9,
    reviewsCount: 128,
    description: 'An enchanting, opulent midnight composition centering around rare Cambodian agarwood, infused with smoked honey nectar and Venezuelan tonka bean.',
    story: 'Handcrafted in limited batches of 500 bottles in Grasse, Nocturne Oud captures the silent magic of starry Arabian nights.',
    fragranceNotes: {
      top: ['Smoked Honey', 'Wild Bergamot', 'Cardamom Pods'],
      heart: ['Cambodian Agarwood (Oud)', 'Damask Rose', 'Incense'],
      base: ['Leather Accord', 'Vanilla Absolute', 'Dark Amber', 'Sandalwood']
    },
    sillage: 'Intense',
    longevity: '12+ Hours',
    images: [
      nocturneOudImg,
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800'
    ],
    isBestSeller: true,
    isFeatured: true,
    stock: 24
  },
  {
    id: 'fleur-blanche',
    name: 'Fleur Blanche Royal',
    brand: 'Éther & Aura',
    subtitle: 'Velvety Jasmine & Dewy White Tuberose',
    category: 'Women',
    fragranceFamily: 'Floral Oriental',
    concentration: 'Eau de Parfum',
    price: 195,
    discountPrice: 175,
    sizeOptions: ['50ml', '100ml', '200ml'],
    sizePrices: {
      '50ml': 175,
      '100ml': 260,
      '200ml': 390,
    },
    rating: 4.8,
    reviewsCount: 94,
    description: 'A luminous, intoxicating bouquet of midnight blooming jasmine, radiant tuberose nectar, and delicate orange blossom draped in silky cashmere.',
    story: 'Inspired by sunrise walks through royal French gardens where white petals yield their purest, most sensual dew droplets.',
    fragranceNotes: {
      top: ['Italian Mandarin', 'Neroli Petals', 'Green Apple'],
      heart: ['Grasse Jasmine Sambac', 'Tuberose', 'Ylang-Ylang'],
      base: ['White Musk', 'Cashmere Wood', 'Bourbon Vanilla']
    },
    sillage: 'Enveloping',
    longevity: '8-10 Hours',
    images: [
      fleurBlancheImg,
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=800'
    ],
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
    stock: 18
  },
  {
    id: 'soleil-ambre',
    name: 'Soleil d’Ambre',
    brand: 'Maison Francis',
    subtitle: 'Golden Amber Resin & Sunlit Citrus',
    category: 'Unisex',
    fragranceFamily: 'Amber Warm',
    concentration: 'Extrait de Parfum',
    price: 260,
    sizeOptions: ['50ml', '100ml', '200ml'],
    sizePrices: {
      '50ml': 260,
      '100ml': 380,
      '200ml': 540,
    },
    rating: 4.95,
    reviewsCount: 156,
    description: 'Radiant warmth captured in liquid glass. Golden amber resins blended with sparkling Sicilian citrus and subtle spicy cinnamon bark.',
    story: 'A sun-drenched olfactory getaway capturing late afternoon rays kissing Mediterranean cliffside villas.',
    fragranceNotes: {
      top: ['Sicilian Grapefruit', 'Saffron', 'Pink Pepper'],
      heart: ['Amber Resin', 'Cinnamon Bark', 'Labdanum'],
      base: ['Cedarwood', 'Benzoin', 'Golden Musk']
    },
    sillage: 'Intense',
    longevity: '12+ Hours',
    images: [
      soleilAmbreImg,
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'
    ],
    isBestSeller: true,
    isFeatured: true,
    stock: 12
  },
  {
    id: 'velours-rose',
    name: 'Velours de Rose',
    brand: 'Tom Ford Atelier',
    subtitle: 'Crimson Rose & Midnight Patchouli',
    category: 'Women',
    fragranceFamily: 'Floral Oriental',
    concentration: 'Eau de Parfum',
    price: 210,
    discountPrice: 189,
    sizeOptions: ['50ml', '100ml', '200ml'],
    sizePrices: {
      '50ml': 189,
      '100ml': 285,
      '200ml': 420,
    },
    rating: 4.7,
    reviewsCount: 82,
    description: 'Sensual, dark velvet roses wrapped in earthy Indonesian patchouli, sweet plum liqueur, and warm leather nuances.',
    story: 'A provocative homage to late-night romance, velvet couture gowns, and whispered secrets.',
    fragranceNotes: {
      top: ['Plum Liqueur', 'Red Peony', 'Bergamot'],
      heart: ['May Rose', 'Damask Rose', 'Violet Leaf'],
      base: ['Indonesian Patchouli', 'Vetiver', 'Ambergris']
    },
    sillage: 'Enveloping',
    longevity: '8-10 Hours',
    images: [
      veloursRoseImg,
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&q=80&w=800'
    ],
    isNewArrival: true,
    isFeatured: true,
    stock: 30
  },
  {
    id: 'cuir-imperialis',
    name: 'Cuir Impérial',
    brand: 'Creed Heritage',
    subtitle: 'Tuscan Leather, Smoked Birch & Vetiver',
    category: 'Men',
    fragranceFamily: 'Chypre Leather',
    concentration: 'Parfum Pure',
    price: 280,
    sizeOptions: ['50ml', '100ml', '200ml'],
    sizePrices: {
      '50ml': 280,
      '100ml': 410,
      '200ml': 590,
    },
    rating: 4.9,
    reviewsCount: 210,
    description: 'A distinguished, masculine masterpiece combining supple Tuscan saddle leather with crisp green apple, smoked birch wood, and oakmoss.',
    story: 'Formulated for royalty, Cuir Impérial embodies timeless authority, refined sophistication, and charismatic charm.',
    fragranceNotes: {
      top: ['Crisp Apple', 'Blackcurrant', 'Calabrian Bergamot'],
      heart: ['Tuscan Leather', 'Smoked Birch', 'Patchouli'],
      base: ['Haitian Vetiver', 'Oakmoss', 'Ambergris']
    },
    sillage: 'Intense',
    longevity: '12+ Hours',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'
    ],
    isBestSeller: true,
    isNewArrival: false,
    stock: 15
  },
  {
    id: 'citrus-riviera',
    name: 'Citrus Riviera',
    brand: 'Diptyque',
    subtitle: 'Crisp Bergamot & Coastal Marine Sage',
    category: 'Unisex',
    fragranceFamily: 'Fresh Citrus',
    concentration: 'Eau de Parfum',
    price: 170,
    discountPrice: 153,
    sizeOptions: ['50ml', '100ml', '200ml'],
    sizePrices: {
      '50ml': 153,
      '100ml': 230,
      '200ml': 340,
    },
    rating: 4.65,
    reviewsCount: 76,
    description: 'An invigorating splash of sea salt, crushed bergamot leaves, sun-drenched lemon grove, and breezy coastal sage.',
    story: 'Capturing morning breeze off the Amalfi coast as citrus orchards wake to the Mediterranean sun.',
    fragranceNotes: {
      top: ['Amalfi Lemon', 'Crushed Mint', 'Sea Salt'],
      heart: ['Clary Sage', 'Orange Blossom', 'Thyme'],
      base: ['Driftwood', 'White Cedar', 'Clean Musk']
    },
    sillage: 'Moderate',
    longevity: '8-10 Hours',
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=800'
    ],
    isNewArrival: true,
    stock: 40
  },
  {
    id: 'vanille-vanite',
    name: 'Vanille Vanité',
    brand: 'Byredo Parfums',
    subtitle: 'Madagascar Vanilla Bean & Salted Caramel',
    category: 'Unisex',
    fragranceFamily: 'Gourmand Musk',
    concentration: 'Extrait de Parfum',
    price: 225,
    sizeOptions: ['50ml', '100ml', '200ml'],
    sizePrices: {
      '50ml': 225,
      '100ml': 330,
      '200ml': 475,
    },
    rating: 4.88,
    reviewsCount: 112,
    description: 'A addictive gourmand blend of smoky Madagascar vanilla pod, toasted tonka bean, salted caramel drizzled over velvet sandalwood.',
    story: 'An irresistible skin scent that leaves a hypnotic trail of comforting luxury everywhere you step.',
    fragranceNotes: {
      top: ['Bitter Almond', 'Pink Salt', 'Coconut Milk'],
      heart: ['Bourbon Vanilla', 'Orchid Petals', 'Heliotrope'],
      base: ['Tonka Bean', 'Sandalwood', 'White Amber']
    },
    sillage: 'Enveloping',
    longevity: '12+ Hours',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'
    ],
    isBestSeller: true,
    stock: 22
  },
  {
    id: 'santal-seraphique',
    name: 'Santal Séraphique',
    brand: 'Le Labo House',
    subtitle: 'Creamy Mysore Sandalwood & Iris Butter',
    category: 'Unisex',
    fragranceFamily: 'Woody Oud',
    concentration: 'Eau de Parfum',
    price: 205,
    sizeOptions: ['50ml', '100ml', '200ml'],
    sizePrices: {
      '50ml': 205,
      '100ml': 295,
      '200ml': 430,
    },
    rating: 4.85,
    reviewsCount: 140,
    description: 'Silky smooth Mysore sandalwood enhanced with powdery Florentine iris butter, violet leaves, and warm cardamom warmth.',
    story: 'A serene sanctuary in a bottle, designed for quiet contemplation and undeniable sophistication.',
    fragranceNotes: {
      top: ['Violet Leaf', 'Australian Cardamom', 'Papyrus'],
      heart: ['Florentine Iris Butter', 'Cedarwood', 'Cypress'],
      base: ['Mysore Sandalwood', 'Amber', 'Cashmeran']
    },
    sillage: 'Moderate',
    longevity: '8-10 Hours',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800'
    ],
    isNewArrival: false,
    stock: 28
  }
];

export const BRANDS = ['All', 'Éther & Aura', 'Maison Francis', 'Tom Ford Atelier', 'Creed Heritage', 'Diptyque', 'Byredo Parfums', 'Le Labo House'];

export const CATEGORIES = ['All', 'Unisex', 'Women', 'Men'];

export const FRAGRANCE_FAMILIES = [
  'All',
  'Woody Oud',
  'Floral Oriental',
  'Amber Warm',
  'Fresh Citrus',
  'Gourmand Musk',
  'Chypre Leather'
];
