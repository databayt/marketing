"use client";

import React from "react";
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useTheme } from "next-themes";
import { useTranslations } from '@/lib/use-translations';
import MobileNav from "./mobile-nav";
import MainNav from "./main-nav";
import ReadySection from "./ready";

export default function SiteFooter() {
  const { resolvedTheme } = useTheme();
  const { isRTL } = useTranslations();
  const isCurrentlyDark = resolvedTheme === "dark";
  
  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col">
      <section className="px-4 md:px-20 pt-10 full-bleed-enhanced transition-colors flex-1 flex flex-col bg-[oklch(0.145_0_0)] text-[oklch(0.97_0_0)] border-[oklch(0.922_0_0)]">
        <div>
          <OptimizedImage 
            src="/marketing/site/logo.png" 
            alt="footer logo" 
            width={32} 
            height={32} 
            className="invert"
          />
        </div>

        {/* Mobile Navigation - Hidden on lg+ screens */}
        <MobileNav />

        <div className="py-10 flex flex-1">
          <MainNav />
          <ReadySection />
        </div>
      </section>
    </div>
  );
}
  