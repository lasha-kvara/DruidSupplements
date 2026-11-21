import type { Benefit, Category } from "./types";

export const categories: Category[] = [
  {
    id: "mushrooms",
    name: "სამკურნალო სოკოები",
    description: "გამხმარი და დაფქვილი ფუნქციური სოკოები — ლომის ფაფარი, რეიში, ჩაგა და სხვა.",
  },
  {
    id: "herbs",
    name: "სამკურნალო მცენარეები",
    description: "კავკასიის მთებში შეგროვებული ბალახები და ნაყოფები ჩაისთვის.",
  },
];

export const benefits: Benefit[] = [
  {
    id: "immunity",
    name: "იმუნიტეტი",
    description: "ორგანიზმის ბუნებრივი თავდაცვის მხარდაჭერა სეზონურ პერიოდში",
    icon: "Shield",
    image: "/images/chaga-1.jpg",
  },
  {
    id: "energy",
    name: "ენერგია და ფოკუსი",
    description: "გონებრივი სიცხადე, კონცენტრაცია და ფიზიკური გამძლეობა",
    icon: "Zap",
    image: "/images/cordyceps-1.jpg",
  },
  {
    id: "sleep",
    name: "ძილი და სტრესის მოხსნა",
    description: "დამამშვიდებელი რიტუალი საღამოსთვის და ღრმა, აღმდგენი ძილი",
    icon: "Moon",
    image: "/images/lemon-balm-1.jpg",
  },
  {
    id: "digestion",
    name: "საჭმლის მონელება",
    description: "კუჭ-ნაწლავის კომფორტი და ჯანსაღი მიკროფლორა",
    icon: "Leaf",
    image: "/images/mint-1.jpg",
  },
];

export const categoryById = (id: string) => categories.find((c) => c.id === id);
export const benefitById = (id: string) => benefits.find((b) => b.id === id);

/** English names/descriptions for the fixed categories and benefits */
export const categoriesEn = {
  mushrooms: {
    name: "Medicinal mushrooms",
    description: "Dried and milled functional mushrooms — Lion's Mane, Reishi, Chaga and more.",
  },
  herbs: {
    name: "Medicinal herbs",
    description: "Herbs and fruits gathered in the Caucasus mountains for herbal teas.",
  },
} as const;

export const benefitsEn = {
  immunity: { name: "Immunity", description: "Support for your body's natural defences through the seasons" },
  energy: { name: "Energy & focus", description: "Mental clarity, concentration and physical stamina" },
  sleep: { name: "Sleep & stress relief", description: "A calming evening ritual and deep, restorative sleep" },
  digestion: { name: "Digestion", description: "Gut comfort and a healthy microbiome" },
} as const;
