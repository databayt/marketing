"use client";

import React from "react";
import { footerData } from "./constant";
import { useTheme } from "next-themes";
import { useTranslations } from '@/lib/use-translations';

export default function MobileNav() {
  const { resolvedTheme } = useTheme();
  const { t } = useTranslations();
  const isCurrentlyDark = resolvedTheme === "dark";
  
  return (
    <div className="md:hidden mt-8">
      {/* Mobile: Product and Company in one row */}
      <div className="flex flex-row gap-8 w-full mb-8">
        <div className="w-1/2">
          <p className="mb-[12px] font-medium text-[oklch(1_0_0)]">{t.marketing.footer.product}</p>
          <div className="flex flex-col gap-3">
            {t.footer.data.product.map((item, index) => (
              <p key={index} className="hover:cursor-pointer transition-colors text-[oklch(1_0_0/0.8)] hover:text-[oklch(0.97_0_0)]">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="w-1/2">
          <p className="mb-[12px] font-medium text-[oklch(1_0_0)]">{t.marketing.footer.company}</p>
          <div className="flex flex-col gap-3">
            {t.footer.data.company.map((item, index) => (
              <p key={index} className="hover:cursor-pointer transition-colors text-[oklch(1_0_0/0.8)] hover:text-[oklch(0.97_0_0)]">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile: Services and Support in one row */}
      <div className="flex flex-row gap-8 w-full">
      <div className="w-1/2">
          <p className="mb-[12px] font-medium text-[oklch(1_0_0)]">{t.marketing.footer.support}</p>
          <div className="flex flex-col gap-3">
            {t.footer.data.support.map((item, index) => (
              <p key={index} className="hover:cursor-pointer transition-colors text-[oklch(1_0_0/0.8)] hover:text-[oklch(0.97_0_0)]">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="w-1/2">
          <p className="mb-[12px] font-medium text-[oklch(1_0_0)]">{t.marketing.footer.services}</p>
          <div className="flex flex-col gap-3">
            {t.footer.data.services.map((item, index) => (
              <p key={index} className="hover:cursor-pointer transition-colors text-[oklch(1_0_0/0.8)] hover:text-[oklch(0.97_0_0)]">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
