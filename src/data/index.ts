/**
 * Client-safe data (bundled as static JSON / code):
 * - settings, testimonials, FAQ — edited in Keystatic, stored in /content/*.json
 * - categories & benefits — fixed in code (src/data/categories.ts)
 * Products and blog posts are read on the server: see ./server.ts.
 */
import type { Locale } from "@/i18n/config";
import type { Benefit, Category, FaqItem, Testimonial } from "./types";
import { benefits as benefitsKa, benefitsEn, categories as categoriesKa, categoriesEn } from "./categories";
import testimonialsJson from "../../content/testimonials.json";
import faqJson from "../../content/faq.json";
import { siteConfig } from "@/config/site";
import { formatAmount } from "@/lib/utils";

type Bi = { ka: string; en: string };
const pick = (lang: Locale, v: Bi) => (lang === "en" ? v.en.trim() || v.ka : v.ka);

export const getCategories = (lang: Locale): Category[] =>
  lang === "en" ? categoriesKa.map((c) => ({ ...c, ...categoriesEn[c.id] })) : categoriesKa;

export const getBenefits = (lang: Locale): Benefit[] =>
  lang === "en" ? benefitsKa.map((b) => ({ ...b, ...benefitsEn[b.id] })) : benefitsKa;

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
