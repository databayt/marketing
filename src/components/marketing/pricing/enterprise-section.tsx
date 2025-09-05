"use client";

import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from '@/lib/use-translations';

export default function EnterpriseSection() {
  const { t } = useTranslations();
  
  return (
    <div className="flex w-full max-w-3xl flex-col gap-6 text-center pt-16">
      <div className="flex justify-center">
        <Badge className="bg-muted text-foreground">{t.marketing.pricing.enterprise.badge}</Badge>
      </div>
      <h3 className="font-heading">
        {t.marketing.pricing.enterprise.title}
      </h3>
      <p className="leading-normal text-muted-foreground sm:leading-7">
        {t.marketing.pricing.enterprise.description}
      </p>
      <div className="flex justify-center">
        <Link href="/docs/community/support" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
          {t.marketing.pricing.enterprise.talkToSales}
        </Link>
      </div>
    </div>
  )
}