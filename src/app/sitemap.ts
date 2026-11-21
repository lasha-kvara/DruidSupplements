export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getPosts, getProductSlugs } from "@/data/server";
import { localizePath } from "@/i18n/config";
import { siteConfig } from "@/config/site";

/** Every page in both languages, with hreflang alternates. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const url = (lang: "ka" | "en", path: string) => `${base}${localizePath(lang, path)}`;
  const entry = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly",
    lastModified?: string,
  ): MetadataRoute.Sitemap =>
    (["ka", "en"] as const).map((lang) => ({
      url: url(lang, path),
      lastModified: lastModified || undefined,
      changeFrequency,
      priority: lang === "ka" ? priority : Math.max(priority - 0.1, 0.1),
      alternates: { languages: { ka: url("ka", path), en: url("en", path) } },
    }));

  const [productSlugs, posts] = await Promise.all([getProductSlugs(), getPosts("ka")]);

  return [
    ...entry("/", 1, "weekly"),
    ...entry("/catalog", 0.9, "weekly"),
    ...entry("/blog", 0.7, "weekly"),
    ...productSlugs.flatMap((s) => entry(`/product/${s}`, 0.8, "weekly")),
    ...posts.flatMap((p) => entry(`/blog/${p.slug}`, 0.6, "monthly", p.date)),
  ];
}
