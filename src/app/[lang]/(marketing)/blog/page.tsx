import BlogContent from "@/components/marketing/blog/content";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";

export const metadata = {
  title: "Blog",
};

export default async function Blog({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <BlogContent lang={lang} dict={dict} />;
}
