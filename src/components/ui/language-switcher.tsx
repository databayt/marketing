'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/use-translations';
import { useSwitchLocaleHref } from '@/components/internationalization/use-locale';
import { localeConfig, i18n } from '@/components/internationalization/config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Languages } from 'lucide-react';
import type { Locale } from '@/components/internationalization/config';

export function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = useTranslations();
  const switchLocaleHref = useSwitchLocaleHref();

  const handleLanguageChange = (newLocale: string) => {
    const href = switchLocaleHref(newLocale as Locale);
    
    // Set cookie to persist user preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`;
    
    router.push(href);
  };

  const currentLanguage = localeConfig[locale as Locale];

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto min-w-[120px] gap-2">
        <Languages className="h-4 w-4" />
        <SelectValue>
          {currentLanguage?.nativeName || currentLanguage?.name}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {i18n.locales.map((localeCode) => {
          const language = localeConfig[localeCode];
          return (
            <SelectItem key={localeCode} value={localeCode}>
              <div className="flex items-center gap-2">
                <span>{language.flag}</span>
                <span>{language.nativeName}</span>
                {language.nativeName !== language.name && (
                  <span className="text-muted-foreground text-sm">
                    ({language.name})
                  </span>
                )}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}