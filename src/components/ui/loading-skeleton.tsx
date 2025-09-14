"use client";

import { cn } from "@/lib/utils";
import { memo } from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton = memo(({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  )
});

Skeleton.displayName = "Skeleton";

// Project card skeleton for the gallery
export const ProjectCardSkeleton = memo(() => {
  return (
    <div className="p-2 h-full w-full">
      <div className="h-full w-full overflow-hidden relative z-20">
        <div className="relative z-50">
          <div className="space-y-3">
            {/* Image skeleton */}
            <div className="h-64 md:h-48 relative w-full overflow-hidden rounded-md">
              <Skeleton className="w-full h-full" />
            </div>
            {/* Title skeleton */}
            <Skeleton className="h-6 w-3/4" />
            {/* Description skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCardSkeleton.displayName = "ProjectCardSkeleton";

// Gallery skeleton with multiple cards
export const ProjectGallerySkeleton = memo(() => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 -mx-2">
      {Array.from({ length: 6 }).map((_, idx) => (
        <ProjectCardSkeleton key={idx} />
      ))}
    </div>
  );
});

ProjectGallerySkeleton.displayName = "ProjectGallerySkeleton";