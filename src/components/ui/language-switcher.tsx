'use client';

import { useRouter } from 'next/router';
import { useTranslations } from '@/lib/use-translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Languages } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const { locale, t } = useTranslations();

  const handleLanguageChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto min-w-[120px] gap-2">
        <Languages className="h-4 w-4" />
        <SelectValue>
          {currentLanguage?.nativeName || currentLanguage?.name}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span>{language.nativeName}</span>
              {language.code !== language.name.toLowerCase() && (
                <span className="text-muted-foreground text-sm">
                  ({language.name})
                </span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}