import type { Metadata } from "next";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { pageMetadata } from "@/lib/seo";
import PricingContent from "@/components/marketing/pricing/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = (await getDictionary(lang)).metadata.pages.pricing;
  return pageMetadata({ lang, path: "/pricing", title, description });
}

export default function Pricing() {
  return <PricingContent />;
}