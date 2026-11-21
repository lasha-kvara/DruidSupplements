"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

export default function NotFound() {
  const { t, path } = useI18n();
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="text-8xl font-bold text-terracotta/30">404</p>
      <h1 className="mt-4 text-3xl font-bold">{t.notFound.title}</h1>
      <p className="mt-3 max-w-md text-charcoal-soft">{t.notFound.text}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={path("/catalog")} className="btn-primary">
          {t.common.viewCatalog}
        </Link>
        <Link href={path("/")} className="btn-outline">
          {t.notFound.home}
        </Link>
      </div>
    </div>
  );
}
