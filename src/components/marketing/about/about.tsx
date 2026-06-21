"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "@/lib/use-translations";
import { Content } from "./content";
import "./styles.css";

const LERP = 0.09; // damping for the smooth virtual scroll
const MAP_TOP = 120; // px — minimap distance from the top
const MAP_MAX_SCALE = 0.19; // never render the minimap larger than this
const BOX_PAD = 16; // px — tracker box padding around the scaled text
const REVEAL_RATIO = 0.88; // reveal a block once its top passes this much of the viewport

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(v, max));

const setStagger = (els: HTMLElement[]) => {
  els.forEach((el) => {
    let i = 0;
    let prev = el.previousElementSibling;
    while (prev) {
      if (prev.classList.contains("reveal")) i++;
      prev = prev.previousElementSibling;
    }
    el.style.transitionDelay = `${Math.min(i, 6) * 0.06}s`;
  });
};

const About = () => {
  const { t, isRTL } = useTranslations();

  // Layout refs
  const mainRef = useRef<HTMLDivElement>(null);
  const mainInnerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInnerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Animation state (kept in refs to avoid re-renders)
  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef<number | null>(null);
  const dims = useRef({ maxScroll: 0, scale: MAP_MAX_SCALE });
  const dragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);

  const [mode, setMode] = useState<"loading" | "desktop" | "mobile">("loading");

  // Decide rendering mode (desktop virtual scroll vs. native mobile scroll).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const decide = () =>
      setMode(window.innerWidth < 768 || reduce ? "mobile" : "desktop");
    decide();
    window.addEventListener("resize", decide);
    return () => window.removeEventListener("resize", decide);
  }, []);

  // ---- Desktop smooth-scroll engine (scroll + minimap + reveal) ----
  useEffect(() => {
    if (mode !== "desktop") return;

    const mainInner = mainInnerRef.current;
    const mapInner = mapInnerRef.current;
    const map = mapRef.current;
    const box = boxRef.current;
    if (!mainInner || !mapInner || !map || !box) return;

    const revealEls = Array.from(
      mainInner.querySelectorAll<HTMLElement>(".reveal")
    );
    setStagger(revealEls);
    let offsets: { el: HTMLElement; top: number }[] = [];

    const apply = () => {
      const { scale } = dims.current;
      mainInner.style.transform = `translate3d(0, ${-current.current}px, 0)`;
      box.style.transform = `translate3d(0, ${current.current * scale}px, 0)`;
    };

    // Reveal blocks as the scroll position passes them — driven by the frame
    // loop so fast jumps (minimap clicks/drags) never skip a block.
    const revealPass = () => {
      const V = window.innerHeight;
      const c = current.current;
      for (const o of offsets) {
        if (!o.el.classList.contains("is-in") && o.top - c < V * REVEAL_RATIO) {
          o.el.classList.add("is-in");
        }
      }
    };

    const frame = () => {
      current.current += (target.current - current.current) * LERP;
      const settled = Math.abs(target.current - current.current) < 0.08;
      if (settled) current.current = target.current;
      apply();
      revealPass();
      raf.current = settled ? null : requestAnimationFrame(frame);
    };
    const ensureRaf = () => {
      if (raf.current == null) raf.current = requestAnimationFrame(frame);
    };

    const measure = () => {
      const V = window.innerHeight;
      const W = mainInner.getBoundingClientRect().width;
      const H = mainInner.scrollHeight;
      const avail = V - MAP_TOP - 48;
      const scale = Math.min(MAP_MAX_SCALE, avail / H);
      const maxScroll = Math.max(0, H - V);
      const mapW = W * scale;

      mapInner.style.width = `${W}px`;
      mapInner.style.transformOrigin = isRTL ? "top right" : "top left";
      mapInner.style.transform = `scale(${scale})`;
      map.style.width = `${mapW}px`;
      map.style.height = `${H * scale}px`;
      map.style.opacity = "1";

      box.style.width = `${mapW + BOX_PAD * 2}px`;
      box.style.height = `${V * scale}px`;
      box.style.setProperty("inset-inline-start", `${-BOX_PAD}px`);

      // Element offsets from the content top (translate cancels out).
      const innerTop = mainInner.getBoundingClientRect().top;
      offsets = revealEls.map((el) => ({
        el,
        top: el.getBoundingClientRect().top - innerTop,
      }));

      dims.current = { maxScroll, scale };
      target.current = clamp(target.current, 0, maxScroll);
      current.current = clamp(current.current, 0, maxScroll);
      apply();
      revealPass();
    };

    // Inputs ---------------------------------------------------------------
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : 1; // line vs. pixel mode
      target.current = clamp(
        target.current + e.deltaY * unit,
        0,
        dims.current.maxScroll
      );
      ensureRaf();
    };

    const onKey = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const V = window.innerHeight;
      const max = dims.current.maxScroll;
      let next = target.current;
      switch (e.key) {
        case "ArrowDown": next += 120; break;
        case "ArrowUp": next -= 120; break;
        case "PageDown": case " ": next += V * 0.85; break;
        case "PageUp": next -= V * 0.85; break;
        case "Home": next = 0; break;
        case "End": next = max; break;
        default: return;
      }
      e.preventDefault();
      target.current = clamp(next, 0, max);
      ensureRaf();
    };

    // Minimap drag + click-to-jump ----------------------------------------
    const onPointerDown = (e: PointerEvent) => {
      const { scale, maxScroll } = dims.current;
      if (e.target === box) {
        dragging.current = true;
        dragStartY.current = e.clientY;
        dragStartScroll.current = current.current;
      } else {
        const rect = map.getBoundingClientRect();
        const boxH = window.innerHeight * scale;
        const localY = e.clientY - rect.top;
        target.current = clamp((localY - boxH / 2) / scale, 0, maxScroll);
        dragging.current = true;
        dragStartY.current = e.clientY;
        dragStartScroll.current = target.current;
        ensureRaf();
      }
      map.setPointerCapture(e.pointerId);
      e.preventDefault();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const { scale, maxScroll } = dims.current;
      const delta = (e.clientY - dragStartY.current) / scale;
      target.current = clamp(dragStartScroll.current + delta, 0, maxScroll);
      ensureRaf();
    };
    const onPointerUp = () => {
      dragging.current = false;
    };

    const ro = new ResizeObserver(measure);
    ro.observe(mainInner);

    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", measure);
    map.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    document.body.style.overflow = "hidden";

    return () => {
      ro.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", measure);
      map.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
      document.body.style.overflow = "";
    };
  }, [mode, isRTL]);

  // ---- Reveal-on-enter for true mobile (native scroll → IO is reliable) ----
  useEffect(() => {
    if (mode !== "mobile") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = mainRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    setStagger(items);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mode]);

  const backHref = isRTL ? "/ar" : "/en";

  if (mode === "mobile") {
    return (
      <div className="about-root about-mobile">
        <Link href={backHref} className="about-back">
          {t.marketing.about.backLink}
        </Link>
        <div ref={mainRef} className="about-main">
          <div className="about-main-inner">
            <Content />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="about-root">
      <Link href={backHref} className="about-back">
        {t.marketing.about.backLink}
      </Link>

      {/* Minimap navigator (decorative duplicate of the content) */}
      <div ref={mapRef} className="about-map" aria-hidden="true">
        <div ref={mapInnerRef} className="about-map-inner">
          <Content />
        </div>
        <div ref={boxRef} className="about-box" />
      </div>

      {/* Main content column */}
      <div ref={mainRef} className="about-main">
        <div ref={mainInnerRef} className="about-main-inner">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default About;
