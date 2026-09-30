'use client';

import { useEffect, useRef, useState } from 'react';
import { afterLoadIdle } from '@/lib/idle';

export function RiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let rive: any = null;
    let cancelled = false;

    // Decorative: skip it for reduced-motion and data-saver visitors.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || connection?.saveData) {
      return;
    }

    const initRive = async () => {
      // The runtime is ~140 KB of JS plus a 2 MB WASM; nothing on first paint
      // depends on it, so it loads after the page has.
      const RiveModule = await import('@rive-app/webgl2');
      if (cancelled || !canvasRef.current) return;
      const { Rive } = RiveModule;

      rive = new Rive({
        src: '/bubble-tiptap.riv',
        canvas: canvasRef.current,
        artboard: 'bubble',
        animations: 'bubble-timeline',
        autoplay: true,
        onLoad: () => setIsReady(true),
      });
    };

    const cancelIdle = afterLoadIdle(initRive);

    return () => {
      cancelled = true;
      cancelIdle();
      if (rive) {
        rive.cleanup();
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Top gradient fade - blends with header */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 8%)',
        }}
      />
      {/* tt-gradient-container equivalent - absolute positioned, fills hero */}
      <div
        className="absolute inset-0 select-none"
        style={{ zIndex: 1 }}
      >
        {/* tt-gradient-panel-unsticky equivalent - offset positioning */}
        <div
          className="relative flex justify-center items-start select-none"
          style={{
            top: isMobile ? '50%' : '-40%',
            left: isMobile ? '50%' : '20%',
            transform: isMobile ? 'translate(-50%, -50%)' : 'none',
            paddingTop: isMobile ? '0' : '20rem',
          }}
        >
          {/* tt-gradient-position equivalent */}
          <div className="sticky" style={{ top: 'auto' }}>
            {/* Canvas - responsive sizing */}
            <canvas
              ref={canvasRef}
              className={`select-none transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
              style={{
                width: isMobile ? '200vw' : '120vw',
                maxWidth: isMobile ? '120rem' : '80rem',
                aspectRatio: isMobile ? '3 / 2' : '2 / 1',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
