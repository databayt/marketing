import React from "react";
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useTranslations } from '@/lib/use-translations';

export default function Branding() {
  const { t, isRTL } = useTranslations();
  
  return (
    <div className={`py-8 ${isRTL ? 'font-heading' : ''}`}>
      {/* Heading with Icon */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <OptimizedImage
          src="/marketing/site/branding.png"
          alt="Branding Icon"
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <h2 className="text-3xl font-bold text-foreground">{t.marketing.services.branding.title}</h2>
      </div>

      {/* Description */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t.marketing.services.branding.description}
        </p>
      
      </div>

      {/* Four Images Grid */}
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden w-full">
          
          <div className="aspect-square overflow-hidden rounded-lg animation-box">
            <div>
              <OptimizedImage
                src="/marketing/site/2.jpg"
                alt="Branding Example 2"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="aspect-square overflow-hidden rounded-lg animation-box">
            <div>
              <OptimizedImage
                src="/marketing/site/1.jpg"
                alt="Branding Example 1"
                width={600}
                height={600}
                className="w-full h-full object-cover"    
              />
            </div>
          </div>
          <div className="aspect-square overflow-hidden rounded-lg animation-box">
            <div>
              <OptimizedImage
                src="/marketing/site/3.jpg"
                alt="Branding Example 3"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="aspect-square overflow-hidden rounded-lg animation-box">
            <div>
              <OptimizedImage
                src="/marketing/site/4.jpg"
                alt="Branding Example 4"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
