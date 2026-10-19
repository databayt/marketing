import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SiteContent from "@/components/marketing/content";
import { getDictionary } from '@/components/internationalization/dictionaries';
import type { Locale } from '@/components/internationalization/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = (await getDictionary(lang)).metadata.pages.home;
  // An absolute title: the home page should not carry the "| Databayt" suffix.
  return pageMetadata({ lang, title: { absolute: title }, description });
}

export default async function Site({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  
  return <SiteContent dictionary={dictionary} params={{ lang }} />;
}
