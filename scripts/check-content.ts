/** Sanity check: every Keystatic collection/singleton parses. Run: npx tsx scripts/check-content.ts */
import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";
const reader = createReader(process.cwd(), config);
(async () => {
  const products = await reader.collections.products.all();
  const categories = await reader.collections.categories.all();
  const benefits = await reader.collections.benefits.all();
  const posts = await reader.collections.posts.all({ resolveLinkedFiles: true });
  const home = await reader.singletons.homepage.read();
  const s = await reader.singletons.settings.read();
  const t = await reader.singletons.testimonials.read();
  const f = await reader.singletons.faq.read();
  const catIds = new Set(categories.map((c) => c.slug)), benIds = new Set(benefits.map((b) => b.slug));
  const broken = products.flatMap((p) => [
    ...(p.entry.category && !catIds.has(p.entry.category) ? [`${p.slug}: unknown category ${p.entry.category}`] : []),
    ...p.entry.benefits.filter((b) => b && !benIds.has(b)).map((b) => `${p.slug}: unknown benefit ${b}`),
  ]);
  console.log(`products ${products.length} | categories ${categories.map((c) => c.slug)} | benefits ${benefits.map((b) => `${b.slug}:${b.entry.icon}:${b.entry.image}`)}`);
  console.log(`posts ${posts.length} | testimonials ${t?.items.length} | faq ${f?.items.length} | phone ${s?.phoneDisplay}`);
  console.log(`homepage hero="${home?.hero.line1.ka} / ${home?.hero.line1.en}" image=${home?.hero.image} stats=${home?.stats.length} trust=${home?.trust.map((x) => x.icon)}`);
  if (broken.length) { console.error("BROKEN REFERENCES:", broken); process.exit(1); }
  console.log("OK");
})().catch((e) => { console.error("FAILED", e); process.exit(1); });
