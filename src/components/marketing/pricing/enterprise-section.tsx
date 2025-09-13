"use client";

import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from '@/lib/use-translations';

export default function EnterpriseSection() {
  const { t } = useTranslations();
  
  return (
    <div className="bg-[#266DF0] full-bleed" data-section="enterprise">
      <div className="flex w-full max-w-3xl mx-auto flex-col gap-6 text-center py-16 px-4">
        <div className="flex justify-center">
          <Badge className="bg-white/20 text-white border-white/30">{t.marketing.pricing.enterprise.badge}</Badge>
        </div>
        <h3 className="font-heading text-white">
          {t.marketing.pricing.enterprise.title}
        </h3>
        <p className="leading-normal text-white/90 sm:leading-7">
          {t.marketing.pricing.enterprise.description}
        </p>
        <div className="flex justify-center">
          <Link href="/docs/community/support" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "bg-white text-[#266DF0] border-white hover:bg-white/90")}>
            {t.marketing.pricing.enterprise.talkToSales}
          </Link>
        </div>
      </div>
    </div>
  )
}