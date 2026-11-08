import type { Metadata } from "next";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { pageMetadata } from "@/lib/seo";
import BillingStudio from "@/components/marketing/billing/studio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = (await getDictionary(lang)).metadata.pages.invoice;
  // Internal tool for filling a school's papers: shareable link, never indexed.
  return { ...pageMetadata({ lang, path: "/invoice", title, description }), robots: { index: false } };
}

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  return <BillingStudio kind="invoice" lang={lang === "ar" ? "ar" : "en"} />;
}
