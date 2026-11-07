import type { Metadata } from "next";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { pageMetadata } from "@/lib/seo";
import CardContent from "@/components/marketing/card/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = (await getDictionary(lang)).metadata.pages.card;
  // Utility page: shareable link, kept out of the index and the sitemap.
  return { ...pageMetadata({ lang, path: "/card", title, description }), robots: { index: false } };
}

export default function Card() {
  return <CardContent />;
}
