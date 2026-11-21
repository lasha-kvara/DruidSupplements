import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "კატალოგი",
  description:
    "სამკურნალო სოკოები, მცენარეები და ექსტრაქტები: ლომის ფაფარი, რეიში, ჩაგა, კორდიცეფსი, ასკილი და სხვა. ფილტრი დანიშნულების მიხედვით.",
};

export default function CatalogPage() {
  return (
    <>
      <PageHeader
        eyebrow="კატალოგი"
        title="ბუნების აფთიაქი"
        description="აირჩიეთ კატეგორია ან დანიშნულება — ყველა პროდუქტი ლაბორატორიულად შემოწმებულია და მზადაა მიწოდებისთვის."
        image="/images/leaves.jpg"
      />
      <div className="container pb-8">
        <Suspense fallback={<div className="h-40" />}>
          <CatalogView />
        </Suspense>
      </div>
    </>
  );
}
