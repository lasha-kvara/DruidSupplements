"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  const { t } = useI18n();
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden>
        {/* Theme-aware: dark disc on light pages, light disc in dark mode (always light over the hero photo) */}
        <circle cx="20" cy="20" r="20" fill={light ? "#F7F5F0" : "rgb(var(--c-forest))"} />
        <path d="M8 21.5C8 14.6 13.4 9 20 9s12 5.6 12 12.5c0 1-.8 1.8-1.8 1.8H9.8c-1 0-1.8-.8-1.8-1.8Z" fill="#C86D51" />
        <path d="M17 23.3h6l-.9 8.2a2.1 2.1 0 0 1-4.2 0l-.9-8.2Z" fill={light ? "#1B3022" : "rgb(var(--c-parchment))"} />
        <circle cx="16" cy="17" r="1.6" fill="#F7F5F0" opacity=".85" />
        <circle cx="23" cy="15" r="1.3" fill="#F7F5F0" opacity=".85" />
        <circle cx="26" cy="19" r="1" fill="#F7F5F0" opacity=".85" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn("text-xl font-bold tracking-tight", light ? "text-cream" : "text-forest")}>{t.site.name}</span>
        <span
          className={cn(
            "mt-1 hidden text-[10px] font-medium tracking-wide min-[380px]:block",
            light ? "text-cream/70" : "text-charcoal-muted",
          )}
        >
          {t.site.slogan}
        </span>
      </span>
    </span>
  );
}
