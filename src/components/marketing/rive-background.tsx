'use client';

import { useRive } from '@rive-app/react-canvas';

export function RiveBackground() {
  const { RiveComponent } = useRive({
    src: '/bubble-tiptap.riv',
    autoplay: true,
  });

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <RiveComponent className="w-full h-full" />
    </div>
  );
}
