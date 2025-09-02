"use client";

import { useState } from "react";
import type { ComponentProps } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";

import { cn } from "@/lib/utils";

export default function BlurImage(props: ComponentProps<typeof OptimizedImage>) {
  const [isLoading, setLoading] = useState(true);

  return (
    <OptimizedImage
      {...props}
      alt={props.alt}
      className={cn(
        props.className,
        "duration-500 ease-in-out",
        isLoading ? "blur-sm" : "blur-0",
      )}
      onLoad={() => setLoading(false)}
    />
  );
}
