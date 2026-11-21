"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { DruidMark } from "@/components/brand/DruidMark";

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  const { t } = useI18n();
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      {/* Brand mark (variant A). Works on light, dark and photo backgrounds as-is — see brand/logo. */}
      <DruidMark className="h-11 w-auto shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)] md:h-12" />
      <span className="flex flex-col leading-none">
        <span className={cn("text-xl font-bold tracking-tight", light ? "text-cream" : "text-forest")}>{t.site.name}</span>
        <span
          className={cn(
            "mt-1 hidden text-[11px] font-medium leading-none tracking-wide min-[380px]:block",
            light ? "text-cream/70" : "text-charcoal-muted",
          )}
        >
          {t.site.slogan}
        </span>
      </span>
    </span>
  );
}
