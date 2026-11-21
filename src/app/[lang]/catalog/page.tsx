import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";
import { PageHeader } from "@/components/layout/PageHeader";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { alternatesFor } from "@/lib/seo";

type Params = Promise<{ lang: string }>;

const toLocale = (v: string): Locale => (isLocale(v) ? v : "ka");

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).catalog;
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternatesFor(lang, "/catalog") };
}

export default async function CatalogPage({ params }: { params: Params }) {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).catalog;
  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} image="/images/leaves.jpg" />
      <div className="container pb-8">
        <Suspense fallback={<div className="h-40" />}>
          <CatalogView />
        </Suspense>
      </div>
    </>
  );
}
