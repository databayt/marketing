"use client";

import { useEffect, useRef, useState } from 'react';
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

  // Autoplaying videos are ambient: fetch them only once they come near the
  // viewport (instead of megabytes at page load) and pause them while off screen.
  const videoRef = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(!autoPlay);

  useEffect(() => {
    const video = videoRef.current;
    if (!autoPlay || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          if (video.currentSrc && video.paused) video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlay]);

  return (
    <video
      ref={videoRef}
      src={nearViewport ? videoUrl : undefined}
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
