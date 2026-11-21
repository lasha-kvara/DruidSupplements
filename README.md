# დრუიდი — სამკურნალო სოკოები და მცენარეები

Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion + Lucide.
Georgian-language storefront with WhatsApp / call-back ordering (no payment gateway).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

Live: https://lasha-kvara.github.io/DruidSupplements/ — every push to `main` is built and deployed
by `.github/workflows/deploy-pages.yml`.

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
- **Quick order (call-back)** — GitHub Pages is static, so `src/lib/order.ts` runs in the browser:
  - if `NEXT_PUBLIC_ORDER_ENDPOINT` is set (e.g. a free https://formspree.io form), the order is POSTed there and arrives by email;
  - otherwise WhatsApp opens with a pre-filled call-back message.

### Settings for the live site

In GitHub → Settings → Secrets and variables → Actions → **Variables**, add any of:
`NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE_NUMBER`, `NEXT_PUBLIC_ORDER_ENDPOINT`,
then re-run the "Deploy to GitHub Pages" workflow. These values are public — never put secrets there.
