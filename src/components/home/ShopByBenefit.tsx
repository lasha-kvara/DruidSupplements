"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getHomepage } from "@/data";
import type { Benefit, Product } from "@/data/types";
import { useI18n } from "@/i18n/I18nProvider";
import { PickableIcon } from "@/components/ui/PickableIcon";

/** Desktop columns follow the number of benefits (static class names so Tailwind keeps them). */
const LG_COLS: Record<number, string> = { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };
import { SectionHeading, fadeUpItem, staggerContainer } from "@/components/ui/Reveal";

export function ShopByBenefit({ products, benefits }: { products: Product[]; benefits: Benefit[] }) {
  const { lang, t, path } = useI18n();
  const heading = getHomepage(lang).benefits;
  if (!benefits.length) return null;
  return (
    <section className="relative overflow-hidden bg-pine py-20 text-cream md:py-28">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-terracotta/20 blur-3xl" />
      <div className="container relative">
        <SectionHeading
          light
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className={`mt-12 grid gap-4 sm:grid-cols-2 ${LG_COLS[Math.min(benefits.length, 4)]}`}
        >
          {benefits.map((b) => {
            const count = products.filter((p) => p.benefits.includes(b.id)).length;
            return (
              <motion.div key={b.id} variants={fadeUpItem}>
                <Link
                  href={path(`/catalog?benefit=${b.id}`)}
                  className="group relative block h-72 overflow-hidden rounded-3xl md:h-96"
                >
                  <Image
                    src={b.image ?? "/images/leaves.jpg"}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-800 via-forest-800/50 to-forest-800/10 transition-colors duration-500 group-hover:via-forest-800/60" />
                  <div className="absolute inset-0 flex flex-col p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-cream backdrop-blur transition-all duration-300 group-hover:bg-terracotta">
                      <PickableIcon name={b.icon} className="h-6 w-6" />
                    </span>
                    <div className="mt-auto">
                      <p className="text-xs font-medium text-cream/60">{t.common.productsCount(count)}</p>
                      <h3 className="mt-1 text-2xl font-semibold text-cream">{b.name}</h3>
                      <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-cream/75 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 max-md:max-h-24 max-md:opacity-100">
                        {b.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta-light">
                        {t.common.view}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
