/**
 * Client-safe data (bundled as static JSON / code):
 * - home page, settings, testimonials, FAQ — edited in Keystatic, stored in /content/*.json
 * Products, posts, categories and benefits are read on the server: see ./server.ts.
 */
import type { Locale } from "@/i18n/config";
import type { FaqItem, Testimonial } from "./types";
import testimonialsJson from "../../content/testimonials.json";
import faqJson from "../../content/faq.json";
import homepageJson from "../../content/homepage.json";
import { siteConfig } from "@/config/site";
import { formatAmount } from "@/lib/utils";

type Bi = { ka: string; en: string };
const pick = (lang: Locale, v: Bi) => (lang === "en" ? v.en.trim() || v.ka : v.ka);

export const getTestimonials = (lang: Locale): Testimonial[] =>
  testimonialsJson.items.map((t, i) => ({
    id: `t${i}`,
    name: pick(lang, t.name),
    city: pick(lang, t.city),
    product: pick(lang, t.product),
    rating: t.rating ?? 5,
    text: pick(lang, t.text),
  }));

/**
 * FAQ text may contain {tbilisiPrice}, {regionsPrice}, {freeFrom} — filled from the delivery prices in
 * „საკონტაქტო და მიწოდება“ (content/settings.json), so prices are edited in one place only.
 */
const fillDeliveryPlaceholders = (text: string) =>
  text.replace(/\{(tbilisiPrice|regionsPrice|freeFrom)\}/g, (_, key: keyof typeof siteConfig.delivery) =>
    formatAmount(siteConfig.delivery[key]),
  );

export const getFaqs = (lang: Locale): FaqItem[] =>
  faqJson.items.map((f) => ({
    question: fillDeliveryPlaceholders(pick(lang, f.question)),
    answer: fillDeliveryPlaceholders(pick(lang, f.answer)),
  }));

export interface SectionHeadingText {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HomepageContent {
  hero: {
    badge: string;
    lines: string[];
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
  };
  stats: { value: string; label: string }[];
  trust: { icon: string; title: string; text: string }[];
  bestsellers: SectionHeadingText;
  benefits: SectionHeadingText;
  testimonials: SectionHeadingText;
  blog: SectionHeadingText;
  faq: SectionHeadingText;
}

type Bin = { ka: string; en: string } | null | undefined;
const pickOpt = (lang: Locale, v: Bin) => (v ? pick(lang, { ka: v.ka ?? "", en: v.en ?? "" }) : "");

/** Home page texts (admin → „მთავარი გვერდი“, content/homepage.json) in the requested language. */
export function getHomepage(lang: Locale): HomepageContent {
  const h = homepageJson;
  const section = (s: { eyebrow: Bin; title: Bin; description: Bin }): SectionHeadingText => ({
    eyebrow: pickOpt(lang, s.eyebrow),
    title: pickOpt(lang, s.title),
    description: pickOpt(lang, s.description),
  });
  return {
    hero: {
      badge: pickOpt(lang, h.hero.badge),
      lines: [h.hero.line1, h.hero.line2, h.hero.line3].map((l) => pickOpt(lang, l)).filter(Boolean),
      sub: pickOpt(lang, h.hero.sub),
      ctaPrimary: pickOpt(lang, h.hero.ctaPrimary),
      ctaSecondary: pickOpt(lang, h.hero.ctaSecondary),
      image: h.hero.image || "/images/forest.jpg",
    },
    stats: h.stats.map((s) => ({ value: pickOpt(lang, s.value), label: pickOpt(lang, s.label) })),
    trust: h.trust.map((t) => ({ icon: t.icon, title: pickOpt(lang, t.title), text: pickOpt(lang, t.text) })),
    bestsellers: section(h.bestsellers),
    benefits: section(h.benefits),
    testimonials: section(h.testimonials),
    blog: section(h.blog),
    faq: section(h.faq),
  };
}
