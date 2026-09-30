"use client";

import { useState } from 'react';
import { imagekitConfig, buildImagekitUrl } from '@/lib/imagekit';
import type { ComponentProps, ReactEventHandler } from 'react';

// Widths offered to the browser when the caller passes `sizes`: it downloads the
// smallest one that covers the slot at the device's pixel ratio, not the original.
const RESPONSIVE_WIDTHS = [320, 480, 640, 828, 1080, 1280];

interface OptimizedImageProps extends ComponentProps<'img'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  transformation?: Array<Record<string, any>>;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  /** The file lives in /public and is served by this site, not the ImageKit library. */
  local?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  transformation,
  className,
  priority,
  placeholder,
  blurDataURL,
  loading,
  local,
  ...props
}: OptimizedImageProps) {
  // Set when a resized ImageKit rendition fails (e.g. transformations are
  // restricted on the account); the untouched original is the fallback.
  const [resizeFailed, setResizeFailed] = useState(false);

  // Generate ImageKit image URL with original parameter to bypass restrictions
  const imageUrl = local
    ? src
    : transformation
      ? buildImagekitUrl({ src, transformation })
      : `${imagekitConfig.urlEndpoint}${src}?tr=orig-true`;

  const srcSet = !local && !transformation && sizes && !resizeFailed
    ? RESPONSIVE_WIDTHS
        .map((w) => `${imagekitConfig.urlEndpoint}${src}?tr=w-${w},c-at_max ${w}w`)
        .join(', ')
    : undefined;

  // Generate low quality blur placeholder if needed
  const blurUrl = placeholder === 'blur' && !blurDataURL && !local
    ? `${imagekitConfig.urlEndpoint}${src}?tr=w-10,h-10,bl-10,q-10`
    : blurDataURL;

  // Handle loading priority logic - convert priority to loading attribute
  const loadingProps = priority
    ? { loading: 'eager' as const, fetchPriority: 'high' as const }
    : { loading: loading || 'lazy' as const };

  // Filter out custom props that shouldn't be passed to img element
  const { quality, onLoad, onError, ...imgProps } = props as typeof props & { quality?: number };

  const handleError: ReactEventHandler<HTMLImageElement> = (e) => {
    if (srcSet) setResizeFailed(true);
    onError?.(e);
  };

  const imageStyle = fill
    ? {
        position: 'absolute' as const,
        width: '100%',
        height: '100%',
        inset: 0,
        objectFit: 'cover' as const,
        ...props.style
      }
    : props.style;

  return (
    <img
      src={imageUrl}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={imageStyle}
      decoding="async"
      {...loadingProps}
      onLoad={onLoad}
      onError={handleError}
      {...(placeholder === 'blur' && blurUrl && {
        onLoad: (e) => {
          const img = e.target as HTMLImageElement;
          img.style.filter = 'none';
          onLoad?.(e);
        },
        style: {
          ...imageStyle,
          filter: 'blur(8px)',
          backgroundImage: `url(${blurUrl})`,
          backgroundSize: 'cover',
          transition: 'filter 0.3s ease-out'
        }
      })}
      {...imgProps}
    />
  );
}
