import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getBenefits, getCategories } from "@/data";
import { getProductSlugs, getProducts } from "@/data/server";
import { getRelatedProducts, getStartingPrice } from "@/lib/catalog";
import { getDictionary, isLocale, localizePath, type Locale } from "@/i18n";
import { absoluteUrl } from "@/lib/utils";
import { alternatesFor } from "@/lib/seo";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductInfoTabs } from "@/components/product/ProductInfoTabs";
import { ProductCard } from "@/components/product/ProductCard";
import { BenefitIcon, NewBadge, Rating, StockBadge } from "@/components/ui/Badges";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export const dynamicParams = false;

type Params = Promise<{ lang: string; slug: string }>;

const toLocale = (v: string): Locale => (isLocale(v) ? v : "ka");

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = toLocale(raw);
  const product = (await getProducts(lang)).find((p) => p.slug === slug);
  if (!product) return { title: getDictionary(lang).product.notFound };
  return {
    title: `${product.name} (${product.latinName})`,
    description: product.excerpt,
    alternates: alternatesFor(lang, `/product/${slug}`),
    openGraph: { title: product.name, description: product.excerpt, images: [absoluteUrl(product.images[0])] },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { lang: raw, slug } = await params;
  const lang = toLocale(raw);
  const products = await getProducts(lang);
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const t = getDictionary(lang);
  const path = (href: string) => localizePath(lang, href);
  const category = getCategories(lang).find((c) => c.id === product.category);
  const benefits = getBenefits(lang);
  const related = getRelatedProducts(products, product, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    alternateName: product.latinName,
    description: product.description,
    image: product.images.map(absoluteUrl),
    brand: { "@type": "Brand", name: t.site.name },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "GEL",
      lowPrice: getStartingPrice(product),
      highPrice: Math.max(...product.variants.map((v) => v.price)),
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <div className="container pt-24 md:pt-28">
        <nav
          aria-label="breadcrumb"
          className="no-scrollbar flex items-center gap-1.5 overflow-x-auto whitespace-nowrap py-3 text-sm text-charcoal-muted"
        >
          <Link href={path("/")} className="hover:text-forest">
            {t.nav.home}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <Link href={path("/catalog")} className="hover:text-forest">
            {t.nav.catalog}
          </Link>
          {category && (
            <>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <Link href={path(`/catalog?category=${category.id}`)} className="hover:text-forest">
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="text-forest">{product.name}</span>
        </nav>

        <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal y={16}>
            <div className="lg:sticky lg:top-28">
              <ProductGallery
                images={product.images}
                alt={`${product.name} — ${product.latinName}`}
                badges={
                  <>
                    <StockBadge inStock={product.inStock} />
                    {product.isNew && <NewBadge />}
                  </>
                }
              />
            </div>
          </Reveal>

          <Reveal y={16} delay={0.1}>
            <p className="eyebrow">{category?.name}</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight md:text-5xl">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-sm italic text-charcoal-muted">{product.latinName}</span>
              <Rating value={product.rating} count={product.reviewCount} />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {product.benefits.map((id) => {
                const b = benefits.find((x) => x.id === id);
                if (!b) return null;
                return (
                  <Link
                    key={id}
                    href={path(`/catalog?benefit=${id}`)}
                    className="chip border-forest/15 bg-white text-forest hover:border-terracotta hover:text-terracotta"
                  >
                    <BenefitIcon icon={b.icon} className="h-4 w-4" />
                    {b.name}
                  </Link>
                );
              })}
            </div>

            <p className="mt-6 text-[17px] leading-relaxed text-charcoal-soft">{product.description}</p>
            <p className="mt-4 text-sm text-charcoal-muted">
              {t.product.form} <span className="font-medium text-charcoal">{product.form}</span>
            </p>

            <div className="mt-8 border-t border-forest/10 pt-8">
              <ProductPurchase product={product} />
            </div>
          </Reveal>
        </div>

        <section className="mt-16 md:mt-24" aria-label={t.product.infoAria}>
          <Reveal>
            <ProductInfoTabs details={product.details} />
          </Reveal>
        </section>
      </div>

      {related.length > 0 && (
        <section className="container mt-20 md:mt-28">
          <SectionHeading align="left" eyebrow={t.product.relatedEyebrow} title={t.product.relatedTitle} />
          <div className="mt-10 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
