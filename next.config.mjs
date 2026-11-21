/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The old public overview page is gone; send admins straight to the (login-protected) editor.
  async redirects() {
    return [
      { source: "/admin", destination: "/keystatic", permanent: false },
      { source: "/en/admin", destination: "/keystatic", permanent: false },
      // Extracts & tinctures were discontinued — send old product links to the catalog instead of a 404.
      { source: "/product/:slug(lomis-fafris-eqstrakti|chagas-nayeni)", destination: "/catalog", permanent: false },
      { source: "/en/product/:slug(lomis-fafris-eqstrakti|chagas-nayeni)", destination: "/en/catalog", permanent: false },
    ];
  },
};

export default nextConfig;
