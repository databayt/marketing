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
      className="h-14 w-14 md:h-8 md:w-8 px-0"
      onClick={toggleLanguage}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" className="h-14 w-14 md:h-4 md:w-4">
        <path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5l3.11 3.11l.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
      </svg>
      <span className="sr-only">Toggle language</span>
    </Button>
  );
}