/** Shared by the server layout (no-flash script) and the client ThemeToggle. */
export const THEME_STORAGE_KEY = "theme";
export type Theme = "light" | "dark";

/**
 * Inline script for <head>: applies the saved theme (or the OS preference) before first paint,
 * so there is no light flash on dark devices. Keep it tiny and dependency-free.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;
