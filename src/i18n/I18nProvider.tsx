"use client";

import { createContext, useContext, useMemo } from "react";
import { getDictionary, localizePath, type Dictionary, type Locale } from "./index";

interface I18nValue {
  lang: Locale;
  t: Dictionary;
  /** Locale-aware internal href: path("/catalog") -> "/en/catalog" in English */
  path: (href: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  const value = useMemo<I18nValue>(
    () => ({ lang, t: getDictionary(lang), path: (href: string) => localizePath(lang, href) }),
    [lang],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
