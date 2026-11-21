"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  alt: string;
  badges?: React.ReactNode;
}

/** Main image with cursor-follow zoom on desktop + thumbnail switcher. */
export function ProductGallery({ images, alt, badges }: Props) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const frameRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !frameRef.current) return;
    const r = frameRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse md:gap-4">
      <div
        ref={frameRef}
        onPointerEnter={(e) => e.pointerType === "mouse" && setZoom(true)}
        onPointerLeave={() => setZoom(false)}
        onPointerMove={onMove}
        className="relative aspect-square flex-1 cursor-zoom-in overflow-hidden rounded-3xl bg-parchment-dark md:aspect-[4/5]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={images[active]}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={alt}
              fill
              priority={active === 0}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-200 ease-out"
              style={{ transform: zoom ? "scale(2)" : "scale(1)", transformOrigin: origin }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">{badges}</div>
        <span
          className={cn(
            "pointer-events-none absolute bottom-4 right-4 hidden items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-forest shadow-soft transition-opacity md:flex",
            zoom && "opacity-0",
          )}
        >
          <ZoomIn className="h-4 w-4" /> გადიდება
        </span>
      </div>

      {images.length > 1 && (
        <div className="no-scrollbar flex gap-3 overflow-x-auto md:w-20 md:flex-col">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`სურათი ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all",
                i === active ? "border-terracotta" : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
