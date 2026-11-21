import type { Metadata } from "next";
import Link from "next/link";
import { PencilLine } from "lucide-react";
import { getPosts, getProducts } from "@/data/server";
import { categoryById } from "@/data/categories";
import { imageCredits } from "@/data/image-credits";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils";
import { buildOrderMessage, buildOrderWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "ადმინ პანელი",
  robots: { index: false, follow: false },
};

/**
 * Store overview. Editing happens in the Keystatic admin at /keystatic
 * (content/*.json + content/posts/*). Env-based status is read at build time —
 * redeploy on Vercel after changing environment variables.
 */
export default async function AdminPage() {
  const [products, posts] = await Promise.all([getProducts("ka"), getPosts("ka")]);
  const inStock = products.filter((p) => p.inStock).length;
  const telegram = Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
  const formspree = Boolean(process.env.FORMSPREE_ENDPOINT);
  const sample = products[0];
  const sampleLine = {
    productName: sample.name,
    variantLabel: sample.variants[1]?.label ?? sample.variants[0].label,
    quantity: 2,
    unitPrice: sample.variants[1]?.price ?? sample.variants[0].price,
  };

  const stats = [
    ["პროდუქტები", products.length],
    ["მარაგშია", inStock],
    ["ამოიწურა", products.length - inStock],
    ["სტატიები", posts.length],
  ] as const;

  return (
    <div className="container pb-10 pt-28 md:pt-32">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">მაღაზიის მიმოხილვა</h1>
          <p className="mt-2 max-w-2xl text-sm text-charcoal-soft">
            პროდუქტების, ფასების, მარაგის, სტატიების, შეფასებების, FAQ-ისა და საკონტაქტო ინფორმაციის შესაცვლელად
            გახსენით რედაქტორი. შენახვის შემდეგ საიტი 1–2 წუთში განახლდება.
          </p>
        </div>
        <a href="/keystatic" className="btn-primary shrink-0">
          <PencilLine className="h-5 w-5" /> რედაქტორის გახსნა
        </a>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-forest/10 bg-white p-5">
            <p className="text-sm text-charcoal-muted">{label}</p>
            <p className="mt-1 font-serif text-3xl font-semibold text-forest">{value}</p>
          </div>
        ))}
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-forest/10 bg-white p-5">
          <h2 className="font-sans text-base font-semibold">შეკვეთების არხი (სწრაფი შეკვეთა)</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Telegram: {telegram ? "✅ ჩართულია" : "⚪ არ არის კონფიგურირებული"}</li>
            <li>Formspree: {formspree ? "✅ ჩართულია" : "⚪ არ არის კონფიგურირებული"}</li>
            {!telegram && !formspree && (
              <li className="text-terracotta-dark">
                ამჟამად „დამირეკეთ“ მომხმარებელს სთავაზობს WhatsApp-ით გაგზავნას. Vercel → Settings → Environment
                Variables-ში დაამატეთ TELEGRAM_BOT_TOKEN და TELEGRAM_CHAT_ID (იხ. README).
              </li>
            )}
          </ul>
        </div>
        <div className="rounded-2xl border border-forest/10 bg-white p-5">
          <h2 className="font-sans text-base font-semibold">WhatsApp ბმულის ტესტი</h2>
          <p className="mt-1 text-xs text-charcoal-muted">ნომერი: +{siteConfig.whatsappNumber}</p>
          <p className="mt-3 rounded-xl bg-parchment p-3 text-sm">{buildOrderMessage(sampleLine)}</p>
          <a
            href={buildOrderWhatsAppUrl(sampleLine)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block break-all text-xs text-forest-400 underline"
          >
            {buildOrderWhatsAppUrl(sampleLine)}
          </a>
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-2xl border border-forest/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-forest text-parchment">
              <tr>
                <th className="px-4 py-3 font-semibold">პროდუქტი</th>
                <th className="px-4 py-3 font-semibold">კატეგორია</th>
                <th className="px-4 py-3 font-semibold">ვარიანტები</th>
                <th className="px-4 py-3 font-semibold">სტატუსი</th>
                <th className="px-4 py-3 font-semibold">ბესტსელერი</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/10">
              {products.map((p) => (
                <tr key={p.slug} className="hover:bg-parchment/60">
                  <td className="px-4 py-3">
                    <Link href={`/product/${p.slug}`} className="font-semibold text-forest hover:text-terracotta">
                      {p.name}
                    </Link>
                    <p className="text-xs text-charcoal-muted">
                      /{p.slug} ·{" "}
                      <a href={`/keystatic/collection/products/item/${p.slug}`} className="text-terracotta hover:underline">
                        რედაქტირება
                      </a>
                    </p>
                  </td>
                  <td className="px-4 py-3">{categoryById(p.category)?.name}</td>
                  <td className="px-4 py-3">
                    {p.variants.map((v) => (
                      <span key={v.id} className="mr-1.5 inline-block rounded-full bg-forest-50 px-2 py-0.5 text-xs">
                        {v.label}: {formatPrice(v.price)}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-3">{p.inStock ? "🟢 მარაგშია" : "🔴 ამოიწურა"}</td>
                  <td className="px-4 py-3">{p.bestseller ? "★" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <details className="mt-8 rounded-2xl border border-forest/10 bg-white p-5 text-sm">
        <summary className="cursor-pointer font-semibold">სურათების ავტორები და ლიცენზიები ({imageCredits.length})</summary>
        <p className="mt-2 text-xs text-charcoal-muted">
          სადემონსტრაციო ფოტოები. გაშვებამდე შეცვალეთ საკუთარი პროდუქტის ფოტოებით, ან საიტზე მიუთითეთ ავტორები (CC BY).
        </p>
        <ul className="mt-3 grid gap-1 text-xs md:grid-cols-2">
          {imageCredits.map((c) => (
            <li key={c.file}>
              <code>{c.file}</code> — {c.author} ({c.license}, {c.source})
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
