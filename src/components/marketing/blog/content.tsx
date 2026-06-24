"use client";

import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useTranslations } from "@/lib/use-translations";
import { blogPosts } from "./constant";

export default function BlogContent() {
  const { t, locale } = useTranslations();

  return (
    <div className="full-bleed">
      <div className="container-content">
        <div className="flex w-full flex-col py-14 mt-18">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t.common?.blog || "Blog"}
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              {t.blog?.subtitle ||
                "Stories, ideas, and lessons from building modern web products."}
            </p>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/${locale}/blog/${post.id}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-foreground/20"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <OptimizedImage
                    src={post.cover}
                    alt={post.title}
                    width={480}
                    height={270}
                    className="h-full w-full object-cover p-10 transition-transform duration-300 group-hover:scale-105 dark:invert"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {post.tag}
                  </span>
                  <h2 className="text-lg font-semibold leading-snug group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                  <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
