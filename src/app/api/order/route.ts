import { NextResponse } from "next/server";
import { isValidGeorgianPhone } from "@/lib/utils";

export const runtime = "nodejs";

interface QuickOrderPayload {
  name: string;
  phone: string;
  product?: string;
  variant?: string;
  quantity?: number;
  total?: number;
  page?: string;
}

const clean = (v: unknown, max = 120) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function formatMessage(o: QuickOrderPayload): string {
  const lines = [
    "🌿 ახალი სწრაფი შეკვეთა (ზარი)",
    `👤 სახელი: ${o.name}`,
    `📞 ტელეფონი: ${o.phone}`,
  ];
  if (o.product) lines.push(`🛒 პროდუქტი: ${o.product}${o.variant ? ` — ${o.variant}` : ""}`);
  if (o.quantity) lines.push(`🔢 რაოდენობა: ${o.quantity}`);
  if (o.total) lines.push(`💰 ჯამი: ${o.total} ₾`);
  if (o.page) lines.push(`🔗 გვერდი: ${o.page}`);
  lines.push(`🕒 ${new Date().toLocaleString("ka-GE", { timeZone: "Asia/Tbilisi" })}`);
  return lines.join("\n");
}

async function sendToTelegram(text: string, token: string, chatId: string) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!res.ok) throw new Error(`Telegram responded ${res.status}`);
}

async function sendToFormspree(order: QuickOrderPayload, endpoint: string) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...order, _subject: "ახალი სწრაფი შეკვეთა" }),
  });
  if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "არასწორი მოთხოვნა" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields, humans don't.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const order: QuickOrderPayload = {
    name: clean(body.name, 60),
    phone: clean(body.phone, 20),
    product: clean(body.product) || undefined,
    variant: clean(body.variant, 20) || undefined,
    quantity: typeof body.quantity === "number" && body.quantity > 0 ? Math.min(body.quantity, 99) : undefined,
    total: typeof body.total === "number" && body.total > 0 ? body.total : undefined,
    page: clean(body.page, 200) || undefined,
  };

  if (order.name.length < 2) {
    return NextResponse.json({ ok: false, error: "გთხოვთ, მიუთითოთ სახელი" }, { status: 422 });
  }
  if (!isValidGeorgianPhone(order.phone)) {
    return NextResponse.json({ ok: false, error: "გთხოვთ, მიუთითოთ სწორი ტელეფონის ნომერი" }, { status: 422 });
  }

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, FORMSPREE_ENDPOINT } = process.env;

  try {
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      await sendToTelegram(formatMessage(order), TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);
      return NextResponse.json({ ok: true, channel: "telegram" });
    }
    if (FORMSPREE_ENDPOINT) {
      await sendToFormspree(order, FORMSPREE_ENDPOINT);
      return NextResponse.json({ ok: true, channel: "formspree" });
    }
    // No channel configured: log it, and tell the browser to hand the order to WhatsApp instead.
    console.info("[quick-order] No delivery channel configured. Order:\n" + formatMessage(order));
    return NextResponse.json({ ok: false, notConfigured: true }, { status: 503 });
  } catch (error) {
    console.error("[quick-order] delivery failed", error);
    return NextResponse.json(
      { ok: false, error: "შეკვეთის გაგზავნა ვერ მოხერხდა. გთხოვთ, დაგვიკავშირდეთ WhatsApp-ით." },
      { status: 502 },
    );
  }
}
