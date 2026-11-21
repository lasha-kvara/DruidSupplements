import type { FaqItem, Testimonial } from "../types";
import { siteConfig } from "@/config/site";

const d = siteConfig.delivery;

export const testimonialsEn: Record<string, Pick<Testimonial, "name" | "city" | "text" | "product">> = {
  t1: {
    name: "Mariam K.",
    city: "Tbilisi",
    product: "Lion's Mane",
    text: "I've been adding it to my morning coffee for two months. My focus at work has clearly improved and I'm not as tired in the evening. The order arrived the same day.",
  },
  t2: {
    name: "Levan J.",
    city: "Batumi",
    product: "Cordyceps",
    text: "I take it before training and feel the difference in endurance. The crash I used to get after coffee is gone. Excellent quality and beautiful packaging.",
  },
  t3: {
    name: "Eka B.",
    city: "Kutaisi",
    product: "Chaga",
    text: "The whole family drinks Chaga tea in winter. We've hardly caught a cold this season. Ordering through WhatsApp is really convenient.",
  },
  t4: {
    name: "Giorgi N.",
    city: "Telavi",
    product: "Reishi",
    text: "I struggled with sleep for years. Reishi and lemon balm became my evening ritual — now I fall asleep much more easily.",
  },
  t5: {
    name: "Natia T.",
    city: "Rustavi",
    product: "Rosehip",
    text: "I haven't had rosehip like this since childhood — sweet, clean and large hips. The courier arrived exactly on time.",
  },
  t6: {
    name: "Davit M.",
    city: "Zugdidi",
    product: "Lion's Mane Extract",
    text: "The extract is very convenient — I carry it in my bag. The consultation helped me choose the right dose. Highly recommend!",
  },
};

export const faqsEn: FaqItem[] = [
  {
    question: "How does delivery work in Tbilisi?",
    answer: `A courier delivers your order the same or next day. Delivery costs ${d.tbilisiPrice} ₾ and is free for orders over ${d.freeFrom} ₾.`,
  },
  {
    question: "Do you deliver to the regions?",
    answer: `Yes, we deliver to every town and village in Georgia. Regional delivery takes 1–3 business days and costs ${d.regionsPrice} ₾ (free from ${d.freeFrom} ₾).`,
  },
  {
    question: "How can I pay?",
    answer:
      "No online card payment is needed. Pay the courier in cash when you receive your order, or by bank transfer (Bank of Georgia / TBC) — we'll send the details when we confirm your order.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Choose a product and size, then tap “Order via WhatsApp” — the message is filled in automatically. Or use “Quick order by phone”: leave your name and number and a consultant will call you within 15 minutes.",
  },
  {
    question: "How do you check product quality?",
    answer:
      "Every batch is lab-tested for heavy metals, pesticides and microbiological purity. We use only fruiting bodies (not mycelium on grain), with no fillers. We'll send the certificate on request.",
  },
  {
    question: "Can I take several products together?",
    answer:
      "Yes, functional mushrooms are often combined — for example Lion's Mane and Cordyceps in the morning and Reishi in the evening. If you take any medication, consult your doctor first.",
  },
  {
    question: "What is the shelf life and how should I store them?",
    answer:
      "Dried mushrooms and herbs keep for 24 months, extracts for 36 months. Store in a dry, cool place away from direct sunlight, in a tightly closed package.",
  },
];

export const categoriesEn = {
  mushrooms: {
    name: "Medicinal mushrooms",
    description: "Dried and milled functional mushrooms — Lion's Mane, Reishi, Chaga and more.",
  },
  herbs: {
    name: "Medicinal herbs",
    description: "Herbs and fruits gathered in the Caucasus mountains for teas and infusions.",
  },
  extracts: {
    name: "Extracts & tinctures",
    description: "Concentrated dual extracts for easy everyday use.",
  },
} as const;

export const benefitsEn = {
  immunity: { name: "Immunity", description: "Support for your body's natural defences through the seasons" },
  energy: { name: "Energy & focus", description: "Mental clarity, concentration and physical stamina" },
  sleep: { name: "Sleep & stress relief", description: "A calming evening ritual and deep, restorative sleep" },
  digestion: { name: "Digestion", description: "Gut comfort and a healthy microbiome" },
} as const;
