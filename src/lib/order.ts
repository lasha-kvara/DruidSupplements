import { buildWhatsAppUrl } from "./whatsapp";
import { formatAmount, isValidGeorgianPhone } from "./utils";
import { siteConfig } from "@/config/site";

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
}

/** "server" = delivered to Telegram/Formspree; "whatsapp" = customer must send the WhatsApp message */
export type OrderChannel = "server" | "whatsapp";

export function validateQuickOrder({ name, phone }: Pick<QuickOrderPayload, "name" | "phone">): string | null {
  if (name.trim().length < 2) return "გთხოვთ, მიუთითოთ სახელი";
  if (!isValidGeorgianPhone(phone)) return "გთხოვთ, მიუთითოთ სწორი ნომერი (მაგ. 555 12 34 56)";
  return null;
}

export function buildCallbackMessage(o: QuickOrderPayload): string {
  const parts = [`გამარჯობა! გთხოვთ დამირეკოთ. სახელი: ${o.name.trim()}, ტელეფონი: ${o.phone.trim()}.`];
  if (o.product) {
    parts.push(
      `მსურს შევუკვეთო: ${o.product}${o.variant ? `, მოცულობა: ${o.variant}` : ""}${o.quantity ? `, რაოდენობა: ${o.quantity}` : ""}${o.total ? `, ჯამური ფასი: ${formatAmount(o.total)} ${siteConfig.currency}` : ""}.`,
    );
  }
  return parts.join(" ");
}

export const callbackWhatsAppUrl = (o: QuickOrderPayload) => buildWhatsAppUrl(buildCallbackMessage(o));

export async function submitQuickOrder(order: QuickOrderPayload): Promise<OrderChannel> {
  const res = await fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; notConfigured?: boolean };
  if (data.notConfigured) return "whatsapp";
  if (!res.ok || !data.ok) throw new Error(data.error ?? "შეკვეთის გაგზავნა ვერ მოხერხდა. გთხოვთ, მოგვწეროთ WhatsApp-ით.");
  return "server";
}
