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
    description: "კავკასიის მთებში შეგროვებული ბალახები და ნაყოფები ჩაისა და ნაყენისთვის.",
  },
  {
    id: "extracts",
    name: "ექსტრაქტები და ნაყენები",
    description: "კონცენტრირებული ორმაგი ექსტრაქტები მარტივი ყოველდღიური მიღებისთვის.",
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
