"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppUrl, generalChatMessage } from "@/lib/whatsapp";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Hide on scroll down, reveal on scroll up (more screen for content on mobile).
    setHidden(y > 400 && y > prev && !menuOpen);
  });

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const overHero = pathname === "/" && !scrolled && !menuOpen;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300",
          overHero
            ? "bg-transparent text-parchment"
            : "border-b border-forest/5 bg-parchment/85 text-forest shadow-[0_1px_20px_-12px_rgba(27,48,34,0.3)] backdrop-blur-lg",
        )}
      >
        <div className="container flex h-[68px] items-center justify-between gap-4 md:h-20">
          <Link href="/" aria-label={`${siteConfig.name} — მთავარი`} className="relative z-10">
            <Logo light={overHero} />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="მთავარი ნავიგაცია">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                  overHero ? "hover:bg-white/10" : "hover:bg-forest/5",
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-terracotta"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${siteConfig.phoneNumber}`}
              className={cn(
                "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold lg:flex",
                overHero ? "hover:bg-white/10" : "hover:bg-forest/5",
              )}
            >
              <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
            </a>
            <a
              href={buildWhatsAppUrl(generalChatMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden !min-h-[42px] !px-5 !py-2 text-sm sm:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" /> მოგვწერეთ
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"}
              aria-expanded={menuOpen}
              className={cn(
                "relative z-10 flex h-11 w-11 items-center justify-center rounded-full md:hidden",
                overHero ? "bg-white/10" : "bg-forest/5",
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 34px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 34px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 34px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-parchment px-6 pb-10 pt-28 md:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="მობილური ნავიგაცია">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[56px] items-center border-b border-forest/10 font-serif text-3xl text-forest"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-auto grid gap-3"
            >
              <a href={buildWhatsAppUrl(generalChatMessage)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
                <WhatsAppIcon /> WhatsApp-ით მოწერა
              </a>
              <a href={`tel:${siteConfig.phoneNumber}`} className="btn-outline w-full">
                <Phone className="h-5 w-5" /> {siteConfig.phoneDisplay}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
