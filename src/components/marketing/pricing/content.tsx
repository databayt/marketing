import { currentUser } from "@/components/auth/auth";
import { getUserSubscriptionPlan } from "@/components/marketing/pricing/lib/subscription";
import { Callout } from "@/components/marketing/pricing/shared/callout";
import { cn, constructMetadata } from "@/components/marketing/pricing/lib/utils";
import { ComparePlans } from "@/components/marketing/pricing/compare-plans";
import { PricingCards } from "@/components/marketing/pricing/pricing-cards";
import { PricingFaq } from "@/components/marketing/pricing/pricing-faq";
import PricingHeader from "./pricing-header";
import PricingFAQs from "./pricing-faqs";
import EnterpriseSection from "./enterprise-section";
import SecurePayment from "./payment/secure-payment";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";



export default async function PricingContent() {
  const user = await currentUser();

  let subscriptionPlan;
  if (user && user.id) {
    subscriptionPlan = await getUserSubscriptionPlan(user.id);
  }

  return (
    <>
      <div className="flex w-full flex-col py-14 mt-18 items-center">
        <PricingHeader />
        <PricingCards userId={user?.id} subscriptionPlan={subscriptionPlan} userRole={user?.role} />
        <ComparePlans />
        <SecurePayment />
        {/* <PricingFaq /> */}
        <PricingFAQs />
      </div>
      <EnterpriseSection />
    </>
  );
}
