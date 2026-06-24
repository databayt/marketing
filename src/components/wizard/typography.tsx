'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type TypographySelectorProps = {
  selectedTypography?: string;
  onSelect: (typographyId: string) => void;
  locale: string;
};

type Font = {
  id: string;
  /** Shown inside the wheel, rendered in its own family */
  sample: string;
  style: React.CSSProperties;
  className?: string;
};

const FONTS: Font[] = [
  { id: 'geist', sample: 'Geist', style: { fontFamily: 'var(--font-geist-sans), sans-serif' } },
  { id: 'inter', sample: 'Inter', style: { fontFamily: 'Inter, sans-serif' } },
  { id: 'roboto', sample: 'Roboto', style: { fontFamily: 'Roboto, sans-serif' } },
  { id: 'poppins', sample: 'Poppins', style: { fontFamily: 'Poppins, sans-serif' } },
  { id: 'playfair', sample: 'Playfair', style: { fontFamily: '"Playfair Display", Georgia, serif' }, className: 'italic' },
  { id: 'mono', sample: 'Geist Mono', style: { fontFamily: 'var(--font-geist-mono), monospace' } },
  { id: 'rubik', sample: 'Rubik', style: { fontFamily: 'var(--font-rubik), sans-serif' } },
  { id: 'cairo', sample: 'القاهرة', style: { fontFamily: 'Cairo, var(--font-rubik), sans-serif' } },
  { id: 'tajawal', sample: 'تجوال', style: { fontFamily: 'Tajawal, var(--font-rubik), sans-serif' } },
  { id: 'amiri', sample: 'أميري', style: { fontFamily: 'Amiri, serif' } },
];

const ITEM_H = 56;
const VISIBLE = 5;
const PAD = ((VISIBLE - 1) / 2) * ITEM_H;

export const TypographySelector = ({
  selectedTypography,
  onSelect,
}: TypographySelectorProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const initial = Math.max(0, FONTS.findIndex((f) => f.id === selectedTypography));
  const activeRef = useRef(initial);
  const [active, setActive] = useState(initial);

  // Center the initial selection and report it once on mount.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = initial * ITEM_H;
    onSelect(FONTS[initial].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const idx = Math.min(
        FONTS.length - 1,
        Math.max(0, Math.round(el.scrollTop / ITEM_H))
      );
      // Notify outside of any state updater so we never setState-in-render.
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
        onSelect(FONTS[idx].id);
      }
    });
  }, [onSelect]);

  const scrollTo = (i: number) =>
    scrollRef.current?.scrollTo({ top: i * ITEM_H, behavior: 'smooth' });

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="relative w-80 max-w-[90vw]"
        style={{ height: VISIBLE * ITEM_H }}
      >
        {/* Center selection band — borderless, subtle background only */}
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 rounded-2xl bg-muted/40"
          style={{ height: ITEM_H }}
        />

        {/* iOS-style fade masks (top + bottom) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-2/5 bg-gradient-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-2/5 bg-gradient-to-t from-background to-transparent" />

        {/* Hide the wheel's scrollbar across engines (Tailwind arbitrary
            variants proved unreliable here, so scope a real rule). */}
        <style>{`.wheel-scroll::-webkit-scrollbar{display:none;width:0;height:0}`}</style>

        {/* The wheel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="wheel-scroll relative z-10 h-full snap-y snap-mandatory overflow-y-scroll"
          style={{ scrollbarWidth: 'none' } as React.CSSProperties}
        >
          <div style={{ height: PAD }} />
          {FONTS.map((f, i) => {
            const dist = Math.abs(i - active);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => scrollTo(i)}
                className="flex w-full snap-center items-center justify-center"
                style={{ height: ITEM_H }}
              >
                <span
                  className={cn('transition-all duration-200', f.className)}
                  style={{
                    ...f.style,
                    fontSize: dist === 0 ? '1.875rem' : dist === 1 ? '1.375rem' : '1.125rem',
                    opacity: dist === 0 ? 1 : dist === 1 ? 0.45 : 0.2,
                    fontWeight: dist === 0 ? 600 : 400,
                  }}
                >
                  {f.sample}
                </span>
              </button>
            );
          })}
          <div style={{ height: PAD }} />
        </div>
      </div>
    </div>
  );
};
