import type { Metadata } from "next";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { pageMetadata } from "@/lib/seo";
import ServiceContent from "@/components/marketing/service/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = (await getDictionary(lang)).metadata.pages.design;
  return pageMetadata({ lang, path: "/design", title, description });
}

export default function Design() {
  return <ServiceContent />;
}