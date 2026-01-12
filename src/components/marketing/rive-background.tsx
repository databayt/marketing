'use client';

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

export function RiveBackground() {
  const { RiveComponent } = useRive({
    src: '/bubble-tiptap.riv',
    artboard: 'bubble',
    animations: 'bubble-timeline',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '3024px', height: '3024px' }}
      >
        <RiveComponent className="w-full h-full" />
      </div>
    </div>
  );
}
