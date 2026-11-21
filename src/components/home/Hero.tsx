"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { generalChatUrl } from "@/lib/whatsapp";
import { useI18n } from "@/i18n/I18nProvider";
import { getHomepage } from "@/data";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Deterministic "spores" so server and client render identically. */
const SPORES = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 3 + ((i * 7) % 6),
  duration: 7 + ((i * 5) % 8),
  delay: (i * 0.6) % 5,
}));

function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path
        d="M8 56C8 28 28 8 56 8c0 28-20 48-48 48Z"
        fill="currentColor"
        opacity=".9"
      />
      <path d="M8 56 44 20" stroke="rgba(0,0,0,.25)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function Mushroom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M6 32C6 18 17.6 8 32 8s26 10 26 24c0 2-1.6 3.4-3.6 3.4H9.6C7.6 35.4 6 34 6 32Z" fill="#C86D51" />
      <path d="M26 35h12l-1.6 18a4.4 4.4 0 0 1-8.8 0L26 35Z" fill="#F7F5F0" />
      <circle cx="22" cy="22" r="3" fill="#F7F5F0" opacity=".85" />
      <circle cx="37" cy="18" r="2.4" fill="#F7F5F0" opacity=".85" />
      <circle cx="45" cy="27" r="2" fill="#F7F5F0" opacity=".85" />
    </svg>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { lang, t: dict, path } = useI18n();
  const t = dict.hero;
  // Editable texts and photo: admin → „მთავარი გვერდი“
  const home = getHomepage(lang);
  const hero = home.hero;
  const accentLine = hero.lines.length > 1 ? hero.lines.length - 1 : -1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const floatY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-forest-800">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
        <Image
          src={hero.image}
          alt={t.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-forest-800/80 via-pine/70 to-forest-800/95" />
      <div className="grain pointer-events-none absolute inset-0" />

      {/* Floating spores */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {SPORES.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-cream/40 blur-[1px]"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
            animate={{ y: [0, -40, 0], x: [0, 12, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Floating organic elements (parallax) — kept in the empty right half; each shows only at widths where it cannot overlap the text */}
      <motion.div style={{ y: floatY }} className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute right-[20%] top-[14%] hidden w-28 text-[#4E7559]/60 xl:block"
          animate={{ rotate: [0, 8, 0], y: [0, -14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Leaf />
        </motion.div>
        <motion.div
          className="absolute right-[4%] top-[22%] hidden w-24 lg:block"
          animate={{ rotate: [-6, 6, -6], y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mushroom />
        </motion.div>
        <motion.div
          className="absolute bottom-[14%] right-[10%] hidden w-20 text-terracotta/50 md:block"
          animate={{ rotate: [10, -10, 10], y: [0, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Leaf />
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] right-[34%] hidden w-12 opacity-70 xl:block"
          animate={{ rotate: [4, -8, 4], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mushroom />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container relative z-10 pb-20 pt-28 md:pb-28">
        <div className="max-w-3xl">
          {hero.badge && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-white/10 px-4 py-2 text-xs font-medium text-cream backdrop-blur md:text-sm"
          >
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </span>
            {hero.badge}
          </motion.p>
          )}

          <h1 className="mt-6 font-serif text-[38px] font-bold leading-[1.12] text-cream sm:text-6xl lg:text-7xl">
            {hero.lines.map((line, i) => (
              <span key={`${i}-${line}`} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${i === accentLine ? "text-terracotta-light" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 md:text-xl"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href={path("/catalog")} className="btn-primary group text-base">
              {hero.ctaPrimary}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={generalChatUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light text-base"
            >
              <WhatsAppIcon /> {hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 grid max-w-lg gap-4 border-t border-cream/15 pt-6"
            // column count follows however many stats the editor added
            style={{ gridTemplateColumns: `repeat(${Math.max(1, Math.min(home.stats.length, 4))}, minmax(0, 1fr))` }}
          >
            {home.stats.map(({ value, label }, i) => (
              <div key={i}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-2xl font-semibold text-cream md:text-3xl">{value}</dd>
                <dd className="mt-1 text-xs text-cream/60 md:text-sm">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      <motion.a
        href="#trust"
        aria-label={t.scrollDown}
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 text-cream/60 xl:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-7 w-7" />
      </motion.a>
    </section>
  );
}
