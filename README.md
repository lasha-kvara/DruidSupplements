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

## Admin panel (Keystatic)

Open **`/keystatic`**. Everything is stored as files in `content/` (+ photos in `public/images/products|posts/`).

- **Locally** (`npm run dev` → http://localhost:3000/keystatic): edits files on disk; commit & push yourself.
- **On the live site**: logs in with GitHub; every *Save* is a commit to `main`, Vercel redeploys in ~1–2 min.
  Only GitHub users with write access to this repository can edit.

One-time GitHub setup (until it is done, `/keystatic` on the live site shows "not configured"):

1. Locally run `NEXT_PUBLIC_KEYSTATIC_GITHUB=1 npm run dev` and open `/keystatic` → **Create GitHub App**.
   Keystatic writes `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`,
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` into `.env`.
2. Install the new GitHub App on the `DruidSupplements` repository.
3. In the GitHub App settings add the callback URL
   `https://druid-supplements.vercel.app/api/keystatic/github/oauth/callback`.
4. Copy the four variables into Vercel → Settings → Environment Variables, then redeploy.

`/admin` is a read-only overview with links into the editor. `npx tsx scripts/check-content.ts` validates all content files.

## Languages

- Georgian is served at the root (`/catalog`), English under `/en` (`/en/catalog`) — see `src/middleware.ts`.
  All pages live in `src/app/[lang]/`; the header switch (`LanguageSwitcher`) keeps the current page and filters.
- UI text: `src/i18n/dictionaries/ka.ts` and `en.ts` (the `Dictionary` type keeps both in sync).
- Content: every text field in the admin has a Georgian and an English input; empty English falls back to Georgian.
  Products/posts are read on the server (`src/data/server.ts`), settings/reviews/FAQ are static JSON (`src/data/index.ts`).

## Where to change things

| What | File |
| --- | --- |
| Phone, WhatsApp number, socials, address, hours, delivery prices | Admin → „საკონტაქტო და მიწოდება“ (`content/settings.json`) |
| Products, prices, weight tiers, stock, photos | Admin → „პროდუქტები“ (`content/products/*.json`) |
| Categories & "shop by benefit" | `src/data/categories.ts` |
| Blog articles | Admin → „ბლოგის სტატიები“ (`content/posts/<slug>/`) |
| Testimonials & FAQ | Admin → „შეფასებები“ / „კითხვები“ (`content/*.json`) |
| Categories & benefits (fixed) | `src/data/categories.ts` |

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
