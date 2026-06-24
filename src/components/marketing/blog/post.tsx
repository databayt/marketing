"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useTranslations } from "@/lib/use-translations";
import { getBlogPost } from "./constant";

export default function BlogPost({ id }: { id: string }) {
  const { t, locale } = useTranslations();
  const post = getBlogPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="full-bleed">
      <div className="container-content">
        <article className="mx-auto flex w-full max-w-2xl flex-col py-14 mt-18">
          <Link
            href={`/${locale}/blog`}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" />
            {t.blog?.backToBlog || "Back to blog"}
          </Link>

          <span className="mt-8 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {post.tag}
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span aria-hidden>·</span>
            <span>{post.date}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>

          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <OptimizedImage
              src={post.cover}
              alt={post.title}
              width={768}
              height={432}
              className="h-full w-full object-cover p-16 dark:invert"
            />
          </div>

          <p className="mt-8 text-lg leading-relaxed text-foreground/90">
            {post.description}
          </p>
          <p className="mt-6 leading-relaxed text-foreground/80">{post.body}</p>
        </article>
      </div>
    </div>
  );
}
