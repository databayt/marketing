import BlogPost from "@/components/marketing/blog/post";
import { blogPosts, getBlogPost } from "@/components/marketing/blog/constant";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import type { Metadata } from "next";

export function generateStaticParams(): { id: string }[] {
  return blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPost(id);
  return {
    title: post?.title ?? "Blog",
    description: post?.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string; lang: Locale }>;
}) {
  const { id, lang } = await params;
  const dict = await getDictionary(lang);
  return <BlogPost id={id} lang={lang} dict={dict} />;
}
