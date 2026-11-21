"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getBestsellers } from "@/lib/catalog";
import type { Product } from "@/data/types";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading, fadeUpItem, staggerContainer } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import { getHomepage } from "@/data";

export function Bestsellers({ products }: { products: Product[] }) {
  const { lang, t, path } = useI18n();
  const heading = getHomepage(lang).bestsellers;
  const items = getBestsellers(products, 6);
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
          />
          <Link href={path("/catalog")} className="btn-outline group shrink-0">
            {t.common.fullCatalog}
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
