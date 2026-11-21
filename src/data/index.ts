/**
 * Localized data access. Georgian source data lives in ./products.ts, ./posts.ts,
 * ./categories.ts and ./content.ts; English text in ./en/*. Everything that is not
 * text (prices, images, stock, slugs) always comes from the Georgian source.
 */
import type { Locale } from "@/i18n/config";
import type { Benefit, BlogPost, Category, FaqItem, Product, Testimonial } from "./types";
import { products as productsKa } from "./products";
import { posts as postsKa } from "./posts";
import { benefits as benefitsKa, categories as categoriesKa } from "./categories";
import { faqs as faqsKa, testimonials as testimonialsKa } from "./content";
import { productsEn } from "./en/products";
import { postsEn } from "./en/posts";
import { benefitsEn, categoriesEn, faqsEn, testimonialsEn } from "./en/content";

/** "50გ" -> "50g", "30მლ" -> "30ml" */
const latinUnits = (label: string) => label.replace("მლ", "ml").replace("გ", "g");

function toEnglish(p: Product): Product {
  const t = productsEn[p.slug];
  if (!t) return p;
  return {
    ...p,
    ...t,
    variants: p.variants.map((v) => ({ ...v, label: latinUnits(v.label) })),
    // Keep Georgian names searchable from the English site and vice versa.
    keywords: [...p.keywords, p.name],
  };
}

const productsEnList = productsKa.map(toEnglish);

export const getProducts = (lang: Locale): Product[] => (lang === "en" ? productsEnList : productsKa);

export const getProduct = (lang: Locale, slug: string) => getProducts(lang).find((p) => p.slug === slug);

const postsEnList: BlogPost[] = postsKa.map((p) => ({ ...p, ...(postsEn[p.slug] ?? {}) }));

export const getPosts = (lang: Locale): BlogPost[] => (lang === "en" ? postsEnList : postsKa);

export const getPost = (lang: Locale, slug: string) => getPosts(lang).find((p) => p.slug === slug);

export const getCategories = (lang: Locale): Category[] =>
  lang === "en" ? categoriesKa.map((c) => ({ ...c, ...categoriesEn[c.id] })) : categoriesKa;

export const getBenefits = (lang: Locale): Benefit[] =>
  lang === "en" ? benefitsKa.map((b) => ({ ...b, ...benefitsEn[b.id] })) : benefitsKa;

export const getTestimonials = (lang: Locale): Testimonial[] =>
  lang === "en" ? testimonialsKa.map((t) => ({ ...t, ...(testimonialsEn[t.id] ?? {}) })) : testimonialsKa;

export const getFaqs = (lang: Locale): FaqItem[] => (lang === "en" ? faqsEn : faqsKa);

/** All slugs (identical for every language) — for generateStaticParams */
export const productSlugs = productsKa.map((p) => p.slug);
export const postSlugs = postsKa.map((p) => p.slug);
