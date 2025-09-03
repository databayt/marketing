import { type Locale, getTranslations } from './locales';

interface Dictionary {
  metadata: {
    title: string;
    description: string;
  };
}

export async function getDictionary(locale: Locale): Promise<Dictionary & ReturnType<typeof getTranslations>> {
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