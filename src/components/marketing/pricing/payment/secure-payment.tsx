"use client";

// Secure Payment section ported from hogwarts
// (src/components/saas-marketing/pricing/secure-payment.tsx).
import Image from "next/image";

import { useTranslations } from "@/lib/use-translations";

import {
  AmericanExpressIcon,
  ApplePayIcon,
  BankakIcon,
  BitcoinIcon,
  FawryIcon,
  GooglePayIcon,
  MadaIcon,
  MastercardIcon,
  PaypalIcon,
  StcpayIcon,
  TabbyIcon,
  TamaraIcon,
  VisaIcon,
} from "./brand-icons";

const paymentMethods = [
  { name: "Visa", Icon: VisaIcon },
  { name: "Mastercard", Icon: MastercardIcon },
  { name: "Amex", Icon: AmericanExpressIcon },
  { name: "Apple Pay", Icon: ApplePayIcon },
  { name: "Google Pay", Icon: GooglePayIcon },
  { name: "PayPal", Icon: PaypalIcon },
  { name: "Bitcoin", Icon: BitcoinIcon },
  { name: "STCPay", Icon: StcpayIcon },
  { name: "Fawry", Icon: FawryIcon },
  { name: "Bankak", Icon: BankakIcon },
  { name: "Mada", Icon: MadaIcon },
  { name: "Tabby", Icon: TabbyIcon },
  { name: "Tamara", Icon: TamaraIcon },
];

export default function SecurePayment() {
  const { t } = useTranslations();
  const securePayment = t.marketing.pricing.securePayment;

  return (
    <section className="bg-muted my-8 w-[90%] max-w-5xl rounded-3xl p-8 md:p-12">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        {/* Left side - Icon with blue bg */}
        <div className="flex w-full justify-center md:w-[30%]">
          <div className="flex h-52 w-52 items-center justify-center rounded-3xl bg-[#6A9BCC]">
            <Image
              src="/site/secure-payment.svg"
              alt={securePayment?.title || "Secure Payment"}
              width={168}
              height={168}
              className="object-contain"
            />
          </div>
        </div>

        {/* Right side - Content without bg */}
        <div className="flex w-full flex-col gap-4 md:w-[70%]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {securePayment?.title || "Secure Payment"}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              {securePayment?.description ||
                "Your security is our priority. We use industry-leading encryption and security protocols to ensure your payment information is always protected."}
            </p>
          </div>

          {/* Payment Icons Row */}
          <div className="mt-1 -mb-[12px] -ms-[13px] flex flex-wrap items-center">
            {paymentMethods.map(({ name, Icon }) => (
              <div
                key={name}
                className="-me-[16px] -mb-[4px] flex h-14 w-20 items-center justify-center overflow-visible"
              >
                <Icon className="h-full w-full" />
              </div>
            ))}
          </div>

          {/* Powered by Stripe */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-muted-foreground text-sm">
              {securePayment?.poweredBy || "Powered by"}
            </span>
            <span className="font-semibold">Stripe</span>
          </div>
        </div>
      </div>
    </section>
  );
}
