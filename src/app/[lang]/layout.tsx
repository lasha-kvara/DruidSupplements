import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, htmlLang, isLocale, locales, ogLocale, type Locale } from "@/i18n";
import { I18nProvider } from "@/i18n/I18nProvider";
import { absoluteUrl } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Providers } from "@/components/layout/Providers";
import { DEFAULT_THEME, themeInitScript } from "@/lib/theme";
import { siteConfig } from "@/config/site";

/** FiraGO — modern Georgian + Latin sans (SIL OFL), self-hosted subset, see src/fonts/LICENSE.txt */
const firago = localFont({
  src: [
    { path: "../../fonts/FiraGO-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/FiraGO-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/FiraGO-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/FiraGO-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

type Params = Promise<{ lang: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const l: Locale = isLocale(lang) ? lang : "ka";
  const t = getDictionary(l).site;
  const title = `${t.name} — ${t.tagline}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s | ${t.name}` },
    description: t.description,
    alternates: { canonical: l === "en" ? "/en" : "/", languages: { ka: "/", en: "/en" } },
    openGraph: {
      type: "website",
      locale: ogLocale[l],
      siteName: t.name,
      title,
      description: t.description,
      // Share card in the logo style — sources: brand/og/og.html (render at 1200×630, ?en for English)
      images: [{ url: absoluteUrl(`/images/og-${l}.png`), width: 1200, height: 630, alt: title }],
    },
    // card type only — X falls back to each page's og:image (product/post pages keep their own photo)
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1B3022" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1511" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    // Dark by default; themeInitScript switches to a saved "light" before paint, hence suppressHydrationWarning on <html> only.
    <html lang={htmlLang[lang]} className={firago.variable} data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <I18nProvider lang={lang}>
          <Providers>
            <Header />
            {/* pb-24 = gap above the footer; pages ending in a full-bleed section cancel it (see home page) */}
            <main className="min-h-[60vh] pb-24">{children}</main>
            <Footer lang={lang} />
            <FloatingContact />
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
