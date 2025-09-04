import type { PlansRow, SubscriptionPlan } from "@/components/marketing/pricing/types";
import { env } from "@/env.mjs";

export const isProTitle = (title: string): boolean => title.toLowerCase() === "pro";

export const isStarterTitle = (title: string): boolean => title.toLowerCase() === "hobby";

export const getIncludesHeading = (title: string, t: any): string =>
  isStarterTitle(title)
    ? t.marketing.pricing.constants.includes
    : isProTitle(title)
    ? t.marketing.pricing.constants.everythingInHobby
    : t.marketing.pricing.constants.everythingInPro;

export const getCtaLabel = (title: string, t: any): string =>
  isStarterTitle(title) ? t.marketing.pricing.constants.startTrial : isProTitle(title) ? t.marketing.pricing.constants.getPro : t.marketing.pricing.constants.getUltra;

export const getPriceDisplay = (offer: SubscriptionPlan, isYearly: boolean, t: any): string => {
  if (offer.prices.monthly === 0) return t.marketing.pricing.constants.free;
  if (isYearly) {
    const discountedPerMonth = offer.prices.monthly * 0.8;
    return `$${discountedPerMonth}`;
  }
  return `$${offer.prices.monthly}`;
};

export const getYearlyTotal = (offer: SubscriptionPlan): number => {
  if (offer.prices.monthly === 0) return 0;
  return offer.prices.monthly * 12 * 0.8;
};

// Pricing data moved here from subscriptions.ts
export const getPricingData = (t: any): SubscriptionPlan[] => [
  {
    title: "Hobby",
    description: t.marketing.pricing.plans.hobby.description,
    benefits: t.marketing.pricing.plans.hobby.benefits,
    limitations: [],
    prices: {
      monthly: 0,
      yearly: 0,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  {
    title: "Pro", 
    description: t.marketing.pricing.plans.pro.description,
    benefits: t.marketing.pricing.plans.pro.benefits,
    limitations: [],
    prices: {
      monthly: 20,
      yearly: 192,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID ?? null,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID ?? null,
    },
  },
  {
    title: "Ultra",
    description: t.marketing.pricing.plans.ultra.description,
    benefits: t.marketing.pricing.plans.ultra.benefits,
    limitations: [],
    prices: {
      monthly: 200,
      yearly: 1920,
    },
    stripeIds: {
      monthly:
        env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID ?? env.NEXT_PUBLIC_STRIPE_ULTRA_MONTHLY_PLAN_ID ?? null,
      yearly:
        env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID ?? env.NEXT_PUBLIC_STRIPE_ULTRA_YEARLY_PLAN_ID ?? null,
    },
  },
];

// Keep original for backward compatibility
export const pricingData: SubscriptionPlan[] = [
  {
    title: "Hobby",
    description: "Get started for free",
    benefits: [
      "Up to 5 pages website",
      "Basic responsive design", 
      "Contact form integration",
    ],
    limitations: [],
    prices: {
      monthly: 0,
      yearly: 0,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  {
    title: "Pro",
    description: "For growing businesses",
    benefits: [
      "Up to 15 pages website",
      "Advanced animations",
      "SEO optimization",
      "Custom branding",
    ],
    limitations: [],
    prices: {
      monthly: 20,
      yearly: 192,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID ?? null,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID ?? null,
    },
  },
  {
    title: "Ultra",
    description: "For large organizations",
    benefits: [
      "Unlimited pages and features",
      "Custom integrations",
    ],
    limitations: [],
    prices: {
      monthly: 200,
      yearly: 1920,
    },
    stripeIds: {
      monthly:
        env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID ?? env.NEXT_PUBLIC_STRIPE_ULTRA_MONTHLY_PLAN_ID ?? null,
      yearly:
        env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID ?? env.NEXT_PUBLIC_STRIPE_ULTRA_YEARLY_PLAN_ID ?? null,
    },
  },
];

export const plansColumns = ["hobby", "pro", "ultra", "enterprise"] as const;

export const comparePlans: PlansRow[] = [
  {
    feature: "Website pages",
    hobby: "Up to 5",
    pro: "Up to 15",
    ultra: "Unlimited",
    enterprise: "Unlimited",
    tooltip: "Number of website pages included in your plan.",
  },
  {
    feature: "Responsive design",
    hobby: "Basic",
    pro: "Advanced",
    ultra: "Premium",
    enterprise: "Custom",
    tooltip: "Mobile-friendly design optimization level.",
  },
  {
    feature: "Custom branding",
    hobby: null,
    pro: true,
    ultra: true,
    enterprise: "Unlimited",
    tooltip: "Brand colors and logo available from Pro.",
  },
  {
    feature: "SEO optimization",
    hobby: "Basic",
    pro: "Advanced",
    ultra: "Premium",
    enterprise: "Custom",
    tooltip: "Search engine optimization and meta tag setup.",
  },
  {
    feature: "Contact forms",
    hobby: "Basic",
    pro: "Advanced",
    ultra: "Custom",
    enterprise: "Custom",
    tooltip: "Contact form functionality and integration options.",
  },
  {
    feature: "Animations & effects",
    hobby: "Basic",
    pro: "Advanced",
    ultra: "Premium",
    enterprise: "Custom",
    tooltip: "Interactive animations and visual effects.",
  },
  {
    feature: "Content management",
    hobby: "Static",
    pro: "Basic CMS",
    ultra: "Advanced CMS",
    enterprise: "Custom CMS",
    tooltip: "Content management system capabilities.",
  },
  {
    feature: "Performance optimization",
    hobby: "Basic",
    pro: "Advanced",
    ultra: "Premium",
    enterprise: "Custom",
    tooltip: "Website speed and performance optimization.",
  },
  {
    feature: "Security features",
    hobby: "Basic SSL",
    pro: "Advanced SSL",
    ultra: "Premium SSL",
    enterprise: "Custom Security",
    tooltip: "Security certificates and protection features.",
  },
  {
    feature: "Analytics & reporting",
    hobby: "Basic",
    pro: "Advanced",
    ultra: "Premium",
    enterprise: "Custom",
    tooltip: "Website analytics and performance reporting.",
  },
  {
    feature: "Support",
    hobby: "Email",
    pro: "Priority",
    ultra: "24/7",
    enterprise: "24/7 + Manager",
    tooltip: "Customer support level and response time.",
  },
  {
    feature: "Revisions",
    hobby: "1 round",
    pro: "3 rounds",
    ultra: "Unlimited",
    enterprise: "Unlimited",
    tooltip: "Number of design revisions included.",
  },
  {
    feature: "Hosting",
    hobby: "Shared",
    pro: "VPS",
    ultra: "Dedicated",
    enterprise: "Custom",
    tooltip: "Website hosting infrastructure type.",
  },
  {
    feature: "Backup & maintenance",
    hobby: "Monthly",
    pro: "Weekly",
    ultra: "Daily",
    enterprise: "Real-time",
    tooltip: "Backup frequency and maintenance schedule.",
  },
  {
    feature: "Custom integrations",
    hobby: false,
    pro: "Basic",
    ultra: "Advanced",
    enterprise: "Custom",
    tooltip: "Third-party service integrations and APIs.",
  },
  {
    feature: "Training & documentation",
    hobby: false,
    pro: "Basic guides",
    ultra: "Video tutorials",
    enterprise: "Custom training",
    tooltip: "User training and documentation provided.",
  },
  {
    feature: "Launch assistance",
    hobby: "Self-service",
    pro: "Guided",
    ultra: "Full service",
    enterprise: "White-glove",
    tooltip: "Website launch and deployment assistance.",
  },
  {
    feature: "Performance monitoring",
    hobby: false,
    pro: "Basic",
    ultra: "Advanced",
    enterprise: "Custom",
    tooltip: "Ongoing website performance monitoring.",
  },
];


