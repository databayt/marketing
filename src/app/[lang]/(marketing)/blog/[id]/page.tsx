import BlogPost from "@/components/marketing/blog/post";
import { blogPosts, getBlogPost } from "@/components/marketing/blog/constant";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import type { Metadata } from "next";
import { localeUrl, pageMetadata, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/atom/json-ld";

export function generateStaticParams(): { id: string }[] {
  return blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; lang: Locale }>;
}): Promise<Metadata> {
  const { id, lang } = await params;
  const post = getBlogPost(id);
  if (!post) return { title: "Blog", robots: { index: false } };
  const base = pageMetadata({
    lang,
    path: `/blog/${id}`,
    title: post.title,
    description: post.description,
    type: "article",
  });
  return {
    ...base,
    authors: [{ name: post.author.name }],
    keywords: post.tags,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string; lang: Locale }>;
}) {
  const { id, lang } = await params;
  const dict = await getDictionary(lang);
  const post = getBlogPost(id);
  return (
    <>
      {post && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { "@type": "Organization", name: post.author.name },
            publisher: { "@id": `${SITE_URL}/#organization` },
            mainEntityOfPage: localeUrl(lang, `/blog/${id}`),
            inLanguage: lang,
            keywords: post.tags.join(", "),
          }}
        />
      )}
      <BlogPost id={id} lang={lang} dict={dict} />
    </>
  );
}
