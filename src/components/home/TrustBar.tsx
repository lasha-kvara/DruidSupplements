"use client";

import { motion } from "framer-motion";
import { FlaskConical, Leaf, Mountain, Truck } from "lucide-react";
import { fadeUpItem, staggerContainer } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";

const ICONS = [Leaf, Mountain, FlaskConical, Truck];

export function TrustBar() {
  const { t } = useI18n();
  return (
    <section id="trust" className="relative z-10 -mt-10 scroll-mt-24 md:-mt-16">
      <div className="container">
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4"
        >
          {t.trust.map(({ title, text }, i) => {
            const Icon = ICONS[i];
            return (
            <motion.li
              key={title}
              variants={fadeUpItem}
              whileHover={{ y: -4 }}
              className="group rounded-3xl border border-forest/10 bg-white p-4 shadow-soft md:p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-50 text-forest transition-colors duration-300 group-hover:bg-terracotta group-hover:text-white">
                <Icon className="h-6 w-6 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
              </span>
              <h3 className="mt-4 font-sans text-[15px] font-semibold text-forest md:text-lg">{title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-charcoal-soft md:text-sm">{text}</p>
            </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
