"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Banknote, Minus, PhoneCall, Plus, ShieldCheck, Truck } from "lucide-react";
import type { Product } from "@/data/types";
import { siteConfig } from "@/config/site";
import { cn, formatAmount } from "@/lib/utils";
import { buildOrderWhatsAppUrl, lineTotal } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useQuickOrder } from "@/components/order/QuickOrderProvider";
import { useI18n } from "@/i18n/I18nProvider";

const MAX_QTY = 20;

/** Animated number: old value slides out, new one slides in. */
function AnimatedPrice({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("relative inline-flex overflow-hidden", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {formatAmount(value)}
        </motion.span>
      </AnimatePresence>
      <span className="ml-1">{siteConfig.currency}</span>
    </span>
  );
}

export function ProductPurchase({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const { openQuickOrder } = useQuickOrder();
  const { lang, t: dict } = useI18n();
  const t = dict.product;

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const total = lineTotal({ unitPrice: variant.price, quantity: qty });
  const oldTotal = variant.oldPrice ? lineTotal({ unitPrice: variant.oldPrice, quantity: qty }) : null;
  const freeDelivery = total >= siteConfig.delivery.freeFrom;
  const remaining = siteConfig.delivery.freeFrom - total;

  const line = { productName: product.name, variantLabel: variant.label, quantity: qty, unitPrice: variant.price };
  const whatsappUrl = buildOrderWhatsAppUrl(line, lang);

  return (
    <div>
      {/* Variant selector */}
      <fieldset>
        <legend className="text-sm font-semibold text-forest">{t.chooseSize}</legend>
        <LayoutGroup id="variants">
          <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup">
            {product.variants.map((v) => {
              const active = v.id === variant.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setVariantId(v.id)}
                  className={cn(
                    "relative flex min-h-[64px] flex-col items-center justify-center rounded-2xl border-2 px-2 py-2 transition-colors",
                    active ? "border-forest text-cream" : "border-forest/15 bg-surface text-forest hover:border-forest/40",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="variant-bg"
                      className="absolute inset-0 rounded-[14px] bg-pine dark:bg-forest-200"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative text-base font-bold">{v.label}</span>
                  <span className={cn("relative text-xs", active ? "text-cream/85" : "text-charcoal-muted")}>
                    {formatAmount(v.price)} {siteConfig.currency}
                  </span>
                  {v.oldPrice && (
                    <span className="absolute -right-1.5 -top-2.5 rounded-full bg-terracotta-deep px-1.5 py-0.5 text-[11px] font-bold leading-tight text-white">
                      -{Math.round((1 - v.price / v.oldPrice) * 100)}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </fieldset>

      {/* Quantity + price */}
      <div className="mt-6 flex items-center justify-between gap-4 rounded-3xl bg-surface p-4 ring-1 ring-forest/10">
        <div className="flex items-center rounded-full bg-parchment p-1">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label={t.decrease}
            className="flex h-11 w-11 items-center justify-center rounded-full text-forest transition hover:bg-surface disabled:opacity-30"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-9 text-center text-lg font-bold tabular-nums text-forest" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
            disabled={qty >= MAX_QTY}
            aria-label={t.increase}
            className="flex h-11 w-11 items-center justify-center rounded-full text-forest transition hover:bg-surface disabled:opacity-30"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="text-right">
          <p className="text-xs text-charcoal-muted">{t.total}</p>
          <div className="flex items-baseline justify-end gap-2">
            {oldTotal && (
              <span className="text-sm text-charcoal-muted line-through">
                {formatAmount(oldTotal)} {siteConfig.currency}
              </span>
            )}
            <AnimatedPrice value={total} className="text-3xl font-bold text-terracotta-dark" />
          </div>
        </div>
      </div>

      {/* Free delivery progress */}
      <div className="mt-3 px-1">
        <div className="h-1.5 overflow-hidden rounded-full bg-forest/10">
          <motion.div
            className="h-full rounded-full bg-forest-400"
            initial={false}
            animate={{ width: `${Math.min(100, (total / siteConfig.delivery.freeFrom) * 100)}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
        <p className="mt-2 text-xs text-charcoal-soft">
          {freeDelivery ? (
            <span className="font-semibold text-forest-400">{t.freeDelivery}</span>
          ) : (
            <>
              {t.addMoreBefore}
              <b>
                {formatAmount(remaining)} {siteConfig.currency}
              </b>
              {t.addMoreAfter}
            </>
          )}
        </p>
      </div>

      {/* CTAs */}
      {product.inStock ? (
        <div className="mt-6 grid gap-3">
          <motion.a
            whileTap={{ scale: 0.97 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full text-base"
          >
            <WhatsAppIcon /> {t.orderWhatsapp}
          </motion.a>
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => openQuickOrder({ ...line, image: product.images[0] })}
            className="btn-forest w-full text-base"
          >
            <PhoneCall className="h-5 w-5" /> {t.quickOrder}
          </motion.button>
        </div>
      ) : (
        <div className="mt-6 grid gap-3">
          <p className="rounded-2xl bg-charcoal/5 px-4 py-3 text-sm text-charcoal-soft">
            {t.outOfStockNote}
          </p>
          <button type="button" onClick={() => openQuickOrder({ ...line, image: product.images[0] })} className="btn-forest w-full">
            <PhoneCall className="h-5 w-5" /> {t.notifyMe}
          </button>
        </div>
      )}

      <ul className="mt-6 grid gap-3 text-sm text-charcoal-soft sm:grid-cols-3">
        <li className="flex items-center gap-2">
          <Truck className="h-5 w-5 shrink-0 text-terracotta-dark" /> {t.perks[0]}
        </li>
        <li className="flex items-center gap-2">
          <Banknote className="h-5 w-5 shrink-0 text-terracotta-dark" /> {t.perks[1]}
        </li>
        <li className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 shrink-0 text-terracotta-dark" /> {t.perks[2]}
        </li>
      </ul>
    </div>
  );
}
