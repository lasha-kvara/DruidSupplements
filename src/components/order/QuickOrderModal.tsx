"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Phone, User, X } from "lucide-react";
import type { QuickOrderContext } from "./QuickOrderProvider";
import { formatAmount } from "@/lib/utils";
import { callbackWhatsAppUrl, submitQuickOrder, validateQuickOrder, type OrderChannel } from "@/lib/order";
import { buildOrderWhatsAppUrl, buildWhatsAppUrl, generalChatMessage, lineTotal } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useI18n } from "@/i18n/I18nProvider";

type Status = "idle" | "sending" | "success" | "error";

interface Props {
  open: boolean;
  order: QuickOrderContext;
  onClose: () => void;
}

export function QuickOrderModal({ open, order, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [channel, setChannel] = useState<OrderChannel>("server");
  const nameRef = useRef<HTMLInputElement>(null);
  const { lang, t: dict } = useI18n();
  const t = dict.quickOrder;

  const hasProduct = Boolean(order.productName && order.unitPrice);
  const total = hasProduct ? lineTotal({ unitPrice: order.unitPrice!, quantity: order.quantity ?? 1 }) : 0;

  // Reset state each time the modal opens, lock body scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setError(null);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const timer = window.setTimeout(() => nameRef.current?.focus(), 250);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const invalid = validateQuickOrder({ name, phone }, lang);
    if (invalid) return setError(invalid);
    setError(null);
    setStatus("sending");
    try {
      const used = await submitQuickOrder({
        website,
        name: name.trim(),
        phone: phone.trim(),
        product: order.productName,
        variant: order.variantLabel,
        quantity: order.quantity,
        total: hasProduct ? total : undefined,
        page: window.location.href,
      }, lang);
      setChannel(used);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t.errorFailed);
    }
  }

  const whatsappFallback = hasProduct
    ? buildOrderWhatsAppUrl({
        productName: order.productName!,
        variantLabel: order.variantLabel ?? "",
        quantity: order.quantity ?? 1,
        unitPrice: order.unitPrice!,
      }, lang)
    : buildWhatsAppUrl(generalChatMessage(lang));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label={dict.common.close}
            onClick={onClose}
            className="absolute inset-0 bg-forest-800/60 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-order-title"
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="relative w-full max-w-md overflow-hidden rounded-t-[28px] bg-parchment shadow-lift sm:rounded-[28px]"
          >
            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-forest/15 sm:hidden" />
            <button
              type="button"
              onClick={onClose}
              aria-label={dict.common.close}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-forest shadow-sm transition hover:rotate-90"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pb-safe px-6 pt-6 sm:pb-7">
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest text-parchment"
                    >
                      <CheckCircle2 className="h-10 w-10" />
                    </motion.div>
                    <h2 className="mt-6 text-2xl font-semibold">{t.thanks(name.trim().split(" ")[0])}</h2>
                    {channel === "whatsapp" ? (
                      <>
                        <p className="mt-3 text-charcoal-soft">
                          {t.whatsappStep}
                          <span className="whitespace-nowrap font-semibold text-forest">{phone}</span>.
                        </p>
                        <a
                          href={callbackWhatsAppUrl({
                            name,
                            phone,
                            product: order.productName,
                            variant: order.variantLabel,
                            quantity: order.quantity,
                            total: hasProduct ? total : undefined,
                          }, lang)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-whatsapp mt-6 w-full"
                        >
                          <WhatsAppIcon /> {t.sendWhatsapp}
                        </a>
                      </>
                    ) : (
                      <p className="mt-3 text-charcoal-soft">
                        {t.receivedBefore}
                        <b>{t.receivedBold}</b>
                        {t.receivedAfter}
                        <span className="whitespace-nowrap font-semibold text-forest">{phone}</span>.
                      </p>
                    )}
                    <p className="mt-2 text-sm text-charcoal-muted">{t.hours} {dict.site.workingHours}</p>
                    <button
                      type="button"
                      onClick={onClose}
                      className={channel === "whatsapp" ? "btn-outline mt-3 w-full" : "btn-forest mt-7 w-full"}
                    >
                      {t.ok}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="eyebrow">{t.eyebrow}</p>
                    <h2 id="quick-order-title" className="mt-2 pr-10 text-2xl font-semibold">
                      {t.title}
                    </h2>
                    <p className="mt-2 text-[15px] text-charcoal-soft">
                      {t.description}
                    </p>

                    {hasProduct && (
                      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-forest/10 bg-white p-3">
                        {order.image && (
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                            <Image src={order.image} alt="" fill sizes="56px" className="object-cover" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-forest">{order.productName}</p>
                          <p className="text-sm text-charcoal-muted">
                            {order.variantLabel} × {order.quantity ?? 1}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-terracotta">
                          {formatAmount(total)} {siteConfig.currency}
                        </p>
                      </div>
                    )}

                    <div className="mt-5 space-y-3">
                      <label className="relative block">
                        <span className="sr-only">{t.nameLabel}</span>
                        <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-muted" />
                        <input
                          ref={nameRef}
                          className="input pl-12"
                          placeholder={t.namePlaceholder}
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          maxLength={60}
                          required
                        />
                      </label>
                      <label className="relative block">
                        <span className="sr-only">{t.phoneLabel}</span>
                        <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-muted" />
                        <input
                          className="input pl-12"
                          placeholder="5XX XX XX XX"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          maxLength={20}
                          required
                        />
                      </label>
                      {/* Honeypot — hidden from people, visible to naive bots */}
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="hidden"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          role="alert"
                          className="mt-3 text-sm font-medium text-terracotta-dark"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <button type="submit" className="btn-primary mt-5 w-full" disabled={status === "sending"}>
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" /> {t.sending}
                        </>
                      ) : (
                        <>
                          <Phone className="h-5 w-5" /> {t.submit}
                        </>
                      )}
                    </button>

                    <a
                      href={whatsappFallback}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex min-h-[44px] items-center justify-center gap-2 text-sm font-semibold text-forest-400 transition hover:text-forest"
                    >
                      <WhatsAppIcon className="h-4 w-4" /> {t.orWhatsapp}
                    </a>
                    <p className="mt-1 text-center text-xs text-charcoal-muted">
                      {t.payNote}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
