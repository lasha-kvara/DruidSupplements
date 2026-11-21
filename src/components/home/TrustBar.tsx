"use client";

import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import { getHomepage } from "@/data";
import { PickableIcon } from "@/components/ui/PickableIcon";

/** Desktop columns follow the number of cards (static class names so Tailwind keeps them). */
const LG_COLS: Record<number, string> = { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

export function TrustBar() {
  const { lang } = useI18n();
  // Cards, icons and texts: admin → „მთავარი გვერდი“ → „უპირატესობების ბარათები“
  const items = getHomepage(lang).trust;
  if (!items.length) return null;
  return (
    <section id="trust" className="relative z-10 -mt-10 scroll-mt-24 md:-mt-16">
      <div className="container">
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className={`grid grid-cols-2 gap-3 md:gap-5 ${LG_COLS[Math.min(items.length, 4)]}`}
        >
          {items.map(({ icon, title, text }, i) => {
            return (
            <motion.li
              key={`${i}-${title}`}
              variants={fadeUpItem}
              whileHover={{ y: -4 }}
              className="group rounded-3xl border border-forest/10 bg-surface p-4 shadow-soft md:p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-50 text-forest transition-colors duration-300 group-hover:bg-terracotta group-hover:text-white">
                <PickableIcon name={icon} className="h-6 w-6 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
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
