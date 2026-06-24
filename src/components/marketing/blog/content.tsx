import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { CompactCard, FeedCard } from "./card";
import { blogPosts, getAllTopics } from "./constant";

export default function BlogContent({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const useSerif = lang === "en";
  const topics = getAllTopics();
  const title = dict.common?.blog ?? "Blog";
  const subtitle =
    dict.blog?.subtitle ??
    "Stories, ideas, and lessons from building modern web products.";

  return (
    <div className="full-bleed">
      <div className="container-content">
        <div className="mt-18 py-10 sm:py-14">
          {/* Masthead */}
          <header className="border-b border-border pb-8">
            <h1
              className={cn(
                "text-4xl font-bold tracking-tight sm:text-5xl",
                useSerif && "font-serif"
              )}
            >
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {subtitle}
            </p>

            {/* Topic strip (mobile only — sidebar carries it on lg+) */}
            <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto lg:hidden">
              {topics.map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="shrink-0 rounded-full font-normal text-muted-foreground"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </header>

          {/* Feed + sidebar */}
          <div className="mt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
            <div className="divide-y divide-border">
              {blogPosts.map((post) => (
                <FeedCard key={post.id} post={post} locale={lang} />
              ))}
            </div>

            <aside className="mt-10 hidden lg:mt-0 lg:block">
              <div className="space-y-8 py-6 lg:sticky lg:top-24">
                <section>
                  <h2 className="text-sm font-bold tracking-tight text-foreground">
                    {dict.blog?.staffPicks ?? "Staff picks"}
                  </h2>
                  <div className="mt-5 space-y-5">
                    {blogPosts.map((post) => (
                      <CompactCard key={post.id} post={post} locale={lang} />
                    ))}
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-sm font-bold tracking-tight text-foreground">
                    {dict.blog?.topics ?? "Recommended topics"}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="rounded-full font-normal text-muted-foreground"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </section>

                <Separator />

                <section className="rounded-lg border border-border p-5">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarFallback className="text-xs">DB</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-semibold text-foreground">
                        {dict.common?.brandName ?? "Databayt"}
                      </div>
                      <div className="text-muted-foreground">
                        Engineering &amp; Design
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {subtitle}
                  </p>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
