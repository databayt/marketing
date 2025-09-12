"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { SubscriptionPlan, UserSubscriptionPlan } from "@/components/marketing/pricing/types";
import { BillingFormButton } from "@/components/marketing/pricing/forms/billing-form-button";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getCtaLabel, getIncludesHeading, getPriceDisplay, getYearlyTotal, isStarterTitle, isProTitle } from "./constants";
import { useTranslations } from '@/lib/use-translations';
import { Separator } from "@/components/ui/separator";

interface PricingCardProps {
  offer: SubscriptionPlan;
  isYearly: boolean;
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
  userRole?: string;
}

export function PricingCard({ offer, isYearly, userId, subscriptionPlan, userRole }: PricingCardProps) {
  const { t, locale, isRTL } = useTranslations();
  const isPro = isProTitle(offer.title);
  const isStarter = isStarterTitle(offer.title);
  const priceDisplay = getPriceDisplay(offer, isYearly, t);
  
  const getTranslatedPlanName = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle === 'hobby') return t.marketing.pricing.planNames.hobby;
    if (lowerTitle === 'pro') return t.marketing.pricing.planNames.pro;
    if (lowerTitle === 'ultra') return t.marketing.pricing.planNames.ultra;
    return title;
  };

  const ctaArea = (
    <>
      {userId && subscriptionPlan ? (
        isStarter ? (
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "default" }),
              
            )}
          >
{getCtaLabel(offer.title, t)}
          </Link>
        ) : (
          <BillingFormButton
            year={isYearly}
            offer={offer}
            subscriptionPlan={subscriptionPlan}
            userRole={userRole as any}
          />
        )
      ) : (
        <Link
          href={(() => {
            const monthly = offer.stripeIds.monthly;
            const yearly = offer.stripeIds.yearly;
            const priceId = (isYearly ? yearly : monthly) || monthly;
            return priceId
              ? `/starter/dashboard/billing/checkout?price=${encodeURIComponent(priceId)}`
              : `/starter/dashboard/billing`;
          })()}
          className={cn(
            buttonVariants({
              variant: "default",
              size: "sm",
            }),
            "hover:scale-[1.01] transition-transform rounded-md",
          )}
        >
{getCtaLabel(offer.title, t)}
        </Link>
      )}
      {(!userId || !subscriptionPlan) && isPro && (
        <a href="#more-info" className={`${isRTL ? 'mr-3' : 'ml-3'} text-sm text-muted-foreground`}>
          {t.marketing.pricing.constants.moreInfo} {isRTL ? '↖' : '↗'}
        </a>
      )}
    </>
  );

  const includesHeading = getIncludesHeading(offer.title, t);

  return (
    <Card
      key={offer.title}
      className={cn(
        "relative overflow-hidden rounded-2xl border-none shadow-none flex flex-col h-full w-full",
        // Mobile: same bg-muted style as desktop
        "bg-muted text-card-foreground",
        isRTL ? "items-end text-right" : "items-start text-left"
      )}
    >
      <CardHeader className={`w-full ${isRTL ? "text-right" : "text-left"} pb-2 md:pb-3`}>
        {/* Mobile: use same desktop layout */}
        <div>
          <p className="lead text-foreground">{getTranslatedPlanName(offer.title)}</p>
          <CardTitle className="tracking-tight whitespace-nowrap">
            {priceDisplay}{offer.prices.monthly > 0 ? t.marketing.pricing.constants.perMonth : ""}
          </CardTitle>
        </div>
      </CardHeader>
      
      <div className="w-full px-6">
        <Separator />
      </div>

      <CardContent className={`flex-1 w-full ${isRTL ? "text-right" : "text-left"} pt-2 md:pt-3`}>
        <p className="muted mb-2">{includesHeading}</p>
        <ul className="space-y-1 md:space-y-1">
          {offer.benefits.map((feature) => (
            <li key={feature} className="flex items-start gap-2 md:gap-3">
              <Check className="mt-0.5 md:mt-1 text-primary size-2 md:size-3" />
              <span className="muted leading-5 md:leading-6 text-xs md:text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className={`${isRTL ? 'text-right justify-start items-start' : ''} w-full pt-2 md:pt-3`}>
        <div className={`${isRTL ? 'text-right w-full' : ''}`}>{ctaArea}</div>
      </CardFooter>
    </Card>
  );
}

