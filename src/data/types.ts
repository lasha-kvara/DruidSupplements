/** Category / benefit ids are slugs of entries edited in the admin panel (content/categories, content/benefits). */
export type CategoryId = string;

export type BenefitId = string;

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface Benefit {
  id: BenefitId;
  name: string;
  description: string;
  /** Icon name picked in the admin panel — see src/lib/icons.ts */
  icon: string;
  /** Card photo, or null when none was uploaded */
  image: string | null;
}

export interface ProductVariant {
  id: string;
  /** Shown to the customer, e.g. "50გ" or "30მლ" */
  label: string;
  /** Price in GEL */
  price: number;
  /** Optional old price to show a discount */
  oldPrice?: number;
}

export interface ProductDetails {
  /** სასარგებლო თვისებები */
  benefits: string[];
  /** მიღების წესი */
  usage: string;
  /** დოზირება */
  dosage: string[];
  /** შემადგენლობა */
  ingredients: string;
  /** წარმომავლობა */
  origin: string;
  /** უკუჩვენებები და უსაფრთხოება */
  contraindications: string[];
}

export interface Product {
  slug: string;
  name: string;
  latinName: string;
  category: CategoryId;
  benefits: BenefitId[];
  /** Short tag shown on cards, e.g. "მეხსიერება და ფოკუსი" */
  shortBenefit: string;
  excerpt: string;
  description: string;
  images: string[];
  form: string;
  variants: ProductVariant[];
  inStock: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  details: ProductDetails;
  /** Extra search keywords (synonyms, English names) */
  keywords: string[];
}

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string; // ISO
  readingMinutes: number;
  author: string;
  tags: string[];
  relatedProducts: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  product: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
