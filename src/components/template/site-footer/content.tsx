"use client";

import React from "react";
import { footerData } from "./constant";
import ExpandButton from "@/components/atom/expand-button";
import { ArrowRight } from "lucide-react";
import { 
  GitHubNewIcon, 
  TwitterIcon, 
  LinkedInNewIcon, 
  InstagramIcon, 
  FacebookIcon,
  WhatsAppIcon
} from "@/components/atom/icons";
import Image from "next/image";
import { useTheme } from "next-themes";

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

      <div className="mt-[32px] pb-[50px] flex justify-between w-full gap-8 flex-col md:flex-row flex-wrap">
        {/* Mobile: Product and Company in one row */}
        <div className="flex flex-row md:flex-col gap-8 md:gap-0 w-full md:w-auto">
          <div>
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
          <div>
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
        <div className="flex flex-row md:flex-col gap-8 md:gap-0 w-full md:w-auto">
          <div>
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
          <div>
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
        </div>
        <div className="min-w-[300px]">
          <p className={`font-medium mb-4 ${
            isCurrentlyDark ? "text-muted-foreground" : "text-muted"
          }`}>Ready to build?</p>
          <ExpandButton variant="white" className="group flex items-center mb-6">
                <span className="order-1 transition-all duration-300 group-hover:order-2">
                  Get started
                </span>
                <ArrowRight className="order-2 ml-2 group-hover:ml-0 group-hover:mr-2 h-4 w-4 transition-all duration-300 group-hover:order-1 group-hover:translate-x-1" />
              </ExpandButton>
          <div className="flex items-center gap-4">
            <GitHubNewIcon className={`h-8 w-8 cursor-pointer transition-colors ${
              isCurrentlyDark 
                ? "text-muted-foreground hover:text-foreground" 
                : "text-muted hover:text-background"
            }`} />
            <TwitterIcon className={`h-8 w-8 cursor-pointer transition-colors ${
              isCurrentlyDark 
                ? "text-muted-foreground hover:text-foreground" 
                : "text-muted hover:text-background"
            }`} />
            <LinkedInNewIcon className={`h-8 w-8 cursor-pointer transition-colors ${
              isCurrentlyDark 
                ? "text-muted-foreground hover:text-foreground" 
                : "text-muted hover:text-background"
            }`} />
            <InstagramIcon className={`h-8 w-8 cursor-pointer transition-colors ${
              isCurrentlyDark 
                ? "text-muted-foreground hover:text-foreground" 
                : "text-muted hover:text-background"
            }`} />
            <FacebookIcon className={`h-8 w-8 cursor-pointer transition-colors ${
              isCurrentlyDark 
                ? "text-muted-foreground hover:text-foreground" 
                : "text-muted hover:text-background"
            }`} />
            <WhatsAppIcon className={`h-8 w-8 cursor-pointer transition-colors ${
              isCurrentlyDark 
                ? "text-muted-foreground hover:text-foreground" 
                : "text-muted hover:text-background"
            }`} />
          </div>
        </div>
      </div>
    </section>
  );
}
  