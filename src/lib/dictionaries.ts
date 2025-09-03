import { type Locale, getTranslations, type TranslationKeys } from './locales';

interface Metadata {
  metadata: {
    title: string;
    description: string;
  };
}

export type Dictionary = TranslationKeys & Metadata;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const translations = getTranslations(locale);
  
  return {
    ...translations,
    metadata: {
      title: locale === 'ar' ? 'داتابيت - منصة التصميم' : 'Databayt - Design Platform',
      description: locale === 'ar' 
        ? 'منصة تصميم متقدمة لبناء تجارب رقمية مميزة' 
        : 'Advanced design platform for building exceptional digital experiences',
    },
  };
}