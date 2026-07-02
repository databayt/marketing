"use client";

import { useRef } from "react";
import {
  cubicBezier,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

// Scrub-smoothing for scroll-linked bleed. Overdamped (no overshoot), ~0.6s
// settle — the value keeps easing for a beat after you stop scrolling, which is
// the GSAP `scrub: 0.8` / Apple sticky-hero feel. Shared with the Ready hero.
export const BLEED_SPRING = {
  stiffness: 100,
  damping: 30,
  mass: 0.5,
  restDelta: 0.001,
} as const;

// power2.out-ish — soft, decelerating finish (matches Anthropic's `power2.out`).
export const BLEED_EASE = cubicBezier(0.22, 1, 0.36, 1);

// easeInCubic — slow to start, then accelerates ("slower in the first few
// scrolls, then fast up"). Used for the footer bleed's open.
export const BLEED_EASE_IN = cubicBezier(0.32, 0, 0.67, 0);

/**
 * Inverse of the Ready ("journey of wonder") hero clip, tuned to the Apple
 * education-hero + Anthropic 81k-interviews CTA feel.
 *
 * The block enters tight — inset 6% from the page edges (≈ Anthropic's 88.45%
 * max-width) with 24px rounded corners — holds, then opens out to a square,
 * edge-to-edge full-bleed band as it scrolls toward center ("init tighter and
 * go edge to edge"). Spring-smoothed + eased so the scrub is soft, not linear.
 *
 * Applied to a single outer wrapper around the pre-footer testimonial band and
 * the footer, so both clip together as one unit: only the outer corners round
 * (testimonial top + footer bottom) while the seam between them stays sharp.
 *
 * Driven by a clip-path, so the bleed costs no layout — children never reflow.
 */
export function useScrollBleed() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Begin when the block enters the bottom of the viewport, finish once it
    // reaches center — so the expand completes while it's the focus, which also
    // works for the page-bottom footer that never scrolls fully past the top.
    offset: ["start end", "center center"],
  });
  const progress = useSpring(scrollYProgress, BLEED_SPRING);
  // Start opening early (no flat hold) but ease IN — it barely moves over the
  // first stretch of scroll, then accelerates to edge-to-edge ("slower first,
  // then fast up"). Symmetric % so it scales / stays RTL-safe.
  const insetX = useTransform(
    progress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["6%", "0%"],
    { ease: BLEED_EASE_IN }
  );
  const radius = useTransform(
    progress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [24, 0],
    { ease: BLEED_EASE_IN }
  );
  const clipPath = useMotionTemplate`inset(0px ${insetX} round ${radius}px)`;

  return { ref, clipPath };
}
