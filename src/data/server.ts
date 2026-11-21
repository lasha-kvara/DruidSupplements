/**
 * Server-only content access for collections edited in Keystatic (/keystatic):
 * products (content/products/*.json) and blog posts (content/posts/<slug>/).
 * Pages call these and pass plain objects down to client components.
 */
import { cache } from "react";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import type { Locale } from "@/i18n/config";
import type { BlogPost, Product, ProductDetails } from "./types";

const reader = createReader(process.cwd(), keystaticConfig);

type Bi = { ka: string; en: string };
/** English falls back to Georgian when a translation is still empty. */
const pick = (lang: Locale, v: Bi) => (lang === "en" ? v.en.trim() || v.ka : v.ka);

/** "50გ" -> "50g", "30მლ" -> "30ml" */
const latinUnits = (label: string) => label.replace("მლ", "ml").replace("გ", "g");

type ProductEntry = NonNullable<Awaited<ReturnType<typeof reader.collections.products.read>>>;

function pickDetails(lang: Locale, e: ProductEntry): ProductDetails {
  const ka = e.detailsKa;
  if (lang === "ka") {
    return {
      ...ka,
      benefits: [...ka.benefits],
      dosage: [...ka.dosage],
      contraindications: [...ka.contraindications],
    };
  }
  const en = e.detailsEn;
  const list = (a: readonly string[], b: readonly string[]) => (a.some((x) => x.trim()) ? [...a] : [...b]);
  return {
    benefits: list(en.benefits, ka.benefits),
    usage: en.usage.trim() || ka.usage,
    dosage: list(en.dosage, ka.dosage),
    ingredients: en.ingredients.trim() || ka.ingredients,
    origin: en.origin.trim() || ka.origin,
    contraindications: list(en.contraindications, ka.contraindications),
  };
}

function toProduct(lang: Locale, slug: string, e: ProductEntry): Product {
  return {
    slug,
    name: lang === "en" ? e.nameEn.trim() || e.name : e.name,
    latinName: e.latinName,
    category: e.category,
    benefits: [...e.benefits],
    shortBenefit: pick(lang, e.shortBenefit),
    excerpt: pick(lang, e.excerpt),
    description: pick(lang, e.description),
    images: e.images.filter((i): i is string => Boolean(i)),
    form: pick(lang, e.form),
    variants: e.variants.map((v, i) => ({
      id: `v${i}`,
      label: lang === "en" ? latinUnits(v.label) : v.label,
      price: v.price ?? 0,
      oldPrice: v.oldPrice ?? undefined,
    })),
    inStock: e.inStock,
    bestseller: e.bestseller,
    isNew: e.isNew,
    rating: e.rating ?? 5,
    reviewCount: e.reviewCount ?? 0,
    details: pickDetails(lang, e),
    // Both names stay searchable from either language.
    keywords: [...e.keywords, e.name, e.nameEn],
  };
}

const allProductEntries = cache(async () => {
  const all = await reader.collections.products.all();
  return all.sort((a, b) => (a.entry.order ?? 100) - (b.entry.order ?? 100) || a.slug.localeCompare(b.slug));
});

export const getProducts = cache(async (lang: Locale): Promise<Product[]> =>
  (await allProductEntries()).map(({ slug, entry }) => toProduct(lang, slug, entry)),
);

export const getProduct = async (lang: Locale, slug: string) => (await getProducts(lang)).find((p) => p.slug === slug);

export const getProductSlugs = async () => (await allProductEntries()).map((p) => p.slug);

const allPostEntries = cache(async () => {
  const all = await reader.collections.posts.all({ resolveLinkedFiles: true });
  return all.sort((a, b) => (b.entry.date ?? "").localeCompare(a.entry.date ?? ""));
});

type PostEntry = Awaited<ReturnType<typeof allPostEntries>>[number];

function toPost(lang: Locale, { slug, entry: e }: PostEntry): BlogPost {
  return {
    slug,
    title: lang === "en" ? e.titleEn.trim() || e.title : e.title,
    excerpt: pick(lang, e.excerpt),
    cover: e.cover,
    date: e.date ?? "",
    readingMinutes: e.readingMinutes ?? 5,
    author: pick(lang, e.author),
    tags: [...(lang === "en" && e.tagsEn.length ? e.tagsEn : e.tagsKa)],
    relatedProducts: e.relatedProducts.filter((s): s is string => Boolean(s)),
  };
}

/** Posts newest first (plain objects — safe to pass to client components). */
export const getPosts = cache(async (lang: Locale): Promise<BlogPost[]> => (await allPostEntries()).map((p) => toPost(lang, p)));

export const getPost = async (lang: Locale, slug: string) => (await getPosts(lang)).find((p) => p.slug === slug);

export const getPostSlugs = async () => (await allPostEntries()).map((p) => p.slug);

/** Markdoc AST of the article body in the requested language (falls back to Georgian if empty). */
export async function getPostBody(lang: Locale, slug: string) {
  const post = (await allPostEntries()).find((p) => p.slug === slug);
  if (!post) return null;
  const ka = post.entry.bodyKa.node;
  const en = post.entry.bodyEn.node;
  return lang === "en" && en.children.length > 0 ? en : ka;
}
