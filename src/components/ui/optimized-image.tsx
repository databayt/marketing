"use client";

import { imagekitConfig, buildImagekitUrl } from '@/lib/imagekit';
import type { ComponentProps } from 'react';

interface OptimizedImageProps extends ComponentProps<'img'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  transformation?: Array<Record<string, any>>;
  className?: string;
  priority?: boolean;
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
  // Generate ImageKit image URL with original parameter to bypass restrictions
  const imageUrl = transformation 
    ? buildImagekitUrl({ src, transformation })
    : `${imagekitConfig.urlEndpoint}${src}?tr=orig-true`;

  // Handle loading priority logic
  const loadingProps = priority 
    ? { priority: true } 
    : { loading: loading || 'lazy' };

  return (
    <img
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...loadingProps}
      {...props}
    />
  );
}