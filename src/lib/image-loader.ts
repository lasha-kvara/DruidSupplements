/**
 * next/image loader for static hosting: serves the original file and prefixes
 * the base path (e.g. "/DruidSupplements") for local images.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//.test(src)) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${src}?w=${width}`;
}
