import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Bestsellers } from "@/components/home/Bestsellers";
import { ShopByBenefit } from "@/components/home/ShopByBenefit";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { PostCard } from "@/components/blog/PostCard";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { getFaqs, getPosts } from "@/data";
import { getDictionary, isLocale, localizePath } from "@/i18n";

type Params = Promise<{ lang: string }>;

export default async function HomePage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : "ka";
  const t = getDictionary(lang);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: getFaqs(lang).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <Hero />
      <TrustBar />
      <Bestsellers />
      <ShopByBenefit />
      <Testimonials />

      <section className="pb-20 md:pb-28">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow={t.blogSection.eyebrow}
              title={t.blogSection.title}
              description={t.blogSection.description}
            />
            <Link href={localizePath(lang, "/blog")} className="btn-outline group shrink-0">
              {t.common.allArticles} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {getPosts(lang).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
