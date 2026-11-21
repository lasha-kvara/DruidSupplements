import { notFound } from "next/navigation";

/** Any unknown URL under a locale renders the localized [lang]/not-found.tsx */
export default function CatchAll() {
  notFound();
}
