import SiteContent from "@/components/marketing/content";
import { getDictionary } from '@/components/internationalization/dictionaries';
import type { Locale } from '@/components/internationalization/config';

export const metadata = {
  title: "Home",
}

export default async function Site({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  
  return <SiteContent dictionary={dictionary} params={{ lang }} />;
}
