import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { formatAmount } from "./utils";

export interface OrderLine {
  productName: string;
  variantLabel: string;
  quantity: number;
  unitPrice: number;
}

/** Total for a single line, rounded to tetri (2 decimals) */
export function lineTotal(line: Pick<OrderLine, "quantity" | "unitPrice">): number {
  return Math.round(line.unitPrice * line.quantity * 100) / 100;
}

/**
 * Pre-filled order message.
 * ka: "გამარჯობა! მსურს შევუკვეთო: [Product], მოცულობა: [Weight], რაოდენობა: [Qty], ჯამური ფასი: [Total] ₾."
 * en: "Hello! I'd like to order: [Product], size: [Weight], quantity: [Qty], total: [Total] ₾."
 */
export function buildOrderMessage(line: OrderLine, lang: Locale = "ka"): string {
  const total = `${formatAmount(lineTotal(line))} ${siteConfig.currency}`;
  return lang === "en"
    ? `Hello! I'd like to order: ${line.productName}, size: ${line.variantLabel}, quantity: ${line.quantity}, total: ${total}.`
    : `გამარჯობა! მსურს შევუკვეთო: ${line.productName}, მოცულობა: ${line.variantLabel}, რაოდენობა: ${line.quantity}, ჯამური ფასი: ${total}.`;
}

/**
 * https://wa.me/<digits>?text=<url-encoded message>
 * encodeURIComponent turns Georgian (UTF-8) text into %E1%83%… sequences,
 * which WhatsApp decodes back on every platform (app and web).
 */
export function buildWhatsAppUrl(message?: string, phone: string = siteConfig.whatsappNumber): string {
  const digits = phone.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function buildOrderWhatsAppUrl(line: OrderLine, lang: Locale = "ka"): string {
  return buildWhatsAppUrl(buildOrderMessage(line, lang));
}

export function generalChatMessage(lang: Locale = "ka"): string {
  return lang === "en"
    ? "Hello! I'm interested in your products. Could you help me choose?"
    : "გამარჯობა! მაინტერესებს თქვენი პროდუქცია. შეგიძლიათ დამეხმაროთ არჩევანში?";
}

export const generalChatUrl = (lang: Locale = "ka") => buildWhatsAppUrl(generalChatMessage(lang));
