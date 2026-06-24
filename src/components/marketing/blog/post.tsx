import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { ArticleActions } from "./article-actions";
import { FeedCard } from "./card";
import {
  authorInitials,
  formatDate,
  getBlogPost,
  getRelatedPosts,
} from "./constant";
import { ArticleBody } from "./prose";
import { ReadingProgress } from "./reading-progress";

export default function BlogPost({
  id,
  lang,
  dict,
}: {
  id: string;
  lang: Locale;
  dict: Dictionary;
}) {
  const post = getBlogPost(id);
  if (!post) notFound();

  const useSerif = lang === "en";
  const initials = authorInitials(post.author.name);
  const related = getRelatedPosts(id, 2);

  return (
    <>
      <ReadingProgress />

      <div className="full-bleed">
        <div className="container-content">
          <article className="mx-auto mt-18 w-full max-w-[42rem] py-10 sm:py-14">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4 rtl:rotate-180" />
              {dict.blog?.backToBlog ?? "Back to blog"}
            </Link>

            <h1
              className={cn(
                "mt-8 text-3xl font-bold leading-tight tracking-tight sm:text-[2.75rem] sm:leading-[1.15]",
                useSerif && "font-serif"
              )}
            >
              {post.title}
            </h1>
            <p
              className={cn(
                "mt-4 text-xl leading-relaxed text-muted-foreground",
                useSerif && "font-serif"
              )}
            >
              {post.description}
            </p>

            {/* Author + actions */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-11">
                  <AvatarFallback className="text-sm">{initials}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium text-foreground">
                    {post.author.name}
                  </div>
                  <div className="text-muted-foreground">
                    {formatDate(post.date, lang)} · {post.readingTime}
                  </div>
                </div>
              </div>
              <ArticleActions
                title={post.title}
                labels={{
                  share: dict.blog?.share ?? "Share",
                  copyLink: dict.blog?.copyLink ?? "Copy link",
                  linkCopied: dict.blog?.linkCopied ?? "Link copied",
                  save: dict.blog?.save ?? "Save",
                  saved: dict.blog?.saved ?? "Saved",
                }}
              />
            </div>

            <Separator className="mt-6" />

            {/* Hero */}
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
              <OptimizedImage
                src={post.cover}
                alt={post.title}
                width={1280}
                height={720}
                priority
                className="h-full w-full object-cover"
              />
            </div>

            {/* Body */}
            <ArticleBody blocks={post.content} serif={useSerif} className="mt-10" />

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full font-normal text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <Separator className="mt-10" />

            {/* Author bio */}
            <div className="mt-8 flex items-start gap-4">
              <Avatar className="size-12">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {dict.blog?.writtenBy ?? "Written by"}
                </div>
                <div className="mt-1 font-semibold text-foreground">
                  {post.author.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {post.author.role}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* More from the blog */}
      {related.length > 0 && (
        <div className="full-bleed border-t border-border bg-muted/30">
          <div className="container-content py-12">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                {dict.blog?.moreFromBlog ?? "More from the blog"}
              </h2>
              <div className="mt-2 divide-y divide-border">
                {related.map((rp) => (
                  <FeedCard key={rp.id} post={rp} locale={lang} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
