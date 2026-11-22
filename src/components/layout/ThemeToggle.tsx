"use client";

import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

const currentTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  // Suppress every CSS transition for one frame so the whole page swaps colours at once.
  root.classList.add("theme-switching");
  root.dataset.theme = theme;
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => root.classList.remove("theme-switching")));
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* private mode — the choice just won't be remembered */
  }
}

/**
 * Sun/moon button. Which icon shows is decided by CSS (`dark:` variants), not React state,
 * so server and client render the same markup.
 */
export function ThemeToggle({ light = false, className }: { light?: boolean; className?: string }) {
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={() => applyTheme(currentTheme() === "dark" ? "light" : "dark")}
      aria-label={t.theme.toggle}
      title={t.theme.toggle}
      className={cn(
        "relative flex h-11 w-11 items-center justify-center rounded-full transition-colors",
        light ? "bg-white/10 text-cream ring-1 ring-white/20 hover:bg-white/20" : "bg-forest/5 text-forest ring-1 ring-forest/10 hover:bg-forest/10",
        className,
      )}
    >
      <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden />
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden />
    </button>
  );
}
