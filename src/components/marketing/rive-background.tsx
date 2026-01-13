'use client';

import { useEffect, useRef, useState } from 'react';

export function RiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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

    const initRive = async () => {
      if (!canvasRef.current) return;

      const RiveModule = await import('@rive-app/webgl2');
      const { Rive } = RiveModule;

      rive = new Rive({
        src: '/bubble-tiptap.riv',
        canvas: canvasRef.current,
        artboard: 'bubble',
        animations: 'bubble-timeline',
        autoplay: true,
      });
    };

    initRive();

    return () => {
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
              className="select-none"
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
