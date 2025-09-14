"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useTranslations } from '@/lib/use-translations';
import { GiftModal } from '@/components/marketing/gift-modal';

export function Sales() {
  const { t, isRTL } = useTranslations();
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  
  return (
    <div className="bg-[#0080FF] full-bleed" data-section="sales">
      <div className="container-responsive">
        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-20 ${isRTL ? 'lg:flex-row-reverse font-heading' : ''}`}>
          {/* Content Section - Now on the left */}
          <div className={`flex-1 text-center lg:text-left ${isRTL ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
          <h2 className="text-4xl font-bold text-white mb-2 mt-8 md:mt-0">{t.marketing.services.sales.workTogether}</h2>
            <p className="text-lg mb-4 max-w-lg mx-auto lg:mx-0 text-white/90">
              {t.marketing.services.sales.readyToTakeNext}
            </p>
           
            <Button
              onClick={() => setGiftModalOpen(true)}
              className="bg-white hover:bg-white/90 text-[#0080FF] flex items-center gap-2 mx-auto lg:mx-0 cursor-pointer"
            >
              <OptimizedImage
                src="/marketing/site/b.jpg"
                alt="Gift box icon"
                width={20}
                height={20}
                className="rounded-sm"
              />
              {t.marketing.services.sales.collectGift}
            </Button>
          </div>
          
          {/* Image Section - Now on the right */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full lg:pl-24">
              <OptimizedImage
                src="/marketing/site/a.png"
                alt="Sales representative"
                width={200}
                height={200}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <GiftModal
        isOpen={giftModalOpen}
        onClose={() => setGiftModalOpen(false)}
      />
    </div>
  );
}
