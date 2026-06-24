"use client";

import { useState } from "react";
import { Bookmark, Link2, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ArticleActionsProps {
  title: string;
  labels: {
    share: string;
    copyLink: string;
    linkCopied: string;
    save: string;
    saved: string;
  };
}

/**
 * Medium-style share + save row. Interactive leaf so the article page itself
 * can stay a Server Component.
 */
export function ArticleActions({ title, labels }: ArticleActionsProps) {
  const [saved, setSaved] = useState(false);

  const currentUrl = () =>
    typeof window === "undefined" ? "" : window.location.href;

  const openShare = (url: string) =>
    window.open(url, "_blank", "noopener,noreferrer");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl());
      toast.success(labels.linkCopied);
    } catch {
      toast.error(labels.copyLink);
    }
  };

  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9 rounded-full hover:text-foreground"
        aria-label="Share on X"
        onClick={() =>
          openShare(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              title
            )}&url=${encodeURIComponent(currentUrl())}`
          )
        }
      >
        <Twitter className="size-[18px]" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9 rounded-full hover:text-foreground"
        aria-label="Share on LinkedIn"
        onClick={() =>
          openShare(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              currentUrl()
            )}`
          )
        }
      >
        <Linkedin className="size-[18px]" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9 rounded-full hover:text-foreground"
        aria-label={labels.copyLink}
        onClick={copyLink}
      >
        <Link2 className="size-[18px]" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "size-9 rounded-full hover:text-foreground",
          saved && "text-foreground"
        )}
        aria-label={saved ? labels.saved : labels.save}
        aria-pressed={saved}
        onClick={() => setSaved((s) => !s)}
      >
        <Bookmark className={cn("size-[18px]", saved && "fill-current")} />
      </Button>
    </div>
  );
}
