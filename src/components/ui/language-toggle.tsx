'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from '@/lib/use-translations';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useTranslations();

  const toggleLanguage = React.useCallback(() => {
    // Switch between 'en' and 'ar'
    const newLocale = locale === 'en' ? 'ar' : 'en';
    
    // Get the current path without locale prefix
    const segments = pathname.split('/').filter(Boolean);
    const currentLocale = segments[0];
    
    if (currentLocale === locale) {
      // Replace the current locale with the new one
      segments[0] = newLocale;
    } else {
      // Add locale prefix if it doesn't exist
      segments.unshift(newLocale);
    }
    
    const newPath = '/' + segments.join('/');
    router.push(newPath);
  }, [locale, pathname, router]);

  return (
    <Button
      variant="link"
      size="sm"
      className="h-8 w-8 px-0"
      onClick={toggleLanguage}
    >
      <Languages className="h-4 w-4" />
      <span className="sr-only">Toggle language</span>
    </Button>
  );
}