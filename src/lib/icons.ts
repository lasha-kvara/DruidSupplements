/**
 * Icons that editors can pick in the admin panel (trust cards, benefit cards).
 * Plain data (no React) so keystatic.config.ts can import it; the components map
 * the names to lucide-react icons in src/components/ui/PickableIcon.tsx.
 */
export const pickableIcons = [
  { value: "Leaf", label: "ფოთოლი" },
  { value: "Sprout", label: "აღმონაცენი" },
  { value: "Mountain", label: "მთა" },
  { value: "Truck", label: "მიწოდება" },
  { value: "MessageCircleHeart", label: "კონსულტაცია" },
  { value: "Shield", label: "ფარი (იმუნიტეტი)" },
  { value: "ShieldCheck", label: "ფარი ნიშნით" },
  { value: "Zap", label: "ელვა (ენერგია)" },
  { value: "Brain", label: "ტვინი (ფოკუსი)" },
  { value: "Moon", label: "მთვარე (ძილი)" },
  { value: "Sun", label: "მზე" },
  { value: "Heart", label: "გული" },
  { value: "HeartPulse", label: "გულისცემა" },
  { value: "Activity", label: "აქტივობა" },
  { value: "Sparkles", label: "ნაპერწკლები" },
  { value: "Droplet", label: "წვეთი" },
  { value: "Flame", label: "ალი" },
  { value: "Smile", label: "ღიმილი" },
  { value: "Coffee", label: "ფინჯანი" },
  { value: "Clock", label: "საათი" },
  { value: "Gift", label: "საჩუქარი" },
  { value: "BadgePercent", label: "ფასდაკლება" },
] as const;

export type PickableIconName = (typeof pickableIcons)[number]["value"];
