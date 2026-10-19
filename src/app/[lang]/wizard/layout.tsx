import type { Metadata } from "next";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { pageMetadata } from "@/lib/seo";

// The wizard page is a client component, so its metadata lives here.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = (await getDictionary(lang)).metadata.pages.wizard;
  return pageMetadata({ lang, path: "/wizard", title, description });
}

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
