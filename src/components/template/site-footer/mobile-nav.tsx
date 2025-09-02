"use client";

import React from "react";
import { footerData } from "./constant";
import { useTheme } from "next-themes";

export default function MobileNav() {
  const { resolvedTheme } = useTheme();
  const isCurrentlyDark = resolvedTheme === "dark";
  
  return (
    <div className="md:hidden mt-8">
      {/* Mobile: Product and Company in one row */}
      <div className="flex flex-row gap-8 w-full mb-8">
        <div className="w-1/2">
          <p className={`mb-[12px] font-medium ${
            isCurrentlyDark ? "text-muted-foreground" : "text-muted"
          }`}>Product</p>
          <div className="flex flex-col gap-3">
            {footerData.product.map((item, index) => (
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
        <div className="w-1/2">
          <p className={`mb-[12px] font-medium ${
            isCurrentlyDark ? "text-muted-foreground" : "text-muted"
          }`}>Company</p>
          <div className="flex flex-col gap-3">
            {footerData.company.map((item, index) => (
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
      
      {/* Mobile: Services and Support in one row */}
      <div className="flex flex-row gap-8 w-full">
      <div className="w-1/2">
          <p className={`mb-[12px] font-medium ${
            isCurrentlyDark ? "text-muted-foreground" : "text-muted"
          }`}>Support</p>
          <div className="flex flex-col gap-3">
            {footerData.support.map((item, index) => (
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
        <div className="w-1/2">
          <p className={`mb-[12px] font-medium ${
            isCurrentlyDark ? "text-muted-foreground" : "text-muted"
          }`}>Services</p>
          <div className="flex flex-col gap-3">
            {footerData.attioFor.map((item, index) => (
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
    </div>
  );
}
