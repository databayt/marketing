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
      {/* Gradient fade overlay - white/background at top like Tiptap */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background)) 15%, transparent 45%)',
        }}
      />
      {/* Rive animation - smaller, positioned lower like Tiptap */}
      <div
        className="absolute"
        style={{
          width: '1000px',
          height: '1000px',
          top: '15%',
          left: '50%',
          transform: 'translateX(-40%)',
        }}
      >
        <RiveComponent className="w-full h-full" />
      </div>
    </div>
  );
}
