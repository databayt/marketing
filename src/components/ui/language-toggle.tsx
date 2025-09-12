'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/use-translations';
import { useSwitchLocaleHref } from '@/components/internationalization/use-locale';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import type { Locale } from '@/components/internationalization/config';

export function LanguageToggle() {
  const router = useRouter();
  const { locale } = useTranslations();
  const switchLocaleHref = useSwitchLocaleHref();

  const toggleLanguage = React.useCallback(() => {
    // Switch between 'en' and 'ar'
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const href = switchLocaleHref(newLocale as Locale);
    
    // Set cookie to persist user preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`;
    
    router.push(href);
  }, [locale, router, switchLocaleHref]);

  return (
    <Button
      variant="link"
      size="sm"
      className="h-12 w-12 md:h-8 md:w-8 px-0"
      onClick={toggleLanguage}
    >
      <Languages className="h-10 w-10 md:h-4 md:w-4" />
      <span className="sr-only">Toggle language</span>
    </Button>
  );
}