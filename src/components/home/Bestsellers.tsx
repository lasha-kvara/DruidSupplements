"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getBestsellers } from "@/lib/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading, fadeUpItem, staggerContainer } from "@/components/ui/Reveal";

export function Bestsellers() {
  const items = getBestsellers(6);
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="ბესტსელერები"
            title="მომხმარებლების ფავორიტები"
            description="ჩვენი ყველაზე მოთხოვნადი სოკოები და ექსტრაქტები — შეუკვეთეთ ერთი შეხებით WhatsApp-ით ან ზარით."
          />
          <Link href="/catalog" className="btn-outline group shrink-0">
            სრული კატალოგი
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((p) => (
            <motion.div key={p.slug} variants={fadeUpItem}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
