import type { Metadata } from "next";
import { getPosts } from "@/data/server";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { alternatesFor } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { PostCard } from "@/components/blog/PostCard";
import { Reveal } from "@/components/ui/Reveal";

type Params = Promise<{ lang: string }>;

const toLocale = (v: string): Locale => (isLocale(v) ? v : "ka");

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).blog;
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternatesFor(lang, "/blog") };
}

export default async function BlogPage({ params }: { params: Params }) {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).blog;
  const [featured, ...rest] = await getPosts(lang);
  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} image="/images/misty.jpg" />
      <div className="container pt-12 md:pt-16">
        <Reveal>
          <PostCard post={featured} featured />
        </Reveal>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
