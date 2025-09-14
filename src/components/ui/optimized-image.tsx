"use client";

import { imagekitConfig, buildImagekitUrl } from '@/lib/imagekit';
import type { ComponentProps } from 'react';

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
  ...props
}: OptimizedImageProps) {
  // Generate ImageKit image URL with original parameter to bypass restrictions
  const imageUrl = transformation 
    ? buildImagekitUrl({ src, transformation })
    : `${imagekitConfig.urlEndpoint}${src}?tr=orig-true`;

  // Generate low quality blur placeholder if needed
  const blurUrl = placeholder === 'blur' && !blurDataURL 
    ? `${imagekitConfig.urlEndpoint}${src}?tr=w-10,h-10,bl-10,q-10`
    : blurDataURL;

  // Handle loading priority logic - convert priority to loading attribute
  const loadingProps = priority 
    ? { loading: 'eager' as const } 
    : { loading: loading || 'lazy' as const };

  // Filter out custom props that shouldn't be passed to img element
  const { quality, onLoad, onError, ...imgProps } = props;

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
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={imageStyle}
      {...loadingProps}
      {...(placeholder === 'blur' && blurUrl && {
        onLoad: (e) => {
          const img = e.target as HTMLImageElement;
          img.style.filter = 'none';
          onLoad?.(e);
        },
        onError,
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