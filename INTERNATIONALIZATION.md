# Internationalization (i18n)

Single source of truth for the i18n setup. The site supports **English (LTR)** and **Arabic (RTL)** with automatic locale detection, cookie persistence, and dynamic switching.

## Stack

- Next.js 16 App Router with `proxy.ts` (replaces Next 15's `middleware.ts`)
- Path-prefix locale routing (`/en/...`, `/ar/...`)
- `@formatjs/intl-localematcher` + `negotiator` for locale negotiation
- Static JSON dictionaries (eager-loaded for client, dynamic-imported for server)

## File Layout

```
src/
├── app/
│   └── [lang]/                          # Locale-specific routes
│       ├── layout.tsx                   # Sets <html lang dir>, conditional Arabic font
│       ├── loading.tsx                  # Generic skeleton
│       ├── error.tsx                    # Error boundary
│       ├── not-found.tsx                # Locale-aware 404
│       ├── (marketing)/                 # Marketing pages
│       │   └── loading.tsx
│       ├── (auth)/                      # Auth pages
│       │   └── loading.tsx
│       ├── chatbot/
│       │   └── loading.tsx
│       └── wizard/
│           └── loading.tsx
├── components/
│   └── internationalization/
│       ├── config.ts                    # i18n.locales, localeConfig (dir, currency, etc.)
│       ├── dictionaries.ts              # server-only dynamic loader (getDictionary)
│       ├── use-locale.ts                # client useLocale + useSwitchLocaleHref
│       ├── en.json                      # English translations
│       └── ar.json                      # Arabic translations
└── lib/
    └── use-translations.ts              # Client hook with eager-loaded dicts
proxy.ts                                  # Next 16 locale-routing entrypoint
validate-i18n.js                          # Standalone validation script
```

## Routing (`proxy.ts`)

- Matcher excludes `api`, `_next`, `_static`, `favicon.ico`, and any path with a file extension.
- Reads `NEXT_LOCALE` cookie first; falls back to `Accept-Language` parsed by `negotiator` + `match()`.
- Redirects `/foo` → `/{locale}/foo` and persists the chosen locale in a 1-year cookie.

## Locale Config (`src/components/internationalization/config.ts`)

```ts
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ar'],
} as const;

export const localeConfig = {
  en: { name: 'English', nativeName: 'English', dir: 'ltr', flag: '🇺🇸', dateFormat: 'MM/dd/yyyy', currency: 'USD' },
  ar: { name: 'Arabic',  nativeName: 'العربية', dir: 'rtl', flag: '🇸🇦', dateFormat: 'dd/MM/yyyy', currency: 'SAR' },
} as const;
```

## Reading translations

**Server components** — dynamic-imported, server-only:
```ts
import { getDictionary } from '@/components/internationalization/dictionaries';
const dict = await getDictionary(lang);
return <h1>{dict.metadata.title}</h1>;
```

**Client components** — eager-loaded for both locales (single-trip render):
```tsx
'use client';
import { useTranslations } from '@/lib/use-translations';
export function Hero() {
  const { t, locale, isRTL } = useTranslations();
  return <h1 dir={isRTL ? 'rtl' : 'ltr'}>{t.marketing.hero.title}</h1>;
}
```

## RTL

The locale layout sets `<html lang={lang} dir={config.dir}>` and conditionally applies the Rubik Arabic font. **Always use logical Tailwind props** (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`, `start-`, `end-`) — never physical (`ml-`, `mr-`, `text-left`, `text-right`) — so styles auto-flip under `dir="rtl"`.

## Locale-aware formatting

Use `formatDate(date, locale)` and `formatCurrency(amount, locale)` from `@/components/marketing/utils`. Both accept the locale and format via `Intl.DateTimeFormat` / `Intl.NumberFormat`. Map currency from `localeConfig[locale].currency`.

## Adding a new translation key

1. Add the key to **both** `en.json` and `ar.json` (keep them aligned — the validate script enforces structure).
2. Use `t.path.to.key` in client components (via `useTranslations`) or `dict.path.to.key` in server components.
3. For new top-level groups, follow the existing namespace pattern: `metadata`, `common`, `navigation`, `auth`, `chatbot`, `marketing`, `wizard`, `expert`, `services`, etc.

## Validation

```bash
node validate-i18n.js
```

Checks the file layout, locale codes, locale config, proxy wiring, and dictionary deps.

## Known not-yet-internationalized

- Some `pricing/*` clone-artifact files contain English strings; they are not rendered today (dead code).
- Class 1 dead imports (`@/components/platform/dashboard/*`, `@/components/onboarding/*`) — pending feature decisions.
