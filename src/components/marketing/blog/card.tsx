import Link from "next/link";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { authorInitials, formatDate, type BlogPost } from "./constant";

/** Full-width feed row: text on the inline-start, thumbnail on the inline-end. */
export function FeedCard({
  post,
  locale,
}: {
  post: BlogPost;
  locale: string;
}) {
  return (
    <article className="group">
      <Link
        href={`/${locale}/blog/${post.id}`}
        className="flex items-start gap-5 py-6 sm:gap-8"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm">
            <Avatar className="size-5">
              <AvatarFallback className="text-[9px]">
                {authorInitials(post.author.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-foreground/80">{post.author.name}</span>
          </div>

          <h2 className="mt-2 text-lg font-bold leading-snug tracking-tight text-foreground group-hover:underline sm:text-xl">
            {post.title}
          </h2>
          <p className="mt-1 hidden text-sm leading-relaxed text-muted-foreground sm:line-clamp-2 sm:block">
            {post.description}
          </p>

          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <Badge
              variant="secondary"
              className="rounded-full font-normal text-muted-foreground"
            >
              {post.tag}
            </Badge>
            <span>{formatDate(post.date, locale)}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
            <Bookmark className="ms-auto size-4" aria-hidden />
          </div>
        </div>

        <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-md bg-muted sm:w-28">
          <OptimizedImage
            src={post.cover}
            alt={post.title}
            width={160}
            height={160}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
    </article>
  );
}

/** Tiny stacked item for the sidebar "Staff picks" list. */
export function CompactCard({
  post,
  locale,
}: {
  post: BlogPost;
  locale: string;
}) {
  return (
    <Link href={`/${locale}/blog/${post.id}`} className="group block">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Avatar className="size-4">
          <AvatarFallback className="text-[8px]">
            {authorInitials(post.author.name)}
          </AvatarFallback>
        </Avatar>
        <span className="text-foreground/80">{post.author.name}</span>
      </div>
      <h3 className="mt-1.5 text-sm font-bold leading-snug text-foreground group-hover:underline">
        {post.title}
      </h3>
      <div className="mt-1.5 text-xs text-muted-foreground">
        {formatDate(post.date, locale)} · {post.readingTime}
      </div>
    </Link>
  );
}
