import { cn } from "@/lib/utils";
import type { ContentBlock } from "./constant";

/**
 * Renders structured article blocks with a Medium-style reading rhythm:
 * generous measure, large line-height, and (in LTR) a serif body.
 */
export function ArticleBody({
  blocks,
  serif,
  className,
}: {
  blocks: ContentBlock[];
  serif: boolean;
  className?: string;
}) {
  return (
    <div className={cn("space-y-6", className)}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                className={cn(
                  "pt-2 text-2xl font-bold tracking-tight text-foreground",
                  serif && "font-serif"
                )}
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className={cn(
                  "border-s-[3px] border-foreground/70 ps-5 text-xl italic leading-relaxed text-foreground/90",
                  serif && "font-serif"
                )}
              >
                {block.text}
              </blockquote>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2 ps-6">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className={cn(
                      "list-disc text-lg leading-8 text-foreground/80 marker:text-muted-foreground",
                      serif && "font-serif"
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <p
                key={i}
                className={cn(
                  "text-lg leading-8 text-foreground/80",
                  serif && "font-serif"
                )}
              >
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
