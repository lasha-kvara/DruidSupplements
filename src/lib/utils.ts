import clsx, { type ClassValue } from "clsx";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

/** "/images/a.jpg" -> "https://<site>/<base>/images/a.jpg" (siteConfig.url already includes the base path) */
export function absoluteUrl(path: string): string {
  return `${siteConfig.url.replace(/\/$/, "")}${path}`;
}

/** 35 -> "35", 12.5 -> "12.50" */
export function formatAmount(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

/** 35 -> "35 ₾" */
export function formatPrice(value: number): string {
  return `${formatAmount(value)} ${siteConfig.currency}`;
}

const GEORGIAN_MONTHS = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი",
];

const ENGLISH_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * "2026-10-28" -> "28 ოქტომბერი, 2026" / "October 28, 2026".
 * Deterministic (no Intl), so server and client render the same string.
 */
export function formatDate(iso: string, lang: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  return lang === "en" ? `${ENGLISH_MONTHS[m - 1]} ${d}, ${y}` : `${d} ${GEORGIAN_MONTHS[m - 1]}, ${y}`;
}

/** Lowercase + trim for search; Georgian Mkhedruli has no case, Latin does. */
export function normalize(text: string): string {
  return text.toLocaleLowerCase().replace(/\s+/g, " ").trim();
}

/** Georgian mobile: 5XX XXX XXX, optionally prefixed with +995 / 995 */
export function isValidGeorgianPhone(input: string): boolean {
  const digits = input.replace(/\D/g, "");
  const local = digits.startsWith("995") ? digits.slice(3) : digits;
  return /^5\d{8}$/.test(local) || /^(32|3\d|4\d)\d{7}$/.test(local);
}
