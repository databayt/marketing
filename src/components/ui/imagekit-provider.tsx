"use client";

import { ImageKitProvider as IKProvider } from '@imagekit/next';
import { imagekitConfig } from '@/lib/imagekit';

interface ImageKitProviderProps {
  children: React.ReactNode;
}

export function ImageKitProvider({ children }: ImageKitProviderProps) {
  return (
    <IKProvider 
      urlEndpoint={imagekitConfig.urlEndpoint}
      transformationPosition="query"
    >
      {children}
    </IKProvider>
  );
}