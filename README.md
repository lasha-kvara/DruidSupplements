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

## Admin panel (Keystatic Cloud)

Open **`/keystatic`** (`/admin` redirects there). Content is stored as files in `content/`
(+ photos in `public/images/products|posts/`) and committed to this GitHub repository.

- **Live site**: editors sign in through **Keystatic Cloud** — they do *not* need a GitHub account or
  access to this repository. Each *Save* is committed to `main`; Vercel redeploys in ~1–2 min.
  Editors are managed in the Keystatic Cloud team (free plan: up to 3 users per team).
- **Locally** (`npm run dev` → http://localhost:3000/keystatic): edits files on disk; commit & push yourself.
  `NEXT_PUBLIC_KEYSTATIC_CLOUD=1 npm run dev` uses Cloud mode locally instead.

One-time setup:
1. Sign in at https://keystatic.cloud, create a **team** and a **project** connected to this repository.
2. Put the project name (`team/project`, shown in the project settings snippet) into `CLOUD_PROJECT`
   in `keystatic.config.ts` (or the `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT` env var) and push.
3. Invite the editors to the team in Keystatic Cloud.

Until a project is set, `/keystatic` on the live site shows "not configured" and its API returns 404.
`npx tsx scripts/check-content.ts` validates all content files. Photo credits: `CREDITS.md`.

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
| Home page texts, hero photo, stats, trust cards, section headings | Admin → „მთავარი გვერდი“ (`content/homepage.json`) |
| Categories and „shop by benefit“ cards (name, icon, photo, order) | Admin → „კატეგორიები“ / „დანიშნულებები“ (`content/categories`, `content/benefits`) |


## Ordering

- **WhatsApp** — `src/lib/whatsapp.ts` builds
  `https://wa.me/<number>?text=<encodeURIComponent(message)>` from the selected product, weight, quantity and total.
- **Quick order (call-back)** — the modal posts to `src/app/api/order/route.ts` (server), which validates the
  Georgian phone number and forwards the order to Telegram (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`)
  or Formspree (`FORMSPREE_ENDPOINT`). With neither configured, the customer is asked to send it via WhatsApp.

### Environment variables on Vercel

Project → Settings → Environment Variables (see `.env.example`), then redeploy:
`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`,
optionally `FORMSPREE_ENDPOINT` and `NEXT_PUBLIC_SITE_URL` (custom domain).
To check the channel, send a test quick order: with Telegram/Formspree configured it arrives there, otherwise the modal offers WhatsApp.
