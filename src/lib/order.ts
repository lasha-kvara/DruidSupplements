import { buildWhatsAppUrl } from "./whatsapp";
import { formatAmount, isValidGeorgianPhone } from "./utils";
import { siteConfig } from "@/config/site";

/**
 * Quick-order delivery for a static site (GitHub Pages has no server).
 *
 * 1. If NEXT_PUBLIC_ORDER_ENDPOINT is set (e.g. https://formspree.io/f/xxxx),
 *    the order is POSTed there as JSON and arrives in your email / Formspree inbox.
 * 2. Otherwise WhatsApp opens with a pre-filled call-back request.
 *
 * Never put a Telegram bot token in NEXT_PUBLIC_* variables: everything in a
 * static site is visible to visitors.
 */
export interface QuickOrderPayload {
  name: string;
  phone: string;
  product?: string;
  variant?: string;
  quantity?: number;
  total?: number;
  page?: string;
}

export type OrderChannel = "form" | "whatsapp";

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

export async function submitQuickOrder(order: QuickOrderPayload): Promise<OrderChannel> {
  const endpoint = process.env.NEXT_PUBLIC_ORDER_ENDPOINT;

  if (!endpoint) {
    // Must run synchronously inside the click handler, otherwise popup blockers stop it.
    window.open(buildWhatsAppUrl(buildCallbackMessage(order)), "_blank", "noopener,noreferrer");
    return "whatsapp";
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...order,
      _subject: `ახალი სწრაფი შეკვეთა — ${order.name}`,
      message: buildCallbackMessage(order),
    }),
  });
  if (!res.ok) throw new Error("შეკვეთის გაგზავნა ვერ მოხერხდა. გთხოვთ, მოგვწეროთ WhatsApp-ით.");
  return "form";
}
