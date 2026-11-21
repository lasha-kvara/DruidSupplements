import type { BenefitId, CategoryId, Product } from "@/data/types";
import { normalize } from "./utils";

export const getBestsellers = (products: Product[], limit = 6) => products.filter((p) => p.bestseller).slice(0, limit);

export const getStartingPrice = (p: Product) => Math.min(...p.variants.map((v) => v.price));

/** Same category first, then shared benefits, excluding the product itself. */
export function getRelatedProducts(products: Product[], product: Product, limit = 4): Product[] {
  const score = (p: Product) =>
    (p.category === product.category ? 2 : 0) +
    p.benefits.filter((b) => product.benefits.includes(b)).length +
    (p.inStock ? 0.5 : 0);
  return products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}

export interface CatalogFilters {
  category: CategoryId | "all";
  benefit: BenefitId | "all";
  query: string;
}

export function filterProducts(list: Product[], { category, benefit, query }: CatalogFilters): Product[] {
  const q = normalize(query);
  return list.filter((p) => {
    if (category !== "all" && p.category !== category) return false;
    if (benefit !== "all" && !p.benefits.includes(benefit)) return false;
    if (!q) return true;
    const haystack = normalize([p.name, p.latinName, p.shortBenefit, p.excerpt, p.form, ...p.keywords].join(" "));
    return q.split(" ").every((word) => haystack.includes(word));
  });
}
