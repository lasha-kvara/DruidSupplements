"use client";

import { useRouter } from "next/navigation";
import { localizePath, stripLocale, type Locale } from "@/i18n";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

const OPTIONS: { lang: Locale; label: string; full: string }[] = [
  { lang: "ka", label: "ქარ", full: "ქართული" },
  { lang: "en", label: "EN", full: "English" },
];

/**
 * Segmented ka / EN toggle. Keeps the current page, query and hash:
 * /catalog?benefit=sleep  <->  /en/catalog?benefit=sleep
 */
export function LanguageSwitcher({ light = false, className }: { light?: boolean; className?: string }) {
  const { lang, t } = useI18n();
  const router = useRouter();

  const switchTo = (target: Locale) => {
    if (target === lang) return;
    const { pathname, search, hash } = window.location;
    const next = localizePath(target, stripLocale(pathname)) + search + hash;
    try {
      document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      /* cookies disabled — switching still works */
    }
    router.push(next, { scroll: false });
  };

  return (
    <div
      role="group"
      aria-label={t.langSwitch.label}
      className={cn(
        "relative flex h-10 items-center rounded-full p-1 text-[13px] font-semibold",
        light ? "bg-white/10 ring-1 ring-white/20" : "bg-forest/5 ring-1 ring-forest/10",
        className,
      )}
    >
      {OPTIONS.map((o) => {
        const active = o.lang === lang;
        return (
          <button
            key={o.lang}
            type="button"
            lang={o.lang}
            aria-pressed={active}
            aria-label={o.full}
            title={o.full}
            onClick={() => switchTo(o.lang)}
            className={cn(
              "relative z-10 flex h-8 min-w-[42px] items-center justify-center rounded-full px-2.5 transition-colors",
              active ? (light ? "text-forest" : "text-parchment") : light ? "text-parchment/80 hover:text-parchment" : "text-forest/70 hover:text-forest",
            )}
          >
            {/* Plain element, no layoutId: switching language is a full navigation anyway, and a
                shared-layout animation inside the fixed header jumped from the old scroll position. */}
            {active && (
              <span
                className={cn(
                  "absolute inset-0 -z-10 rounded-full transition-colors duration-300",
                  light ? "bg-parchment" : "bg-forest",
                )}
              />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
