import type { Locale } from "@/components/internationalization/config";
import { localeUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

type JsonLdObject = Record<string, unknown>;

/** Structured data for search engines; `<` is escaped so content can't close the tag. */
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "داتابيت",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: "support@databayt.org",
    sameAs: [
      "https://github.com/databayt",
      "https://www.linkedin.com/company/databayt-auto",
      "https://www.facebook.com/profile.php?id=61579954895228",
    ],
  };
}

export function websiteJsonLd(lang: Locale): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${localeUrl(lang)}#website`,
    name: SITE_NAME,
    url: localeUrl(lang),
    inLanguage: lang,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
