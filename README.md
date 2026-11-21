# დრუიდი — სამკურნალო სოკოები და მცენარეები

Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion + Lucide.
Bilingual (Georgian / English) storefront with WhatsApp / call-back ordering (no payment gateway).
Font: FiraGO (SIL OFL), self-hosted Georgian + Latin subset in `src/fonts/`.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Hosted on **Vercel**: the project is connected to this GitHub repo, so every push to `main`
deploys to production and every other branch gets a preview URL.

## Languages

- Georgian is served at the root (`/catalog`), English under `/en` (`/en/catalog`) — see `src/middleware.ts`.
  All pages live in `src/app/[lang]/`; the header switch (`LanguageSwitcher`) keeps the current page and filters.
- UI text: `src/i18n/dictionaries/ka.ts` and `en.ts` (the `Dictionary` type keeps both in sync).
- Content: Georgian source in `src/data/*.ts`, English text in `src/data/en/*.ts` (keyed by slug / id).
  Prices, stock and images always come from the Georgian source. Read data via `src/data/index.ts`
  (`getProducts(lang)`, `getPosts(lang)`, …).

## Where to change things

| What | File |
| --- | --- |
| Phone, WhatsApp number, socials, delivery prices | `src/config/site.ts` (or `.env.local`, see `.env.example`) |
| Products, prices, weight tiers, stock | `src/data/products.ts` (+ English text in `src/data/en/products.ts`) |
| Categories & "shop by benefit" | `src/data/categories.ts` |
| Blog articles | `src/data/posts.ts` (+ `src/data/en/posts.ts`) |
| Testimonials & FAQ | `src/data/content.ts` (+ `src/data/en/content.ts`) |
| Photos | `public/images/` (placeholders — credits on `/admin`) |

`/admin` is a read-only overview of the data, order-channel status and a WhatsApp link tester (not indexed).

## Ordering

- **WhatsApp** — `src/lib/whatsapp.ts` builds
  `https://wa.me/<number>?text=<encodeURIComponent(message)>` from the selected product, weight, quantity and total.
- **Quick order (call-back)** — the modal posts to `src/app/api/order/route.ts` (server), which validates the
  Georgian phone number and forwards the order to Telegram (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`)
  or Formspree (`FORMSPREE_ENDPOINT`). With neither configured, the customer is asked to send it via WhatsApp.

### Environment variables on Vercel

Project → Settings → Environment Variables (see `.env.example`), then redeploy:
`NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE_NUMBER`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`,
optionally `FORMSPREE_ENDPOINT` and `NEXT_PUBLIC_SITE_URL` (custom domain).
`/admin` shows which order channel is active.
