import { getDictionary, type Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/locales';

// Server-side dictionary hook
export async function useDictionary(locale: Locale): Promise<Dictionary> {
  return await getDictionary(locale);
}

// Utility function for server components
export async function getServerDictionary(locale: Locale): Promise<Dictionary> {
  return await getDictionary(locale);
}