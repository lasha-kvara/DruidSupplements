import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "დრუიდი · ადმინი",
  robots: { index: false, follow: false },
};

/** Separate root layout: the admin UI must not inherit the shop's header, footer and styles. */
export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka">
      <body>{children}</body>
    </html>
  );
}
