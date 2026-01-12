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
      {/* Gradient fade overlay - blends to background at top */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 25%)',
        }}
      />
      {/* Rive animation - large and centered to fill hero */}
      <div
        className="absolute"
        style={{
          width: '150vw',
          height: '150vh',
          top: '-25vh',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <RiveComponent className="w-full h-full" />
      </div>
    </div>
  );
}
