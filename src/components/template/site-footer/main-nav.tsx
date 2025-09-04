"use client";

import React from "react";
import { footerData } from "./constant";
import { useTheme } from "next-themes";
import { useTranslations } from '@/lib/use-translations';

export default function MainNav() {
  const { resolvedTheme } = useTheme();
  const { t } = useTranslations();
  const isCurrentlyDark = resolvedTheme === "dark";
  
  return (
    <div className="hidden md:flex w-4/6">
      <div className="w-1/4">
        <p className={`mb-[12px] font-medium ${
          isCurrentlyDark ? "text-muted-foreground" : "text-muted"
        }`}>{t.marketing.footer.product}</p>
        <div className="flex flex-col gap-3">
          {t.footer.data.product.map((item, index) => (
            <p key={index} className={`hover:cursor-pointer transition-colors ${
              isCurrentlyDark 
                ? "text-muted-foreground hover:text-foreground" 
                : "text-muted/80 hover:text-background"
            }`}>
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="w-1/4">
        <p className={`mb-[12px] font-medium ${
          isCurrentlyDark ? "text-muted-foreground" : "text-muted"
        }`}>{t.marketing.footer.company}</p>
        <div className="flex flex-col gap-3">
          {t.footer.data.company.map((item, index) => (
            <p key={index} className={`hover:cursor-pointer transition-colors ${
              isCurrentlyDark 
                ? "text-muted-foreground hover:text-foreground" 
                : "text-muted/80 hover:text-background"
            }`}>
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="w-1/4">
        <p className={`mb-[12px] font-medium ${
          isCurrentlyDark ? "text-muted-foreground" : "text-muted"
        }`}>{t.marketing.footer.services}</p>
        <div className="flex flex-col gap-3">
          {t.footer.data.services.map((item, index) => (
            <p key={index} className={`hover:cursor-pointer transition-colors ${
              isCurrentlyDark 
                ? "text-muted-foreground hover:text-foreground" 
                : "text-muted/80 hover:text-background"
            }`}>
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="w-1/4" >
        <p className={`mb-[12px] font-medium ${
          isCurrentlyDark ? "text-muted-foreground" : "text-muted"
        }`}>{t.marketing.footer.support}</p>
        <div className="flex flex-col gap-3">
          {t.footer.data.support.map((item, index) => (
            <p key={index} className={`hover:cursor-pointer transition-colors ${
              isCurrentlyDark 
                ? "text-muted-foreground hover:text-foreground" 
                : "text-muted/80 hover:text-background"
            }`}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
