"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/data/types";
import { useI18n } from "@/i18n/I18nProvider";
import { formatDate } from "@/lib/utils";

export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const { lang, t, path } = useI18n();
  return (
    <article className="group h-full">
      <Link
        href={path(`/blog/${post.slug}`)}
        className={`flex h-full flex-col overflow-hidden rounded-3xl border border-forest/10 bg-surface transition-shadow duration-300 hover:shadow-lift ${featured ? "md:grid md:grid-cols-2" : ""}`}
      >
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/10] md:aspect-auto md:min-h-[360px]" : "aspect-[16/10]"}`}>
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className={`flex flex-1 flex-col ${featured ? "p-6 md:p-10" : "p-6"}`}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-charcoal-muted">
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {t.common.minRead(post.readingMinutes)}
            </span>
          </div>
          <h3
            className={`mt-3 font-semibold leading-snug transition-colors group-hover:text-terracotta-dark ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}
          >
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-charcoal-soft">{post.excerpt}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-500">
                #{tag}
              </span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta-dark">
            {t.common.readMore} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
