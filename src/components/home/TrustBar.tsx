"use client";

import { motion } from "framer-motion";
import { FlaskConical, Leaf, Mountain, Truck } from "lucide-react";
import { fadeUpItem, staggerContainer } from "@/components/ui/Reveal";

const ITEMS = [
  {
    icon: Leaf,
    title: "100% ორგანული",
    text: "ქიმიური სასუქების, შემავსებლებისა და კონსერვანტების გარეშე",
  },
  {
    icon: Mountain,
    title: "ველურად შეგროვებული",
    text: "კავკასიის მთებისა და ტყეების ეკოლოგიურად სუფთა ზონებიდან",
  },
  {
    icon: FlaskConical,
    title: "ლაბორატორიული კონტროლი",
    text: "ყოველი პარტია მოწმდება მძიმე მეტალებსა და მიკრობიოლოგიაზე",
  },
  {
    icon: Truck,
    title: "სწრაფი მიწოდება",
    text: "თბილისში 24 საათში, რეგიონებში 1–3 სამუშაო დღეში",
  },
];

export function TrustBar() {
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
          {ITEMS.map(({ icon: Icon, title, text }) => (
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
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
