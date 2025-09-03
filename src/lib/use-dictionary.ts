import { getDictionary } from '@/lib/dictionaries';
import type { Locale, TranslationKeys } from '@/lib/locales';

export type Dictionary = TranslationKeys;

// Server-side dictionary hook
export async function useDictionary(locale: Locale): Promise<Dictionary> {
  return await getDictionary(locale);
}

// Utility function for server components
export async function getServerDictionary(locale: Locale): Promise<Dictionary> {
  return await getDictionary(locale);
}