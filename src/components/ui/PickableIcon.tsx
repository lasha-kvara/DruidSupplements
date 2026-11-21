import {
  Activity,
  BadgePercent,
  Brain,
  Clock,
  Coffee,
  Droplet,
  Flame,
  Gift,
  Heart,
  HeartPulse,
  Leaf,
  MessageCircleHeart,
  Moon,
  Mountain,
  Shield,
  ShieldCheck,
  Smile,
  Sparkles,
  Sprout,
  Sun,
  Truck,
  Zap,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import type { PickableIconName } from "@/lib/icons";

const ICONS: Record<PickableIconName, LucideIcon> = {
  Leaf,
  Sprout,
  Mountain,
  Truck,
  MessageCircleHeart,
  Shield,
  ShieldCheck,
  Zap,
  Brain,
  Moon,
  Sun,
  Heart,
  HeartPulse,
  Activity,
  Sparkles,
  Droplet,
  Flame,
  Smile,
  Coffee,
  Clock,
  Gift,
  BadgePercent,
};

/** Renders an icon chosen in the admin panel; unknown names fall back to a leaf. */
export function PickableIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICONS[name as PickableIconName] ?? Leaf;
  return <Icon {...props} />;
}
