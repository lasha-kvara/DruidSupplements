/**
 * Static export for GitHub Pages.
 * PAGES_BASE_PATH is set by the deploy workflow ("/DruidSupplements");
 * locally it is empty, so `npm run dev` serves from "/".
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    // GitHub Pages has no image optimizer; the loader just prefixes the base path.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
