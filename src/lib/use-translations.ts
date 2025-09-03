'use client';

import { useParams } from 'next/navigation';
import { getTranslations, type Locale } from './locales';

export function useTranslations() {
  const params = useParams();
  // Get locale from URL params or default to 'en'
  const locale = (params?.locale as Locale) || 'en';
  const translations = getTranslations(locale);

  return {
    t: translations,
    locale,
    isRTL: locale === 'ar',
  };
}