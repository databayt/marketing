import type { Metadata } from "next";
import { i18n, type Locale } from "@/components/internationalization/config";

/**
 * The canonical origin. Production serves www.databayt.org (the apex 301s
 * there), so canonicals, hreflang and the sitemap must name www — never the
 * apex, never localhost.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.databayt.org"
).replace(/\/+$/, "");

export const SITE_NAME = "Databayt";

export const OG_LOCALE: Record<Locale, string> = { en: "en_US", ar: "ar_SA" };

/** Absolute URL for a locale + path ("" is the locale home). */
export function localeUrl(lang: Locale, path = "") {
  return `${SITE_URL}/${lang}${path}`;
}

/**
 * The share card per locale (public/og/<lang>.png, rendered by
 * scripts/og-cards.cjs). Set explicitly because a page-level `openGraph`
 * replaces the inherited one, image included.
 */
export function ogImages(lang: Locale) {
  return [{ url: `${SITE_URL}/og/${lang}.png`, width: 1200, height: 630, alt: SITE_NAME }];
}

/** hreflang map for one path across every locale, plus x-default. */
export function languageAlternates(path = "") {
  return {
    ...Object.fromEntries(i18n.locales.map((l) => [l, localeUrl(l, path)])),
    "x-default": localeUrl(i18n.defaultLocale, path),
  };
}

/**
 * Per-page metadata: title, description, self-canonical, hreflang and the
 * OpenGraph/Twitter fields that must match the page (not the site default).
 */
export function pageMetadata({
  lang,
  path = "",
  title,
  description,
  type = "website",
}: {
  lang: Locale;
  path?: string;
  /** `{ absolute }` skips the layout's "%s | Databayt" template. */
  title?: string | { absolute: string };
  description?: string;
  type?: "website" | "article";
}): Metadata {
  const url = localeUrl(lang, path);
  const socialTitle = typeof title === "object" ? title.absolute : title;
  return {
    ...(title && { title }),
    ...(description && { description }),
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[lang],
      alternateLocale: i18n.locales.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: ogImages(lang),
      ...(socialTitle && { title: socialTitle }),
      ...(description && { description }),
    },
    twitter: {
      card: "summary_large_image",
      images: ogImages(lang).map((i) => i.url),
      ...(socialTitle && { title: socialTitle }),
      ...(description && { description }),
    },
  };
}
