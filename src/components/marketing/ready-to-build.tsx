
import { cn } from "@/lib/utils";
import React from "react";
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Button } from "@/components/ui/button";

function ReadyToBuildSection() {
  return (
    <section className="flex flex-col md:flex-row justify-between gap-2 items-center !bg-[#266DF0] p-12 full-bleed">
      <div className="container-responsive">
       
        
        <blockquote className="text-[#A0BFF8] text-lg leading-relaxed max-w-xl mb-6">
          &ldquo;This platform transformed how we manage client relationships. The intuitive design and powerful features helped us scale from a small agency to serving Fortune 500 companies.&rdquo;
        </blockquote>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">AE</span>
          </div>
          <div>
            <p className="text-white font-semibold">Ahmed Elardi</p>
            <p className="text-[#A0BFF8] text-sm">CEO, Pixel Studios</p>
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