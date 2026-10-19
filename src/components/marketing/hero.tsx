'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GeistSans } from 'geist/font/sans';
import type { getDictionary } from '@/components/internationalization/dictionaries';
import type { Locale } from '@/components/internationalization/config';
import { localeConfig } from '@/components/internationalization/config';
import { AppointmentModal } from './appointment-modal';

interface HeroProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['marketing']['hero'];
  params: { lang: Locale };
}

/**
 * The Thmanyah hero pattern (databayt/thmanyah HeroBlock, measured from
 * font.thmanyah.com): label · word-wrapped serif display headline whose last
 * phrase sits on a highlight bar · one CTA pinned to the bottom. Copy fills the
 * same slots with the same word and letter counts. Layout lives in styles/hero.css.
 * The previous Rive-gradient hero is kept as codebase template hero-04.
 */

const H1_STYLE: React.CSSProperties = {
  fontFamily: '"thmanyah serif display", serif',
  fontWeight: 900,
  lineHeight: '1.4em',
  fontFeatureSettings: '"ss01" on',
  color: '#000',
};

// English sets the headline in Geist; Arabic keeps the Thmanyah serif.
const H1_STYLE_EN: React.CSSProperties = {
  fontFamily: GeistSans.style.fontFamily,
  fontWeight: 700,
  lineHeight: '1.4em',
  letterSpacing: '-0.04em',
  color: '#000',
};

const SANS_STYLE: React.CSSProperties = {
  fontFamily: '"thmanyah sans", sans-serif',
  fontWeight: 400,
  fontFeatureSettings: '"blwf" on, "cv09" on, "cv03" on, "cv04" on, "cv11" on',
};

// Every hero block fades in from perspective(1200px) translateY(100px) —
// the label from 50px — over 1.2s, as on the reference.
const EASE: [number, number, number, number] = [0.45, 0.4, 0.17, 0.82];
const appear = (y: number) => ({
  initial: { opacity: 0.001, y, transformPerspective: 1200 },
  animate: { opacity: 1, y: 0, transformPerspective: 1200 },
  transition: { duration: 1.2, ease: EASE, type: 'tween' as const },
});

export function Hero({ dictionary, params }: HeroProps) {
  const t = dictionary;
  const dir = localeConfig[params.lang]?.dir === 'rtl' ? 'rtl' : 'ltr';
  const h1Style = dir === 'rtl' ? H1_STYLE : H1_STYLE_EN;
  const sansStyle = dir === 'rtl' ? SANS_STYLE : { ...SANS_STYLE, fontFamily: GeistSans.style.fontFamily };
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  // One headline row; the optional last phrase sits on the highlight bar.
  const renderLine = (words: string[], highlight?: string, key?: number) => (
    <div key={key} className="hero-line flex flex-row justify-start items-center">
      {words.map((word, i) => (
        <span key={i} className="hero-word text-start" style={h1Style}>
          {word}
        </span>
      ))}
      {highlight && (
        <div className="relative flex flex-row justify-center items-center">
          <motion.div {...appear(100)} className="hero-mark" aria-hidden />
          <span className="hero-word relative text-start" style={h1Style}>
            {highlight}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <section
      dir={dir}
      className="hero-section relative z-0 w-screen ms-[calc(50%-50vw)] h-screen bg-[#00bc6d] flex flex-col justify-between items-center overflow-hidden"
    >
      <motion.div {...appear(100)} className="hero-text will-change-transform">
        <motion.div {...appear(50)} className="w-full">
          <h3 className="hero-title w-full text-start text-black" style={sansStyle}>
            {t.label}
          </h3>
        </motion.div>

        {/* One h1 for search engines and screen readers; the word-by-word
            layouts below are visual only. */}
        <h1 className="sr-only">{t.title.replace(/\n/g, ' ')}</h1>
        {/* Desktop/tablet: two lines. Phone (<600px): its own line breaks. */}
        <div aria-hidden className="hero-words hero-desktop flex-col items-start w-full">
          {renderLine(t.words)}
          {renderLine(t.words2, t.highlight)}
        </div>
        <div aria-hidden className="hero-words hero-mobile flex-col items-start w-full">
          {t.mobileLines.map((line: string[], i: number) =>
            renderLine(line, i === t.mobileLines.length - 1 ? t.mobileHighlight : undefined, i),
          )}
        </div>
      </motion.div>

      <motion.div {...appear(100)} className="hero-cta">
        <button
          type="button"
          onClick={() => setAppointmentModalOpen(true)}
          className="inline-flex flex-row items-center justify-center gap-[10px] h-10 px-4 rounded-[20px] bg-black cursor-pointer"
        >
          <span className="text-[16px] leading-[24px] text-white" style={sansStyle}>
            <span className="hero-cta-full">{t.cta}</span>
            <span className="hero-cta-short">{t.appointment}</span>
          </span>
          <motion.span
            className="block w-5 h-5 shrink-0 will-change-transform"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="w-full h-full block"
              fill="#fff"
              aria-hidden
            >
              <path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z" />
            </svg>
          </motion.span>
        </button>
      </motion.div>

      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
      />
    </section>
  );
}
