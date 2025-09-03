'use client';

import { useTranslations } from '@/lib/use-translations';

export function InternationalizedContent() {
  const { t, locale, isRTL } = useTranslations();

  return (
    <div className={`p-6 border rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}>
      <h2 className="text-2xl font-bold mb-4">
        {t.marketing.hero.title}
      </h2>
      <p className="text-muted-foreground mb-4">
        {t.marketing.hero.subtitle}
      </p>
      <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded">
          {t.marketing.hero.cta}
        </button>
        <button className="border border-border px-4 py-2 rounded">
          {t.marketing.hero.learnMore}
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-muted rounded">
        <h3 className="font-semibold mb-2">{t.common.language}: {locale.toUpperCase()}</h3>
        <p className="text-sm text-muted-foreground">
          RTL Support: {isRTL ? 'Enabled' : 'Disabled'}
        </p>
      </div>
    </div>
  );
}