import type { Locale } from '@/lib/locales';

// Dictionary type based on English structure
type Dictionary = typeof import('./en.json');

// Lazy-loaded dictionaries
const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  ar: () => import('./ar.json').then((module) => module.default),
} as const;

// Get dictionary with fallback to English
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  try {
    return await dictionaries[locale]?.() ?? dictionaries.en();
  } catch (error) {
    console.warn(`Failed to load dictionary for locale: ${locale}. Falling back to English.`);
    return dictionaries.en();
  }
};

// Export dictionary type for type safety
export type { Dictionary };