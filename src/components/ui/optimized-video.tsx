"use client";

import { Video as ImageKitVideo } from '@imagekit/next';
import { imagekitConfig, buildImagekitUrl } from '@/lib/imagekit';
import type { ComponentProps } from 'react';

interface OptimizedVideoProps extends Omit<ComponentProps<typeof ImageKitVideo>, 'urlEndpoint'> {
  src: string;
  width?: number;
  height?: number;
  transformation?: Array<Record<string, any>>;
  className?: string;
  posterSrc?: string;
}

export function OptimizedVideo({
  src,
  width = 800,
  height = 600,
  transformation,
  className,
  posterSrc,
  autoPlay,
  muted,
  loop,
  preload,
  playsInline,
  controls,
  ...props
}: OptimizedVideoProps) {
  // Generate ImageKit video URL with original parameter to bypass transformation limits
  const videoUrl = `${imagekitConfig.urlEndpoint}${src}?tr=orig-true`;

  // Generate poster URL if needed
  const posterUrl = posterSrc 
    ? buildImagekitUrl({ src: posterSrc })
    : undefined;

  return (
    <video
      src={videoUrl}
      width={width}
      height={height}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      preload={preload || (autoPlay ? "auto" : "metadata")}
      poster={posterUrl}
      {...props}
    />
  );
}