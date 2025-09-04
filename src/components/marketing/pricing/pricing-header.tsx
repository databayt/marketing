"use client";

import { Badge } from "@/components/ui/badge"
import { useTranslations } from '@/lib/use-translations'

export default function PricingHeader() {
  const { t, isRTL } = useTranslations();
  
  return (
    <div className={`flex w-full max-w-4xl flex-col gap-4 text-center ${isRTL ? 'font-heading' : ''}`}>
      <div className="flex justify-center">
        <Badge className="bg-muted text-foreground">{t.marketing.pricing.badge}</Badge>
      </div>
      <h1 className="font-heading hidden md:block">
        {t.marketing.pricing.title}
      </h1>
      <h1 className="font-heading block md:hidden">
        {t.marketing.pricing.title.replace('. ', '.\n')}
      </h1>
      <p className="max-w-[85%] mx-auto leading-normal text-muted-foreground">
        {t.marketing.pricing.subtitle}
      </p>
    </div>
  )
} 