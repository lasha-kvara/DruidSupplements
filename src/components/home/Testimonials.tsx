"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/content";
import { SectionHeading } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Shows 1 card on mobile, 3 on desktop; auto-advances, pauses on hover, swipeable. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((i) => (i + delta + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => go(1), 6000);
    return () => window.clearInterval(t);
  }, [go, paused]);

  const visible = [0, 1, 2].map((offset) => testimonials[(index + offset) % total]);

  return (
    <section className="py-20 md:py-28" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container">
        <SectionHeading
          eyebrow="შეფასებები"
          title="რას ამბობენ ჩვენი მომხმარებლები"
          description="4.9 საშუალო შეფასება 800-ზე მეტი მიმოხილვიდან"
        />

        <div className="relative mt-12">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              className="grid cursor-grab gap-5 active:cursor-grabbing md:grid-cols-3"
            >
              {visible.map((t, i) => (
                <figure
                  key={t.id}
                  className={cn(
                    "relative flex flex-col rounded-3xl border border-forest/10 bg-white p-6 shadow-soft md:p-7",
                    i > 0 && "hidden md:flex",
                  )}
                >
                  <Quote className="absolute right-6 top-6 h-10 w-10 text-terracotta/15" aria-hidden />
                  <div className="flex gap-0.5" aria-label={`შეფასება ${t.rating} 5-დან`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={cn("h-4 w-4", s < t.rating ? "fill-amber-400 text-amber-400" : "text-forest/15")}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-charcoal-soft">„{t.text}“</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-forest/10 pt-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest font-serif text-lg text-parchment">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-semibold text-forest">{t.name}</span>
                      <span className="block text-xs text-charcoal-muted">
                        {t.city} · {t.product}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="წინა"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-forest/15 bg-white text-forest transition hover:bg-forest hover:text-parchment"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`შეფასება ${i + 1}`}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className="flex h-6 items-center"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all duration-300",
                    i === index ? "w-7 bg-terracotta" : "w-2 bg-forest/20",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="შემდეგი"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-forest/15 bg-white text-forest transition hover:bg-forest hover:text-parchment"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
