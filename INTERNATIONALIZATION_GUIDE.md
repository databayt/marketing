# Databayt Internationalization Standard

**A unified i18n pattern for all company projects**

## Table of Contents

1. [Company Standard Overview](#company-standard-overview)
2. [Unified Architecture Pattern](#unified-architecture-pattern)
3. [Standard File Structure](#standard-file-structure)
4. [Implementation Protocol](#implementation-protocol)
5. [Dictionary Management Standards](#dictionary-management-standards)
6. [Routing Strategy Standard](#routing-strategy-standard)
7. [Middleware Configuration](#middleware-configuration)
8. [Usage Patterns](#usage-patterns)
9. [Advanced Features](#advanced-features)
10. [Development Standards](#development-standards)
11. [Quality Assurance](#quality-assurance)

## Company Standard Overview

This document establishes the **mandatory internationalization standard** for all Databayt projects. This pattern was first implemented in the `template` project and must be replicated across all future projects to ensure consistency, maintainability, and developer productivity across our tech stack.

### Why Standardization Matters

- **Developer Velocity**: Consistent patterns reduce onboarding time
- **Code Reusability**: Shared utilities and patterns across projects
- **Maintenance Efficiency**: Unified debugging and optimization strategies
- **Quality Assurance**: Predictable behavior and testing patterns
- **Team Collaboration**: Shared knowledge and best practices

### Mandatory Implementation Features

- **URL-based routing**: `/en/about`, `/ar/about` - **REQUIRED**
- **Automatic locale detection**: Browser preferences, cookies, headers - **REQUIRED**
- **Lazy-loaded translations**: Performance-optimized dictionary loading - **REQUIRED**
- **Type-safe translations**: Full TypeScript support - **REQUIRED**
- **RTL support**: Complete right-to-left language support - **REQUIRED**
- **SEO optimization**: Proper hreflang tags and metadata - **REQUIRED**
- **Fallback handling**: Graceful degradation to default locale - **REQUIRED**

## Unified Architecture Pattern

### Company Core Principles

1. **Consistency First**: All projects MUST follow identical patterns
2. **Performance Standards**: Lazy loading and optimization are mandatory
3. **Type Safety**: Full TypeScript integration across all projects
4. **Developer Experience**: Identical API across all codebases
5. **Scalability**: Pattern must work for small apps to large platforms
6. **Accessibility**: RTL and semantic support in all implementations

### Standard Data Flow

```
User Request → Middleware → Locale Detection → Dictionary Loading → Component Rendering → UI
```

**This exact flow MUST be implemented in every project.**

## Standard File Structure

**This EXACT file structure MUST be used in every project:**

```
src/
├── middleware.ts                    # Locale detection and routing
├── app/
│   ├── [locale]/                   # Dynamic locale routing
│   │   ├── layout.tsx              # Locale-aware layout
│   │   ├── page.tsx                # Default redirect to locale
│   │   └── (routes)/               # All your routes here
│   └── page.tsx                    # Root redirect to default locale
├── lib/
│   ├── locales/
│   │   ├── index.ts                # Locale configuration and types
│   │   ├── en.ts                   # English translations (TypeScript)
│   │   └── ar.ts                   # Arabic translations (TypeScript)
│   ├── dictionaries/
│   │   ├── index.ts                # Dictionary loader with fallbacks
│   │   ├── en.json                 # English translations (JSON)
│   │   └── ar.json                 # Arabic translations (JSON)
│   ├── use-translations.ts         # Client-side translation hook
│   └── use-dictionary.ts           # Server-side dictionary utility
```

## Implementation Protocol

**Follow these steps EXACTLY for every new project:**

### Step 1: Configure Middleware (MANDATORY)

Create `middleware.ts` in your project root. **This file MUST be identical across all projects:**

```typescript
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ar', 'fr', 'es']; // Add your supported locales
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  // 1. Check URL pathname for existing locale
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameLocale) return pathnameLocale;

  // 2. Check user's saved preference in cookies
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 3. Parse Accept-Language header for browser preferences
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => locales.includes(lang));
    
    if (preferredLocale) return preferredLocale;
  }

  // 4. Fallback to default locale
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Redirect to localized URL if no locale present
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(
      `/${locale}${pathname === '/' ? '' : pathname}`,
      request.url
    );
    
    const response = NextResponse.redirect(newUrl);
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: 'lax'
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### Step 2: Create Locale Configuration

Create `src/lib/locales/index.ts`:

```typescript
import { en, type TranslationKeys } from './en';
import { ar } from './ar';

export const locales = {
  en,
  ar,
  // Add more locales here
} as const;

export type Locale = keyof typeof locales;
export type { TranslationKeys };

export const defaultLocale: Locale = 'en';

// Locale metadata for UI and SEO
export const localeConfig = {
  en: {
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇺🇸',
    dateFormat: 'MM/dd/yyyy',
    currency: 'USD',
  },
  ar: {
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦',
    dateFormat: 'dd/MM/yyyy',
    currency: 'SAR',
  },
} as const;

export function getTranslations(locale: Locale): TranslationKeys {
  return locales[locale] || locales[defaultLocale];
}

export function isRTL(locale: Locale): boolean {
  return localeConfig[locale]?.dir === 'rtl';
}
```

### Step 3: Define Translation Structure

Create `src/lib/locales/en.ts`:

```typescript
export const en = {
  common: {
    loading: "Loading...",
    error: "Something went wrong",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    back: "Back",
    next: "Next",
    previous: "Previous",
    // ... more common translations
  },
  navigation: {
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Contact",
    login: "Login",
    logout: "Logout",
    // ... navigation items
  },
  auth: {
    signIn: "Sign In",
    signUp: "Sign Up",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot Password?",
    // ... auth related translations
  },
  // Organize by feature/domain
  dashboard: {
    welcome: "Welcome back!",
    stats: {
      users: "Users",
      revenue: "Revenue",
      growth: "Growth",
    },
  },
  errors: {
    notFound: "Page not found",
    serverError: "Internal server error",
    unauthorized: "You are not authorized",
  },
} as const;

export type TranslationKeys = typeof en;
```

### Step 4: Create Dictionary Loader

Create `src/lib/dictionaries/index.ts`:

```typescript
import type { Locale } from '@/lib/locales';

// Type definition based on English structure
type Dictionary = typeof import('./en.json');

// Lazy-loaded dictionaries for optimal bundle splitting
const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  ar: () => import('./ar.json').then((module) => module.default),
} as const;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  try {
    // Attempt to load the requested locale
    return await dictionaries[locale]?.() ?? dictionaries.en();
  } catch (error) {
    console.warn(`Failed to load dictionary for locale: ${locale}. Falling back to English.`);
    return dictionaries.en();
  }
};

export type { Dictionary };
```

### Step 5: Setup Layout with Locale Support

Create `src/app/[locale]/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { type Locale, isRTL, localeConfig } from "@/lib/locales";
import { ThemeProvider } from "@/components/theme-provider";

// Configure fonts for different scripts
import { Inter } from "next/font/google";
import { Rubik } from "next/font/google"; // For Arabic

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const rubik = Rubik({ 
  subsets: ['arabic', 'latin'], 
  variable: '--font-rubik',
  display: 'swap' 
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: locale,
      alternateLocale: Object.keys(localeConfig).filter(l => l !== locale),
    },
    alternates: {
      languages: Object.keys(localeConfig).reduce((acc, locale) => ({
        ...acc,
        [locale]: `${baseUrl}/${locale}`,
      }), { 'x-default': `${baseUrl}/en` }),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isRTLLocale = isRTL(locale);
  const config = localeConfig[locale];
  
  return (
    <html lang={locale} dir={config.dir}>
      <body
        className={cn(
          "font-sans antialiased",
          isRTLLocale ? rubik.className : inter.className,
          inter.variable,
          rubik.variable
        )}
      >
        <ThemeProvider>
          <div className="min-h-screen">
            {/* Language-aware notifications positioning */}
            <Toaster position={isRTLLocale ? "bottom-left" : "bottom-right"} />
            
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return Object.keys(localeConfig).map((locale) => ({ locale }));
}
```

### Step 6: Create Translation Hooks

Create `src/lib/use-translations.ts` for client components:

```typescript
'use client';

import { useParams } from 'next/navigation';
import { getTranslations, type Locale, isRTL } from './locales';

export function useTranslations() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'en';
  const translations = getTranslations(locale);

  return {
    t: translations,
    locale,
    isRTL: isRTL(locale),
    // Helper functions
    formatCurrency: (amount: number) => {
      const config = localeConfig[locale];
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: config.currency,
      }).format(amount);
    },
    formatDate: (date: Date) => {
      return new Intl.DateTimeFormat(locale).format(date);
    },
  };
}
```

Create `src/lib/use-dictionary.ts` for server components:

```typescript
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/locales';

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export async function useDictionary(locale: Locale): Promise<Dictionary> {
  return await getDictionary(locale);
}

// Utility for server components
export async function getServerDictionary(locale: Locale): Promise<Dictionary> {
  return await getDictionary(locale);
}
```

## Dictionary Management Standards

**These standards MUST be followed across all projects:**

### JSON vs TypeScript Approach

**JSON Approach** (COMPANY STANDARD - MANDATORY):
- Better for non-technical translators
- Smaller bundle size (only loaded when needed)
- Easy integration with translation services
- Hot-reloadable in development

**TypeScript Approach** (SUPPLEMENTARY - for type definitions only):
- Full IntelliSense support
- Compile-time type checking
- Better refactoring support
- No runtime errors from missing keys

### Standard Translation Key Organization

**ALL projects MUST use this EXACT structure:**

```typescript
// ✅ COMPANY STANDARD: Organize by feature/domain
const translations = {
  dashboard: {
    user: {
      profile: "User Profile",
      settings: "User Settings",
    },
    analytics: {
      pageViews: "Page Views",
      uniqueVisitors: "Unique Visitors",
    }
  }
};

// ❌ FORBIDDEN: Flat structure for company projects
const translations = {
  userProfile: "User Profile",
  userSettings: "User Settings",
  dashboardPageViews: "Page Views",
  dashboardUniqueVisitors: "Unique Visitors",
};
```

### Handling Dynamic Content

```typescript
// For interpolation
const translations = {
  greeting: "Hello, {name}!",
  itemCount: "You have {count, plural, =0 {no items} =1 {one item} other {# items}}",
};

// Usage helper function
function interpolate(template: string, values: Record<string, any>): string {
  return template.replace(/{(\w+)}/g, (match, key) => values[key] || match);
}
```

## Routing Strategy Standard

### Standard URL Structure (MANDATORY)

**ALL projects MUST implement this EXACT URL pattern:**

```
/                    → Redirects to /en (REQUIRED)
/en                  → English homepage (REQUIRED)
/en/about            → English about page (REQUIRED)
/ar                  → Arabic homepage (REQUIRED)
/ar/about            → Arabic about page (REQUIRED)
```

**No exceptions to this URL structure are allowed.**

### Standard Route Groups (MANDATORY)

**ALL projects MUST use this EXACT route group structure:**

```
src/app/[locale]/
├── (auth)/          # Authentication pages
│   ├── login/
│   └── register/
├── (dashboard)/     # Protected dashboard
│   ├── analytics/
│   └── settings/
└── (marketing)/     # Public marketing pages
    ├── about/
    ├── pricing/
    └── contact/
```

## Advanced Features

### Language Switcher Component

```typescript
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from '@/lib/use-translations';
import { localeConfig, type Locale } from '@/lib/locales';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useTranslations();

  const switchLocale = (newLocale: Locale) => {
    // Replace current locale in pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <select 
      value={locale} 
      onChange={(e) => switchLocale(e.target.value as Locale)}
      className="border rounded px-2 py-1"
    >
      {Object.entries(localeConfig).map(([code, config]) => (
        <option key={code} value={code}>
          {config.flag} {config.nativeName}
        </option>
      ))}
    </select>
  );
}
```

### RTL Support with Tailwind

```css
/* globals.css */
[dir="rtl"] {
  --tw-space-x-reverse: 1;
}

[dir="rtl"] .space-x-4 > :not([hidden]) ~ :not([hidden]) {
  margin-left: 1rem;
  margin-right: 0;
}
```

### SEO Optimization

```typescript
// In your layout or page components
export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    alternates: {
      canonical: `https://yoursite.com/${params.locale}`,
      languages: {
        'en': 'https://yoursite.com/en',
        'ar': 'https://yoursite.com/ar',
        'x-default': 'https://yoursite.com/en',
      },
    },
    openGraph: {
      locale: params.locale,
      alternateLocale: ['en', 'ar'].filter(l => l !== params.locale),
    },
  };
}
```

## Development Standards

### 1. Performance Standards (MANDATORY)

- **Lazy load dictionaries**: Only load the current locale's translations
- **Use JSON for large translation files**: Better tree-shaking and bundle splitting
- **Implement proper caching**: Cache dictionaries in production
- **Optimize fonts**: Load only required character sets

### 2. Type Safety Standards (MANDATORY)

- **Define strict types**: Use TypeScript for translation keys - **REQUIRED**
- **Create helper types**: For interpolation and pluralization - **REQUIRED**
- **Validate translations**: Ensure all locales have the same keys - **REQUIRED**

### 3. Developer Experience Standards (MANDATORY)

- **Consistent naming**: Use clear, descriptive key names - **REQUIRED**
- **Organize logically**: Group related translations together - **REQUIRED**
- **Document context**: Add comments for complex translations - **REQUIRED**
- **Provide fallbacks**: Always have a default value - **REQUIRED**

### 4. Accessibility Standards (MANDATORY)

- **Proper lang attributes**: Set correct language on HTML elements - **REQUIRED**
- **RTL support**: Implement proper text direction - **REQUIRED**
- **Screen reader support**: Consider translation context - **REQUIRED**
- **Keyboard navigation**: Ensure language switcher is accessible - **REQUIRED**

### 5. Content Management Standards (MANDATORY)

- **Version control**: Track translation changes - **REQUIRED**
- **Translation workflow**: Integrate with translation services - **REQUIRED**
- **Quality assurance**: Review translations before deployment - **REQUIRED**
- **Placeholder strategy**: Handle missing translations gracefully - **REQUIRED**

## Quality Assurance

### 1. Common Issues to Avoid (MANDATORY KNOWLEDGE)

**Hydration Mismatches:**

```typescript
// ❌ FORBIDDEN: Server and client render different content
function Component() {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslations();
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null; // This causes hydration issues
  
  return <div>{t.common.loading}</div>;
}

// ✅ COMPANY STANDARD: Use consistent server/client patterns
function Component() {
  const { t } = useTranslations();
  
  return <div>{t.common.loading}</div>;
}
```

**Missing Translation Keys:**

```typescript
// ❌ FORBIDDEN: Runtime errors from missing keys
function Component() {
  const { t } = useTranslations();
  return <div>{t.nonexistent.key}</div>; // Error!
}

// ✅ COMPANY STANDARD: Create a safe translation helper
function getSafeTranslation(obj: any, path: string, fallback: string = 'Missing translation'): string {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return fallback;
    }
  }
  
  return typeof result === 'string' ? result : fallback;
}
```

### 3. Improper Locale Detection

```typescript
// ❌ Problem: Not handling edge cases
function getLocale(request: NextRequest) {
  return request.headers.get('Accept-Language')?.slice(0, 2); // Too simplistic
}

// ✅ Solution: Robust locale detection
function getLocale(request: NextRequest) {
  // Check pathname, cookies, headers with proper validation
  // Always have a fallback to default locale
}
```

### 4. Bundle Size Issues

```typescript
// ❌ Problem: Loading all translations upfront
import allTranslations from './all-translations';

// ✅ Solution: Dynamic imports
const getDictionary = async (locale: string) => {
  const dict = await import(`./dictionaries/${locale}.json`);
  return dict.default;
};
```

### 2. Implementation Checklist

**Before deploying any project with i18n, verify ALL items:**

- [ ] Middleware follows exact company pattern
- [ ] File structure matches standard layout
- [ ] URL routing implements required `/en/` and `/ar/` structure
- [ ] TypeScript types are properly defined
- [ ] RTL support is fully implemented
- [ ] SEO metadata includes proper hreflang tags
- [ ] Performance optimizations are in place
- [ ] Fallback handling works correctly
- [ ] All translations follow key organization standards
- [ ] Language switcher component is implemented
- [ ] Code review passed by senior developer

### 3. Testing Requirements

**ALL projects MUST pass these tests:**

- **URL Routing**: Test all locale redirects work correctly
- **Translation Loading**: Verify lazy loading works in production
- **RTL Layouts**: Test Arabic layout renders properly  
- **SEO Tags**: Validate hreflang and metadata generation
- **Performance**: Measure bundle size impact
- **Accessibility**: Test screen reader support
- **Fallbacks**: Test missing translation handling

## Company Implementation Standard

This document establishes the **non-negotiable** internationalization standard for all Databayt projects. 

### Why This Standard Exists

- **Code Consistency**: Every developer can work on any project instantly
- **Maintenance Efficiency**: Bugs fixed once apply to all projects
- **Performance Guarantee**: All projects benefit from optimizations
- **Quality Assurance**: Predictable behavior across the platform
- **Team Velocity**: No decision fatigue on i18n architecture

### Enforcement

- **Code Reviews**: All i18n implementations must follow this standard
- **Project Onboarding**: New projects must implement this before first deployment
- **Documentation**: This guide is the single source of truth
- **Updates**: Any changes to this standard must be applied across ALL projects

### Key Benefits of This Unified Approach

- **Developer Velocity**: Consistent patterns reduce learning curve to zero
- **Code Reusability**: Translation utilities can be shared across projects
- **Maintenance Efficiency**: Bug fixes and optimizations benefit all projects
- **Quality Assurance**: Predictable behavior and testing patterns
- **Team Collaboration**: Shared knowledge base and troubleshooting

### Success Metrics

This standardization enables our team to:
- Implement i18n in new projects within 2 hours
- Onboard new developers to any project's i18n in under 30 minutes
- Share translation utilities and components across all projects
- Apply performance optimizations company-wide instantly
- Maintain consistent UX across our entire product suite

**This pattern is mandatory for ALL Databayt projects. No exceptions.**