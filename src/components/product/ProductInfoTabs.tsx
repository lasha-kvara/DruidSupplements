"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { AlertTriangle, Check, Leaf, MapPin, Pill, Sparkles } from "lucide-react";
import type { ProductDetails } from "@/data/types";
import { Accordion } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

function buildSections(d: ProductDetails): Section[] {
  return [
    {
      id: "benefits",
      title: "სასარგებლო თვისებები",
      icon: <Sparkles className="h-5 w-5" />,
      content: (
        <ul className="space-y-3">
          {d.benefits.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-400">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "usage",
      title: "მიღების წესი და დოზირება",
      icon: <Pill className="h-5 w-5" />,
      content: (
        <div className="space-y-5">
          <p>{d.usage}</p>
          <div className="rounded-2xl bg-parchment p-4">
            <p className="mb-2 text-sm font-semibold text-forest">რეკომენდებული დოზა</p>
            <ul className="space-y-2 text-[15px]">
              {d.dosage.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "origin",
      title: "შემადგენლობა და წარმომავლობა",
      icon: <Leaf className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-sm font-semibold text-forest">შემადგენლობა</p>
            <p>{d.ingredients}</p>
          </div>
          <div className="flex gap-3 rounded-2xl bg-forest-50 p-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-forest-400" />
            <p>{d.origin}</p>
          </div>
        </div>
      ),
    },
    {
      id: "safety",
      title: "უკუჩვენებები",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <ul className="space-y-3">
            {d.contraindications.map((c) => (
              <li key={c} className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border border-terracotta/30 bg-terracotta-50 p-4 text-sm">
            ბიოლოგიურად აქტიური დანამატი არ არის მედიკამენტი. გამოყენებამდე, განსაკუთრებით ქრონიკული დაავადებისა
            ან მედიკამენტების მიღების შემთხვევაში, გაიარეთ კონსულტაცია ექიმთან.
          </p>
        </div>
      ),
    },
  ];
}

/** Tabs on desktop, accordion on mobile (better for thumbs and small screens). */
export function ProductInfoTabs({ details }: { details: ProductDetails }) {
  const sections = buildSections(details);
  const [active, setActive] = useState(sections[0].id);
  const current = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <div>
      <div className="md:hidden">
        <Accordion
          defaultOpen="benefits"
          items={sections.map((s) => ({ id: s.id, title: s.title, icon: s.icon, content: s.content }))}
        />
      </div>

      <div className="hidden md:block">
        <LayoutGroup id="info-tabs">
          <div role="tablist" className="flex gap-1 rounded-full bg-white p-1.5 ring-1 ring-forest/10">
            {sections.map((s) => {
              const isActive = s.id === active;
              return (
                <button
                  key={s.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`tab-panel-${s.id}`}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "relative flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-3 text-sm font-semibold transition-colors",
                    isActive ? "text-parchment" : "text-forest hover:bg-forest/5",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="info-tab-bg"
                      className="absolute inset-0 rounded-full bg-forest"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{s.icon}</span>
                  <span className="relative">{s.title}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="mt-6 min-h-[220px] rounded-3xl bg-white p-8 ring-1 ring-forest/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              id={`tab-panel-${current.id}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl text-base leading-relaxed text-charcoal-soft"
            >
              {current.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
