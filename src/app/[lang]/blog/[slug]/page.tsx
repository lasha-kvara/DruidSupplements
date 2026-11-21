import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { ArrowLeft, Clock } from "lucide-react";
import { getPostBody, getPostSlugs, getPosts, getProducts } from "@/data/server";
import { getDictionary, isLocale, localizePath, type Locale } from "@/i18n";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { alternatesFor } from "@/lib/seo";
import { ProductCard } from "@/components/product/ProductCard";
import { PostCard } from "@/components/blog/PostCard";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { Reveal } from "@/components/ui/Reveal";

export const dynamicParams = false;

type Params = Promise<{ lang: string; slug: string }>;

const toLocale = (v: string): Locale => (isLocale(v) ? v : "ka");

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = toLocale(raw);
  const post = (await getPosts(lang)).find((p) => p.slug === slug);
  if (!post) return { title: getDictionary(lang).blog.notFound };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: alternatesFor(lang, `/blog/${slug}`),
    openGraph: { type: "article", title: post.title, description: post.excerpt, images: [absoluteUrl(post.cover)], publishedTime: post.date },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { lang: raw, slug } = await params;
  const lang = toLocale(raw);
  const [posts, products, body] = await Promise.all([getPosts(lang), getProducts(lang), getPostBody(lang, slug)]);
  const post = posts.find((p) => p.slug === slug);
  if (!post || !body) notFound();

  const t = getDictionary(lang);
  const related = post.relatedProducts
    .map((s) => products.find((p) => p.slug === s))
    .filter((p) => p !== undefined);
  const otherPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  // Article body is Markdoc written in the admin panel (/keystatic); styled by .prose-ka in globals.css.
  const article = Markdoc.renderers.react(Markdoc.transform(body), React);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.cover),
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: t.site.name },
    inLanguage: lang,
  };

  return (
    <>
      <ReadingProgress />
      <article>
        <header className="container max-w-3xl pt-28 md:pt-36">
          <Reveal>
            <Link
              href={localizePath(lang, "/blog")}
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-terracotta-dark hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> {t.blog.back}
            </Link>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-500">
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">{post.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-charcoal-muted">
              <span className="font-medium text-charcoal">{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" /> {t.common.minutesShort(post.readingMinutes)}
              </span>
            </div>
          </Reveal>
        </header>

        <Reveal delay={0.1} className="container mt-10 max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
            <Image src={post.cover} alt={post.title} fill priority sizes="(min-width: 1024px) 1000px, 100vw" className="object-cover" />
          </div>
        </Reveal>

        <div className="container mt-12 max-w-3xl">
          <p className="mb-8 font-serif text-xl leading-relaxed text-forest md:text-2xl">{post.excerpt}</p>
          <div className="prose-ka">{article}</div>
          <p className="mt-10 rounded-2xl border border-forest/10 bg-surface p-5 text-sm text-charcoal-muted">
            {t.blog.disclaimer}
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container mt-20 max-w-5xl">
          <h2 className="text-2xl font-semibold md:text-3xl">{t.blog.mentionedProducts}</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {otherPosts.length > 0 && (
        <section className="container mt-20 max-w-5xl">
          <h2 className="text-2xl font-semibold md:text-3xl">{t.blog.readAlso}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {otherPosts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
