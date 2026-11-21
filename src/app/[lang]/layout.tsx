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
import { themeInitScript } from "@/lib/theme";
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
      images: [{ url: absoluteUrl("/images/forest.jpg"), width: 1800, height: 1200 }],
    },
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
    // data-theme is set by themeInitScript before hydration, hence suppressHydrationWarning on <html> only.
    <html lang={htmlLang[lang]} className={firago.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <I18nProvider lang={lang}>
          <Providers>
            <Header />
            <main className="min-h-[60vh]">{children}</main>
            <Footer lang={lang} />
            <FloatingContact />
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
