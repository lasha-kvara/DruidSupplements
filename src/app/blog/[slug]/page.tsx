import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Leaf } from "lucide-react";
import { getPostBySlug, posts } from "@/data/posts";
import type { BlogBlock } from "@/data/types";
import { getProductBySlug } from "@/lib/catalog";
import { absoluteUrl, formatDateKa } from "@/lib/utils";

export const dynamicParams = false;
import { siteConfig } from "@/config/site";
import { ProductCard } from "@/components/product/ProductCard";
import { PostCard } from "@/components/blog/PostCard";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { Reveal } from "@/components/ui/Reveal";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "სტატია ვერ მოიძებნა" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt, images: [absoluteUrl(post.cover)], publishedTime: post.date },
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[17px] leading-relaxed text-charcoal-soft">
              <Leaf className="mt-1 h-5 w-5 shrink-0 text-forest-400" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    default:
      return <p>{block.text}</p>;
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = post.relatedProducts.map(getProductBySlug).filter((p) => p !== undefined);
  const otherPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.cover),
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    inLanguage: "ka",
  };

  return (
    <>
      <ReadingProgress />
      <article>
        <header className="container max-w-4xl pt-28 md:pt-36">
          <Reveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta hover:underline">
              <ArrowLeft className="h-4 w-4" /> ყველა სტატია
            </Link>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-500">
                  #{t}
                </span>
              ))}
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">{post.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-charcoal-muted">
              <span className="font-medium text-charcoal">{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDateKa(post.date)}</time>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" /> {post.readingMinutes} წთ
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
          <div className="prose-ka">
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
          <p className="mt-10 rounded-2xl border border-forest/10 bg-white p-5 text-sm text-charcoal-muted">
            სტატია საგანმანათლებლო ხასიათისაა და არ წარმოადგენს სამედიცინო რჩევას. ნებისმიერი დანამატის მიღებამდე
            გაიარეთ კონსულტაცია ექიმთან.
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container mt-20 max-w-5xl">
          <h2 className="text-2xl font-semibold md:text-3xl">სტატიაში ნახსენები პროდუქტები</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {otherPosts.length > 0 && (
        <section className="container mt-20 max-w-5xl">
          <h2 className="text-2xl font-semibold md:text-3xl">წაიკითხეთ ასევე</h2>
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
