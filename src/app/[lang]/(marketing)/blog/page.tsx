import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import BlogContent from "@/components/marketing/blog/content";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = (await getDictionary(lang)).metadata.pages.blog;
  return pageMetadata({ lang, path: "/blog", title, description });
}

export default async function Blog({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <BlogContent lang={lang} dict={dict} />;
}
