"use client";

import React from "react";
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useTheme } from "next-themes";
import MobileNav from "./mobile-nav";
import MainNav from "./main-nav";
import ReadySection from "./ready";

export default function SiteFooter() {
  const { resolvedTheme } = useTheme();
  const isCurrentlyDark = resolvedTheme === "dark";
  
  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col">
      <section className={`px-4 md:px-20 pt-10 full-bleed border-t transition-colors flex-1 flex flex-col ${
        isCurrentlyDark 
          ? "bg-card text-card-foreground border-border" 
          : "bg-foreground text-background border-border"
      }`}>
        <div>
          <OptimizedImage 
            src="/marketing/site/logo.png" 
            alt="footer logo" 
            width={32} 
            height={32} 
            className={isCurrentlyDark ? "" : "invert"}
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
  