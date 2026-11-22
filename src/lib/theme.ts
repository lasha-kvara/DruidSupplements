/** Shared by the server layout (no-flash script) and the client ThemeToggle. */
export const THEME_STORAGE_KEY = "theme";
export type Theme = "light" | "dark";
export const DEFAULT_THEME: Theme = "dark";

/**
 * Inline script for <head>: applies the visitor's saved choice before first paint. Dark is the
 * site default (also server-rendered on <html>), so only a saved "light" changes anything.
 * Keep it tiny and dependency-free.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){}})()`;
