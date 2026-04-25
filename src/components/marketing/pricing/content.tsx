import { currentUser } from "@/components/auth/auth";
import { getUserSubscriptionPlan } from "@/components/marketing/pricing/lib/subscription";
import { PricingCards } from "@/components/marketing/pricing/pricing-cards";
import { ComparePlans } from "@/components/marketing/pricing/compare-plans";
import PricingHeader from "./pricing-header";
import PricingFAQs from "./pricing-faqs";
import EnterpriseSection from "./enterprise-section";
import PricingLoaderOverlay from "./loader-overlay";



export default async function PricingContent() {
  const user = await currentUser();

  let subscriptionPlan;
  if (user && user.id) {
    subscriptionPlan = await getUserSubscriptionPlan(user.id);
  }

  return (
    <>
      <div className="flex w-full flex-col py-14 mt-18 items-center">
        <PricingLoaderOverlay />
        <PricingHeader />
        <PricingCards userId={user?.id} subscriptionPlan={subscriptionPlan} userRole={user?.role} />
        <ComparePlans />
        {/* <PricingFaq /> */}
        <PricingFAQs />
      </div>
      <EnterpriseSection />
    </>
  );
}
