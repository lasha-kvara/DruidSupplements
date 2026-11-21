"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { stripLocale } from "@/i18n";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { generalChatUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Header() {
  const { lang, t, path } = useI18n();
  // Locale-less path ("/catalog") — identical on server (rewritten "/ka/catalog") and client ("/catalog").
  const pathname = stripLocale(usePathname());
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/catalog", label: t.nav.catalog },
    { href: "/blog", label: t.nav.blog },
    { href: "/#faq", label: t.nav.faq },
  ];

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Hide on scroll down, reveal on scroll up (more screen for content on mobile).
    setHidden(y > 400 && y > prev && !menuOpen);
  });

  useEffect(() => setMenuOpen(false), [pathname, lang]);

  // Publish how much of the viewport the header currently covers, so sticky page elements
  // (catalog filters, product gallery) sit right under it — and move up when it hides.
  useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", hidden ? "0px" : "80px");
  }, [hidden]);

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
            ? "bg-transparent text-cream"
            : "border-b border-forest/5 bg-parchment/85 text-forest shadow-[0_1px_20px_-12px_rgba(27,48,34,0.3)] backdrop-blur-lg",
        )}
      >
        <div className="container flex h-[68px] items-center justify-between gap-2 md:h-20">
          <Link href={path("/")} aria-label={`${t.site.name} — ${t.header.homeAria}`} className="relative z-10 flex min-h-[44px] items-center">
            <Logo light={overHero} />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label={t.header.mainNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={path(link.href)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                  overHero ? "hover:bg-white/10" : "hover:bg-forest/5",
                )}
              >
                {link.label}
                {/* No layoutId here: in a fixed header a shared-layout animation flew in from the old
                    scroll position after navigation. The underline just grows in place instead. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-terracotta transition-transform duration-300 ease-out",
                    isActive(link.href) ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${siteConfig.phoneNumber}`}
              className={cn(
                "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold xl:flex",
                overHero ? "hover:bg-white/10" : "hover:bg-forest/5",
              )}
            >
              <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
            </a>
            {/* Below 360px there's no room next to the language switch + menu; the toggle moves into the menu */}
            <ThemeToggle light={overHero} className="relative z-10 hidden shrink-0 min-[360px]:flex" />
            <LanguageSwitcher light={overHero} className="relative z-10" />
            <a
              href={generalChatUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden !min-h-[44px] !px-5 !py-2 text-sm lg:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" /> {t.header.messageUs}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
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
            <nav className="flex flex-col gap-1" aria-label={t.header.mobileNav}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.06 }}
                >
                  <Link
                    href={path(link.href)}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[56px] items-center border-b border-forest/10 text-3xl font-semibold text-forest"
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
              <div className="flex items-center justify-between rounded-2xl bg-forest/5 px-4 py-2 min-[360px]:hidden">
                <span className="text-sm font-medium text-forest">{t.theme.toggle}</span>
                <ThemeToggle />
              </div>
              <a href={generalChatUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
                <WhatsAppIcon /> {t.header.whatsappMobile}
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
