"use client";

import { Leaf, Moon, Shield, Star, Zap, type LucideProps } from "lucide-react";
import type { Benefit } from "@/data/types";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

export function StockBadge({ inStock, className }: { inStock: boolean; className?: string }) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur",
        inStock ? "bg-forest-50/95 text-forest-500" : "bg-black/70 text-white",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", inStock ? "bg-emerald-500" : "bg-white/70")} />
      {inStock ? t.common.inStock : t.common.outOfStock}
    </span>
  );
}

export function NewBadge() {
  const { t } = useI18n();
  return <span className="rounded-full bg-terracotta px-2.5 py-1 text-xs font-semibold text-white">{t.common.isNew}</span>;
}

export function Rating({ value, count, className }: { value: number; count?: number; className?: string }) {
  const { t } = useI18n();
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm text-charcoal-soft", className)}>
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
      <span className="font-semibold text-charcoal">{value.toFixed(1)}</span>
      {count !== undefined && <span className="text-charcoal-muted">({count})</span>}
      <span className="sr-only">{t.common.ratingSr(value)}</span>
    </span>
  );
}

const ICONS = { Shield, Zap, Moon, Leaf } as const;

export function BenefitIcon({ icon, ...props }: { icon: Benefit["icon"] } & LucideProps) {
  const Icon = ICONS[icon];
  return <Icon {...props} />;
}
