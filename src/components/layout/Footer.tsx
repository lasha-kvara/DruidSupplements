import Link from "next/link";
import { AlertTriangle, Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/data";
import { getDictionary, localizePath, type Locale } from "@/i18n";
import { generalChatUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.4-2.47V9.67a5.74 5.74 0 0 0-.8-.06A5.7 5.7 0 0 0 4.17 15.3 5.7 5.7 0 0 0 9.86 21a5.7 5.7 0 0 0 5.69-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.25-1.48Z" />
    </svg>
  );
}

export function Footer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const path = (href: string) => localizePath(lang, href);
  const year = new Date().getFullYear();
  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/catalog", label: t.nav.catalog },
    { href: "/blog", label: t.nav.blog },
    { href: "/#faq", label: t.nav.faq },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden bg-forest text-parchment/80">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />
      <div className="container relative pb-28 pt-16 md:pb-12">
        {/* Medical disclaimer — mandatory */}
        <div className="mb-12 flex gap-4 rounded-3xl border border-terracotta/40 bg-terracotta/10 p-5 md:p-6">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-terracotta-light" aria-hidden />
          <p className="text-sm leading-relaxed text-parchment/90 md:text-[15px]">
            <strong className="text-parchment">{t.footer.disclaimerTitle}</strong> {t.footer.disclaimer}
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-parchment/70">{t.site.description}</p>
            <div className="mt-6 flex gap-2">
              {[
                { href: siteConfig.socials.facebook, label: "Facebook", icon: <Facebook className="h-5 w-5" /> },
                { href: siteConfig.socials.instagram, label: "Instagram", icon: <Instagram className="h-5 w-5" /> },
                { href: siteConfig.socials.tiktok, label: "TikTok", icon: <TikTokIcon className="h-5 w-5" /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-parchment/20 transition hover:-translate-y-0.5 hover:border-terracotta hover:bg-terracotta hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-sans text-sm font-semibold tracking-wide text-parchment">{t.footer.navigation}</h3>
            <ul className="mt-4 space-y-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={path(l.href)} className="inline-flex min-h-[36px] items-center text-sm transition hover:text-terracotta-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-semibold tracking-wide text-parchment">{t.footer.categories}</h3>
            <ul className="mt-4 space-y-1">
              {getCategories(lang).map((c) => (
                <li key={c.id}>
                  <Link
                    href={path(`/catalog?category=${c.id}`)}
                    className="inline-flex min-h-[36px] items-center text-sm transition hover:text-terracotta-light"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-semibold tracking-wide text-parchment">{t.footer.contact}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`tel:${siteConfig.phoneNumber}`} className="flex items-center gap-3 transition hover:text-terracotta-light">
                  <Phone className="h-4 w-4 text-terracotta-light" /> {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={generalChatUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition hover:text-terracotta-light"
                >
                  <WhatsAppIcon className="h-4 w-4 text-terracotta-light" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 transition hover:text-terracotta-light">
                  <Mail className="h-4 w-4 text-terracotta-light" /> {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-terracotta-light" /> {t.site.address}
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-terracotta-light" /> {t.site.workingHours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-parchment/10 pt-6 text-xs text-parchment/50 sm:flex-row sm:justify-between">
          <p>
            © {year} {t.site.name}. {t.footer.rights}
          </p>
          <p>{t.footer.bottomLine}</p>
        </div>
      </div>
    </footer>
  );
}
