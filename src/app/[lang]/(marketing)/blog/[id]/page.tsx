import BlogPost from "@/components/marketing/blog/post";
import { blogPosts, getBlogPost } from "@/components/marketing/blog/constant";
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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogPost id={id} />;
}
