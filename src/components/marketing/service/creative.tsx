"use client";

import React from "react";
import { OptimizedImage } from '@/components/ui/optimized-image';
import { OptimizedVideo } from '@/components/ui/optimized-video';
import { useTranslations } from '@/lib/use-translations';

export default function Creative() {
  const { t, isRTL } = useTranslations();
  
  return (
    <div className={`py-8 ${isRTL ? 'font-heading' : ''}`}>
      {/* Heading with Icon */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <OptimizedImage
          src="/marketing/site/creative.png"
          alt="Creative Icon"
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <h2 className="text-3xl font-bold text-foreground">{t.marketing.services.creative.title}</h2>
      </div>

      {/* Service Description */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t.marketing.services.creative.description}
        </p>
      </div>

      {/* Video and Wallet */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-8">
        <OptimizedVideo
          src="/marketing/site/order.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="rounded-lg w-full md:w-[500px] h-[300px] md:h-[350px] object-cover"
          width={500}
          height={350}
        />
        
        <OptimizedImage
          src="/marketing/site/wallet.gif"
          alt="Wallet Animation"
          width={500}
          height={350}
          className="rounded-lg w-full md:w-[500px] h-[300px] md:h-[350px] object-cover"
        />
      </div>

      {/* Images Row */}
      <div className="flex gap-0 justify-center items-center w-full">
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/4 h-[400px] md:h-[300px] overflow-hidden animation-box">
            <div>
              <OptimizedImage
                src="/marketing/site/5.jpg"
                alt="Creative Work 1"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
          <div className="w-full md:w-1/4 h-[400px] md:h-[300px] overflow-hidden animation-box">
            <div>
              <OptimizedImage
                src="/marketing/site/6.jpg"
                alt="Creative Work 2"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
          <div className="w-full md:w-1/4 h-[400px] md:h-[300px] overflow-hidden animation-box">
            <div>
              <OptimizedImage
                src="/marketing/site/9.jpg"
                alt="Creative Work 3"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
          <div className="w-full md:w-1/4 h-[400px] md:h-[300px] overflow-hidden animation-box">
            <div>
              <OptimizedImage
                src="/marketing/site/8.jpg"
                alt="Creative Work 4"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
