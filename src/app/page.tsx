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
import { posts } from "@/data/posts";
import { faqs } from "@/data/content";

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
              eyebrow="ბლოგი"
              title="ისწავლეთ ბუნების ენა"
              description="სტატიები სამკურნალო სოკოებისა და მცენარეების შესახებ — სწორი მიღება, რეცეპტები და კვლევები."
            />
            <Link href="/blog" className="btn-outline group shrink-0">
              ყველა სტატია <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
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
