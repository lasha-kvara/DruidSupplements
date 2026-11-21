import { ka, type Dictionary } from "./dictionaries/ka";
import { en } from "./dictionaries/en";
import type { Locale } from "./config";

export type { Dictionary };
export * from "./config";

const dictionaries: Record<Locale, Dictionary> = { ka, en };

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];
