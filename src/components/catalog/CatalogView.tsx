"use client";

import { useEffect, useMemo, useState, useDeferredValue } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { PackageX, Search, X } from "lucide-react";
import { getBenefits, getCategories, getProducts } from "@/data";
import { useI18n } from "@/i18n/I18nProvider";
import type { BenefitId, CategoryId } from "@/data/types";
import { filterProducts } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { BenefitIcon } from "@/components/ui/Badges";
import { ProductCard } from "@/components/product/ProductCard";

const CATEGORY_IDS: CategoryId[] = ["mushrooms", "herbs", "extracts"];
const BENEFIT_IDS: BenefitId[] = ["immunity", "energy", "sleep", "digestion"];

const isCategory = (v: string | null): v is CategoryId => CATEGORY_IDS.includes(v as CategoryId);
const isBenefit = (v: string | null): v is BenefitId => BENEFIT_IDS.includes(v as BenefitId);

export function CatalogView() {
  const { lang, t: dict } = useI18n();
  const t = dict.catalog;
  const benefits = getBenefits(lang);
  const categoryTabs: { id: CategoryId | "all"; name: string }[] = [
    { id: "all", name: t.all },
    ...getCategories(lang).map((c) => ({ id: c.id, name: c.name })),
  ];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState<CategoryId | "all">(() => {
    const c = searchParams.get("category");
    return isCategory(c) ? c : "all";
  });
  const [benefit, setBenefit] = useState<BenefitId | "all">(() => {
    const b = searchParams.get("benefit");
    return isBenefit(b) ? b : "all";
  });
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [inStockOnly, setInStockOnly] = useState(false);
  const deferredQuery = useDeferredValue(query);

  // Keep the URL shareable: /catalog?category=mushrooms&benefit=sleep&q=...
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (benefit !== "all") params.set("benefit", benefit);
    if (deferredQuery.trim()) params.set("q", deferredQuery.trim());
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [category, benefit, deferredQuery, pathname, router]);

  // On narrow screens the chip row scrolls horizontally — bring a pre-selected chip into view.
  useEffect(() => {
    document
      .querySelector<HTMLElement>('[data-benefit-chip][aria-pressed="true"]')
      ?.scrollIntoView({ block: "nearest", inline: "center" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const results = useMemo(() => {
    const list = filterProducts(getProducts(lang), { category, benefit, query: deferredQuery });
    return inStockOnly ? list.filter((p) => p.inStock) : list;
  }, [lang, category, benefit, deferredQuery, inStockOnly]);

  const hasFilters = category !== "all" || benefit !== "all" || query !== "" || inStockOnly;
  const reset = () => {
    setCategory("all");
    setBenefit("all");
    setQuery("");
    setInStockOnly(false);
  };

  return (
    <div>
      {/* Sticky filter bar */}
      <div className="sticky top-[68px] z-30 -mx-5 border-b border-forest/10 bg-parchment/90 px-5 py-4 backdrop-blur-lg md:top-20 md:-mx-8 md:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <LayoutGroup id="category-tabs">
              <div role="tablist" aria-label={t.categoriesAria} className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
                {categoryTabs.map((tab) => {
                  const active = category === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={active}
                      type="button"
                      onClick={() => setCategory(tab.id)}
                      className={cn(
                        "relative min-h-[44px] shrink-0 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors",
                        active ? "text-parchment" : "text-forest hover:bg-forest/5",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="category-pill"
                          className="absolute inset-0 rounded-full bg-forest"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className="relative">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            <label className="relative block w-full lg:max-w-xs">
              <span className="sr-only">{t.searchLabel}</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="input !rounded-full !py-3 pl-12 pr-11"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label={t.clearSearch}
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-forest/5 text-forest"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </label>
          </div>

          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            {benefits.map((b) => {
              const active = benefit === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  data-benefit-chip
                  aria-pressed={active}
                  onClick={() => setBenefit(active ? "all" : b.id)}
                  className={cn(
                    "chip shrink-0",
                    active
                      ? "border-terracotta bg-terracotta text-white"
                      : "border-forest/15 bg-white text-forest hover:border-forest/30",
                  )}
                >
                  <BenefitIcon icon={b.icon} className="h-4 w-4" />
                  {b.name}
                </button>
              );
            })}
            <button
              type="button"
              aria-pressed={inStockOnly}
              onClick={() => setInStockOnly((v) => !v)}
              className={cn(
                "chip shrink-0",
                inStockOnly ? "border-forest bg-forest text-parchment" : "border-forest/15 bg-white text-forest hover:border-forest/30",
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", inStockOnly ? "bg-emerald-300" : "bg-emerald-500")} />
              {t.inStockOnly}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-charcoal-muted" aria-live="polite">
        <span>
          {t.foundBefore}
          <b className="text-forest">{results.length}</b>
          {t.foundAfter}
        </span>
        {hasFilters && (
          <button type="button" onClick={reset} className="font-semibold text-terracotta hover:underline">
            {t.reset}
          </button>
        )}
      </div>

      <motion.div layout className="mt-6 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {results.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.2) }}
            >
              <ProductCard product={p} priority={i < 4} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-auto mt-6 max-w-md rounded-3xl border border-dashed border-forest/20 bg-white/60 px-6 py-14 text-center"
          >
            <PackageX className="mx-auto h-12 w-12 text-forest/30" />
            <h2 className="mt-4 text-xl font-semibold">{t.emptyTitle}</h2>
            <p className="mt-2 text-sm text-charcoal-soft">{t.emptyText}</p>
            <button type="button" onClick={reset} className="btn-forest mt-6">
              {t.emptyCta}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
