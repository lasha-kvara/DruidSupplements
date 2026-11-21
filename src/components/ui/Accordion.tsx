"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | null;
  className?: string;
  variant?: "card" | "plain";
}

export function Accordion({ items, defaultOpen = null, className, variant = "card" }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn(variant === "card" ? "space-y-3" : "divide-y divide-forest/10", className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;
        return (
          <div
            key={item.id}
            className={cn(
              variant === "card" &&
                "overflow-hidden rounded-2xl border bg-surface transition-colors duration-300",
              variant === "card" && (isOpen ? "border-forest/20 shadow-soft" : "border-forest/10"),
            )}
          >
            <h3 className="font-sans text-base">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className={cn(
                  "flex w-full items-center gap-3 text-left font-semibold text-forest",
                  variant === "card" ? "min-h-[60px] px-5 py-4" : "min-h-[56px] py-4",
                )}
              >
                {item.icon && <span className="shrink-0 text-terracotta">{item.icon}</span>}
                <span className="flex-1 leading-snug">{item.title}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                    isOpen ? "bg-terracotta text-white" : "bg-forest/5 text-forest",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className={cn("text-[15px] leading-relaxed text-charcoal-soft", variant === "card" ? "px-5 pb-5" : "pb-5")}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
