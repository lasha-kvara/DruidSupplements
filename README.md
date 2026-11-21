# დრუიდი — სამკურნალო სოკოები და მცენარეები

Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion + Lucide.
Georgian-language storefront with WhatsApp / call-back ordering (no payment gateway).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where to change things

| What | File |
| --- | --- |
| Phone, WhatsApp number, socials, delivery prices | `src/config/site.ts` (or `.env.local`, see `.env.example`) |
| Products, prices, weight tiers, stock | `src/data/products.ts` |
| Categories & "shop by benefit" | `src/data/categories.ts` |
| Blog articles | `src/data/posts.ts` |
| Testimonials & FAQ | `src/data/content.ts` |
| Photos | `public/images/` (placeholders — credits on `/admin`) |

`/admin` is a read-only overview of the data, order-channel status and a WhatsApp link tester (not indexed).

## Ordering

- **WhatsApp** — `src/lib/whatsapp.ts` builds
  `https://wa.me/<number>?text=<encodeURIComponent(message)>` from the selected product, weight, quantity and total.
- **Quick order (call-back)** — the modal posts to `src/app/api/order/route.ts`, which validates the
  Georgian phone number and forwards the order to Telegram (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`)
  or Formspree (`FORMSPREE_ENDPOINT`). With neither set, orders are written to the server log.

Because of the API route, deploy to a Node host (Vercel, Railway, a VPS) rather than a static export.
