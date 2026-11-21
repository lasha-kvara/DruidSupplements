import { buildWhatsAppUrl } from "./whatsapp";
import { formatAmount, isValidGeorgianPhone } from "./utils";
import { siteConfig } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n";

/**
 * Quick-order ("დამირეკეთ") client.
 * Posts to /api/order, which forwards to Telegram or Formspree (server env vars).
 * If no channel is configured on the server, the modal offers WhatsApp instead,
 * so an order is never silently lost.
 */
export interface QuickOrderPayload {
  name: string;
  phone: string;
  website?: string; // honeypot
  product?: string;
  variant?: string;
  quantity?: number;
  total?: number;
  page?: string;
  lang?: Locale;
}

/** "server" = delivered to Telegram/Formspree; "whatsapp" = customer must send the WhatsApp message */
export type OrderChannel = "server" | "whatsapp";

export function validateQuickOrder(
  { name, phone }: Pick<QuickOrderPayload, "name" | "phone">,
  lang: Locale,
): string | null {
  const t = getDictionary(lang).quickOrder;
  if (name.trim().length < 2) return t.errorName;
  if (!isValidGeorgianPhone(phone)) return t.errorPhone;
  return null;
}

export function buildCallbackMessage(o: QuickOrderPayload, lang: Locale): string {
  const total = o.total ? `${formatAmount(o.total)} ${siteConfig.currency}` : "";
  if (lang === "en") {
    const parts = [`Hello! Please call me back. Name: ${o.name.trim()}, phone: ${o.phone.trim()}.`];
    if (o.product) {
      parts.push(
        `I'd like to order: ${o.product}${o.variant ? `, size: ${o.variant}` : ""}${o.quantity ? `, quantity: ${o.quantity}` : ""}${total ? `, total: ${total}` : ""}.`,
      );
    }
    return parts.join(" ");
  }
  const parts = [`გამარჯობა! გთხოვთ დამირეკოთ. სახელი: ${o.name.trim()}, ტელეფონი: ${o.phone.trim()}.`];
  if (o.product) {
    parts.push(
      `მსურს შევუკვეთო: ${o.product}${o.variant ? `, მოცულობა: ${o.variant}` : ""}${o.quantity ? `, რაოდენობა: ${o.quantity}` : ""}${total ? `, ჯამური ფასი: ${total}` : ""}.`,
    );
  }
  return parts.join(" ");
}

export const callbackWhatsAppUrl = (o: QuickOrderPayload, lang: Locale) =>
  buildWhatsAppUrl(buildCallbackMessage(o, lang));

export async function submitQuickOrder(order: QuickOrderPayload, lang: Locale): Promise<OrderChannel> {
  const t = getDictionary(lang).quickOrder;
  const res = await fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...order, lang }),
  });
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; notConfigured?: boolean };
  if (data.notConfigured) return "whatsapp";
  if (res.status === 422) throw new Error(t.errorPhone);
  if (!res.ok || !data.ok) throw new Error(t.errorFailed);
  return "server";
}
