"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, PhoneCall, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { generalChatUrl } from "@/lib/whatsapp";
import { useI18n } from "@/i18n/I18nProvider";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useQuickOrder } from "@/components/order/QuickOrderProvider";

/** Persistent bottom-right contact widget: WhatsApp, phone call, call-back request. */
export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { openQuickOrder } = useQuickOrder();
  const { lang, t } = useI18n();

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const actions = [
    {
      key: "wa",
      label: t.fab.whatsapp,
      href: generalChatUrl(lang),
      external: true,
      className: "bg-[#25D366] text-white",
      icon: <WhatsAppIcon className="h-5 w-5" />,
    },
    {
      key: "tel",
      label: t.fab.call,
      href: `tel:${siteConfig.phoneNumber}`,
      external: false,
      className: "bg-pine text-cream",
      icon: <Phone className="h-5 w-5" />,
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 md:bottom-8 md:right-8"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <AnimatePresence>
            {open && (
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                className="flex flex-col items-end gap-3"
              >
                {[...actions].reverse().map((a) => (
                  <motion.li
                    key={a.key}
                    variants={{ hidden: { opacity: 0, y: 16, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1 } }}
                  >
                    <a
                      href={a.href}
                      target={a.external ? "_blank" : undefined}
                      rel={a.external ? "noopener noreferrer" : undefined}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3"
                    >
                      <span className="rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-forest shadow-soft">
                        {a.label}
                      </span>
                      <span className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lift ${a.className}`}>
                        {a.icon}
                      </span>
                    </a>
                  </motion.li>
                ))}
                <motion.li variants={{ hidden: { opacity: 0, y: 16, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1 } }}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      openQuickOrder();
                    }}
                    className="flex items-center gap-3"
                  >
                    <span className="rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-forest shadow-soft">
                      {t.fab.callback}
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta text-white shadow-lift">
                      <PhoneCall className="h-5 w-5" />
                    </span>
                  </button>
                </motion.li>
              </motion.ul>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.fab.close : t.fab.open}
            aria-expanded={open}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform active:scale-95 md:h-16 md:w-16"
          >
            {!open && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" aria-hidden />}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
