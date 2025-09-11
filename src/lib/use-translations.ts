'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import type { Locale } from '@/components/internationalization/config';
import { i18n, localeConfig } from '@/components/internationalization/config';

// Import both dictionaries statically for better performance and SSR
import enTranslations from '@/components/internationalization/en.json';
import arTranslations from '@/components/internationalization/ar.json';

type TranslationDict = typeof enTranslations;

const dictionaries = {
  en: enTranslations,
  ar: arTranslations,
} as const;

export function useTranslations() {
  const params = useParams();
  const locale = (params?.lang as Locale) || i18n.defaultLocale;
  
  const t = useMemo(() => {
    return dictionaries[locale] || dictionaries[i18n.defaultLocale];
  }, [locale]);

  return {
    t,
    locale,
    isRTL: localeConfig[locale]?.dir === 'rtl',
    localeConfig: localeConfig[locale]
  };
}