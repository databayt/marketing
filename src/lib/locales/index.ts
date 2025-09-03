import { en, type TranslationKeys } from './en';
import { ar } from './ar';

export const locales = {
  en,
  ar,
} as const;

export type Locale = keyof typeof locales;
export type { TranslationKeys };

export const defaultLocale: Locale = 'en';

export function getTranslations(locale: Locale): TranslationKeys {
  return locales[locale] || locales[defaultLocale];
}