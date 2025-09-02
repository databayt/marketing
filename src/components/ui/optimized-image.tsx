"use client";

import { Image as ImageKitImage } from '@imagekit/next';
import { imagekitConfig } from '@/lib/imagekit';
import type { ComponentProps } from 'react';

interface OptimizedImageProps extends Omit<ComponentProps<typeof ImageKitImage>, 'urlEndpoint'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  transformation?: Array<Record<string, any>>;
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  transformation,
  className,
  priority,
  loading,
  ...props
}: OptimizedImageProps) {
  // Default transformations for optimization
  const defaultTransformations = [
    {
      width,
      height,
      crop: 'maintain_ratio',
      quality: 'auto',
      format: 'auto'
    }
  ];

  // Merge with custom transformations
  const finalTransformations = transformation 
    ? [...defaultTransformations, ...transformation]
    : defaultTransformations;

  // Handle loading priority logic
  const loadingProps = priority 
    ? { priority: true } 
    : { loading: loading || 'lazy' };

  return (
    <ImageKitImage
      urlEndpoint={imagekitConfig.urlEndpoint}
      src={src}
      alt={alt}
      width={width}
      height={height}
      transformation={finalTransformations}
      className={className}
      {...loadingProps}
      {...props}
    />
  );
}