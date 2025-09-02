"use client";

import React from "react";
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
import { useTheme } from "next-themes";

export default function ReadySection() {
  const { resolvedTheme } = useTheme();
  const isCurrentlyDark = resolvedTheme === "dark";
  
  return (
    <div className="min-w-[300px] w-2/6">
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
  );
}
