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

  // Handle loading priority logic - convert priority to loading attribute
  const loadingProps = priority 
    ? { loading: 'eager' } 
    : { loading: loading || 'lazy' };

  // Filter out Next.js Image specific props that shouldn't be passed to img element
  const { fill, sizes, quality, placeholder, blurDataURL, onLoad, onError, ...imgProps } = props;

  return (
    <img
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...loadingProps}
      {...imgProps}
    />
  );
}