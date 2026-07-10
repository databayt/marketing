
"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Button } from "@/components/ui/button";
import { useTranslations } from '@/lib/use-translations';

function ReadyToBuildSection() {
  const { t, isRTL } = useTranslations();
  return (
    <section className="flex flex-col md:flex-row justify-between gap-2 items-center !bg-[#266DF0] py-8 md:p-12 full-bleed" data-section="ready-to-build">
      <div className="container-responsive">


        <blockquote className={`text-[#A0BFF8] text-lg leading-relaxed max-w-xl mb-6 ${isRTL ? 'pl-4 md:pl-0' : 'pr-4 md:pr-0'}`}>
          &ldquo;{t.marketing.readyToBuild.quote}&rdquo;
        </blockquote>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">AE</span>
          </div>
          <div>
            <p className="text-white font-semibold">{t.marketing.readyToBuild.author}</p>
            <p className="text-[#A0BFF8] text-sm">{t.marketing.readyToBuild.position}</p>
          </div>
        </div>
        
    
      </div>
      <div>
        <OptimizedImage src="/marketing/site/build.png" alt="security" width={500} height={500} className="pr-5" />
      </div>
    </section>
  );
}

export default ReadyToBuildSection;