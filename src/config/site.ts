/**
 * Store configuration. Phone numbers, socials, address, hours and delivery prices are
 * edited in the admin panel (/keystatic → „საკონტაქტო და მიწოდება“) and stored in
 * content/settings.json. Everything else here is fixed in code.
 */
import settings from "../../content/settings.json";

export const siteConfig = {
  /** Canonical URL: explicit env → Vercel production domain → localhost */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  /** Digits only, with country code, no "+" — used for https://wa.me/<number> */
  whatsappNumber: settings.whatsappNumber.replace(/\D/g, ""),
  /** Used for tel: links */
  phoneNumber: settings.phoneNumber.replace(/[^\d+]/g, ""),
  /** Human-readable phone */
  phoneDisplay: settings.phoneDisplay,
  email: settings.email,
  /** { ka, en } */
  address: settings.address,
  /** { ka, en } */
  workingHours: settings.workingHours,

  socials: {
    facebook: settings.facebook || "",
    instagram: settings.instagram || "",
    tiktok: settings.tiktok || "",
  },

  delivery: {
    tbilisiPrice: settings.tbilisiPrice ?? 5,
    regionsPrice: settings.regionsPrice ?? 8,
    freeFrom: settings.freeFrom ?? 100,
  },

  currency: "₾",
} as const;
