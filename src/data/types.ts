export type CategoryId = "mushrooms" | "herbs";

export type BenefitId = "immunity" | "energy" | "sleep" | "digestion";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface Benefit {
  id: BenefitId;
  name: string;
  description: string;
  /** Name of a lucide-react icon, resolved in components/ui/BenefitIcon */
  icon: "Shield" | "Zap" | "Moon" | "Leaf";
  image: string;
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
