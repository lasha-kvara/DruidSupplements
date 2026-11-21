import { siteConfig } from "@/config/site";
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
 * Builds the pre-filled Georgian order message, exactly:
 * "გამარჯობა! მსურს შევუკვეთო: [Product], მოცულობა: [Weight], რაოდენობა: [Qty], ჯამური ფასი: [Total] ₾."
 */
export function buildOrderMessage(line: OrderLine): string {
  const total = formatAmount(lineTotal(line));
  return `გამარჯობა! მსურს შევუკვეთო: ${line.productName}, მოცულობა: ${line.variantLabel}, რაოდენობა: ${line.quantity}, ჯამური ფასი: ${total} ${siteConfig.currency}.`;
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

export function buildOrderWhatsAppUrl(line: OrderLine): string {
  return buildWhatsAppUrl(buildOrderMessage(line));
}

export const generalChatMessage = "გამარჯობა! მაინტერესებს თქვენი პროდუქცია. შეგიძლიათ დამეხმაროთ არჩევანში?";
