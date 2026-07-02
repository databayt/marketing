"use client";

import React from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useTranslations } from "@/lib/use-translations";

function ReadyToBuildSection() {
  const { t, isRTL } = useTranslations();
  return (
    <section
      data-section="ready-to-build"
      className="w-full !bg-[#266DF0] py-8 md:py-12"
    >
      {/* Content column aligned to the Stack section above (max-w 64rem, centered) */}
      <div className="container-content flex flex-col md:flex-row items-center justify-between gap-2">
        <div>
          <blockquote
            className={`text-[#A0BFF8] text-lg leading-relaxed max-w-xl mb-6 ${isRTL ? "pl-4 md:pl-0" : "pr-4 md:pr-0"}`}
          >
            &ldquo;{t.marketing.readyToBuild.quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">AE</span>
            </div>
            <div>
              <p className="text-white font-semibold">
                {t.marketing.readyToBuild.author}
              </p>
              <p className="text-[#A0BFF8] text-sm">
                {t.marketing.readyToBuild.position}
              </p>
            </div>
          </div>
        </div>
        <div>
          <OptimizedImage
            src="/marketing/site/build.png"
            alt="security"
            width={500}
            height={500}
            className="pe-5"
          />
        </div>
      </div>
    </section>
  );
}

export default ReadyToBuildSection;
