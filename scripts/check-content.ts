import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";
const reader = createReader(process.cwd(), config);
(async () => {
  const products = await reader.collections.products.all();
  const p = products.find((x) => x.slug === "lomis-fafari")!;
  console.log("products", products.length, "sample:", p.entry.name, p.entry.images, p.entry.variants[2], p.entry.detailsEn.dosage[0]);
  const posts = await reader.collections.posts.all({ resolveLinkedFiles: true });
  const post = posts[0];
  console.log("posts", posts.length, post.slug, post.entry.date, post.entry.relatedProducts, "bodyKa node type:", (post.entry.bodyKa as any).node?.type, "children:", (post.entry.bodyKa as any).node?.children?.length);
  const s = await reader.singletons.settings.read();
  const t = await reader.singletons.testimonials.read();
  const f = await reader.singletons.faq.read();
  console.log("settings", s?.phoneDisplay, s?.freeFrom, "| testimonials", t?.items.length, "| faq", f?.items.length);
})().catch((e) => { console.error("FAILED", e); process.exit(1); });
