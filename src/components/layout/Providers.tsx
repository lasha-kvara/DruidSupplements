"use client";

import { MotionConfig } from "framer-motion";
import { QuickOrderProvider } from "@/components/order/QuickOrderProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user" respects the OS "reduce motion" setting for every animation.
    <MotionConfig reducedMotion="user">
      <QuickOrderProvider>{children}</QuickOrderProvider>
    </MotionConfig>
  );
}
