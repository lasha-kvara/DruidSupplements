"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import type { Product } from "@/data/types";
import { getStartingPrice } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import { buildOrderWhatsAppUrl } from "@/lib/whatsapp";
import { Rating, StockBadge } from "@/components/ui/Badges";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useQuickOrder } from "@/components/order/QuickOrderProvider";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { openQuickOrder } = useQuickOrder();
  const first = product.variants[0];
  const startingPrice = getStartingPrice(product);
  const hasManyVariants = product.variants.length > 1;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-[0_2px_10px_-6px_rgba(27,48,34,0.15)] transition-shadow duration-300 hover:shadow-lift"
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-parchment-dark"
        aria-label={product.name}
      >
        <Image
          src={product.images[0]}
          alt={`${product.name} — ${product.latinName}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${product.inStock ? "" : "grayscale-[60%]"}`}
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-md:hidden"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-800/40 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <StockBadge inStock={product.inStock} />
          {product.isNew && (
            <span className="rounded-full bg-terracotta px-2.5 py-1 text-xs font-semibold text-white">ახალი</span>
          )}
        </div>
        <span className="absolute right-3 top-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-forest opacity-0 shadow-soft transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate rounded-full bg-forest-50 px-2.5 py-1 text-xs font-medium text-forest-500">
            {product.shortBenefit}
          </span>
          <Rating value={product.rating} className="shrink-0 text-xs" />
        </div>
        <h3 className="mt-3 font-serif text-lg font-semibold leading-snug md:text-xl">
          <Link href={`/product/${product.slug}`} className="transition-colors hover:text-terracotta">
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-xs italic text-charcoal-muted">{product.latinName}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <p className="text-xs text-charcoal-muted">{hasManyVariants ? "ფასი" : first.label}</p>
            <p className="text-xl font-bold text-forest">
              {hasManyVariants && <span className="text-sm font-medium text-charcoal-muted">დან </span>}
              {formatPrice(startingPrice)}
            </p>
          </div>
          {product.inStock ? (
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() =>
                  openQuickOrder({
                    productName: product.name,
                    variantLabel: first.label,
                    quantity: 1,
                    unitPrice: first.price,
                    image: product.images[0],
                  })
                }
                aria-label={`სწრაფი შეკვეთა: ${product.name}`}
                title="სწრაფი შეკვეთა ზარით"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-parchment transition hover:scale-105 hover:bg-forest-500 active:scale-95"
              >
                <PhoneCall className="h-[18px] w-[18px]" />
              </button>
              <a
                href={buildOrderWhatsAppUrl({
                  productName: product.name,
                  variantLabel: first.label,
                  quantity: 1,
                  unitPrice: first.price,
                })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`შეკვეთა WhatsApp-ით: ${product.name}`}
                title="შეკვეთა WhatsApp-ით"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          ) : (
            <Link href={`/product/${product.slug}`} className="text-sm font-semibold text-terracotta hover:underline">
              დეტალები
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
