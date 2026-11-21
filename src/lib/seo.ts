import type { Metadata } from "next";
import { localizePath, type Locale } from "@/i18n/config";

/** canonical + hreflang alternates for a locale-less path like "/catalog" */
export function alternatesFor(lang: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: localizePath(lang, path),
    languages: { ka: localizePath("ka", path), en: localizePath("en", path), "x-default": localizePath("ka", path) },
  };
}
