"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import MobileNav from "./mobile-nav";
import MainNav from "./main-nav";
import ReadySection from "./ready";

export default function SiteFooter() {
  const { resolvedTheme } = useTheme();
  const isCurrentlyDark = resolvedTheme === "dark";
  
  return (
    <section className={`px-4 md:px-20 pt-10 full-bleed border-t transition-colors ${
      isCurrentlyDark 
        ? "bg-card text-card-foreground border-border" 
        : "bg-foreground text-background border-border"
    }`}>
      <div>
        <Image 
          src="/site/logo.png" 
          alt="footer logo" 
          width={32} 
          height={32} 
          className={isCurrentlyDark ? "" : "invert"}
        />
      </div>

      {/* Mobile Navigation - Hidden on lg+ screens */}
      <MobileNav />

      <div className="mt-[32px] pb-[50px] flex justify-between w-full gap-8 flex-col md:flex-row flex-wrap">
        <MainNav />
        <ReadySection />
      </div>
    </section>
  );
}
  