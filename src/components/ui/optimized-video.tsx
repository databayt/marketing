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
  ...props
}: OptimizedVideoProps) {
  // Default transformations for video optimization
  const defaultTransformations = [
    {
      width,
      height,
      quality: 'auto',
      videoCodec: 'h264'
    }
  ];

  // Merge with custom transformations
  const finalTransformations = transformation 
    ? [...defaultTransformations, ...transformation]
    : defaultTransformations;

  // Only generate poster if not autoplaying and no poster provided
  const shouldShowPoster = !autoPlay && posterSrc !== undefined;
  const posterUrl = shouldShowPoster && posterSrc 
    ? buildImagekitUrl({ src: posterSrc })
    : shouldShowPoster 
      ? buildImagekitUrl({ 
          src: `${src}/ik-thumbnail.jpg`,
          transformation: [{ width, height, crop: 'maintain_ratio' }]
        })
      : undefined;

  return (
    <ImageKitVideo
      urlEndpoint={imagekitConfig.urlEndpoint}
      src={src}
      width={width}
      height={height}
      transformation={finalTransformations}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      preload={preload || (autoPlay ? "auto" : "metadata")}
      poster={posterUrl}
      {...props}
    />
  );
}