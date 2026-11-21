import type { Metadata } from "next";
import { posts } from "@/data/posts";
import { PageHeader } from "@/components/layout/PageHeader";
import { PostCard } from "@/components/blog/PostCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "ბლოგი — სამკურნალო სოკოები და მცენარეები",
  description:
    "საგანმანათლებლო სტატიები ლომის ფაფრის, ჩაგას, რეიშისა და სხვა სამკურნალო სოკოებისა და მცენარეების შესახებ.",
};

export default function BlogPage() {
  const [featured, ...rest] = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHeader
        eyebrow="ბლოგი"
        title="ცოდნა ტყიდან"
        description="სანდო, მარტივად ასახსნელი ინფორმაცია ფუნქციური სოკოებისა და სამკურნალო მცენარეების შესახებ."
        image="/images/misty.jpg"
      />
      <div className="container py-12 md:py-16">
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
