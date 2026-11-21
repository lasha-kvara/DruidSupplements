export const locales = ["ka", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ka";

export const isLocale = (v: string | undefined | null): v is Locale => locales.includes(v as Locale);

/** Georgian lives at the root ("/catalog"), English under "/en" ("/en/catalog"). */
export function localizePath(lang: Locale, href: string): string {
  if (!href.startsWith("/") || lang === defaultLocale) return href;
  if (href === "/") return "/en";
  if (href.startsWith("/#") || href.startsWith("/?")) return `/en${href.slice(1)}`;
  return `/en${href}`;
}

/** "/en/catalog" -> "/catalog", "/ka/blog" -> "/blog", "/en" -> "/" */
export function stripLocale(pathname: string): string {
  const m = /^\/(ka|en)(?=\/|$)/.exec(pathname);
  if (!m) return pathname || "/";
  return pathname.slice(m[0].length) || "/";
}

export const otherLocale = (lang: Locale): Locale => (lang === "ka" ? "en" : "ka");

export const htmlLang: Record<Locale, string> = { ka: "ka", en: "en" };
export const ogLocale: Record<Locale, string> = { ka: "ka_GE", en: "en_US" };
