/**
 * Central store configuration. Change phone numbers, socials and delivery
 * terms here — every component reads from this file.
 */
export const siteConfig = {
  name: "დრუიდი",
  tagline: "სამკურნალო სოკოები და მცენარეები",
  description:
    "სამკურნალო სოკოები, მცენარეები და ექსტრაქტები საქართველოს ტყეებიდან და სანდო მწარმოებლებისგან. ლაბორატორიულად შემოწმებული ხარისხი, სწრაფი მიწოდება მთელ საქართველოში.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://druid.ge",

  /** Digits only, with country code, no "+" — used for https://wa.me/<number> */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "995555123456",
  /** Used for tel: links */
  phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+995555123456",
  /** Human-readable phone */
  phoneDisplay: "+995 555 12 34 56",
  email: "info@druid.ge",
  address: "თბილისი, საქართველო",
  workingHours: "ორშ–შაბ, 10:00–20:00",

  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
  },

  delivery: {
    tbilisiPrice: 5,
    regionsPrice: 8,
    freeFrom: 100,
    tbilisiTime: "იმავე ან მომდევნო დღეს",
    regionsTime: "1–3 სამუშაო დღეში",
  },

  currency: "₾",
} as const;

export const navLinks = [
  { href: "/", label: "მთავარი" },
  { href: "/catalog", label: "კატალოგი" },
  { href: "/blog", label: "ბლოგი" },
  { href: "/#faq", label: "კითხვები" },
] as const;
