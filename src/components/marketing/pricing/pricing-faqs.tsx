"use client";

import { useTranslations } from '@/lib/use-translations';

export default function PricingFAQs() {
  const { t } = useTranslations();
  const faqs = t.marketing.pricing.faqs.questions;
  
  return (
    <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
      <div className="flex w-full max-w-6xl">
        <div className="grid gap-y-12 gap-x-32 px-2 lg:[grid-template-columns:1fr_auto]">
          <div className="text-center lg:text-left">
            <h2 className="mb-4">
              {t.marketing.pricing.faqs.title.split(' ').map((word, index) => (
                <span key={index}>
                  {word}{index < 2 && <><br className="hidden lg:block" /> </>}
                </span>
              ))}
            </h2>
            <p>{t.marketing.pricing.faqs.subtitle}</p>
          </div>

          <div className="divide-y divide-dashed sm:mx-auto sm:max-w-2xl lg:mx-0">
            {faqs.map((faq: any, index: number) => (
              <div key={index} className={index === 0 ? "pb-6" : "py-6"}>
                <h3>{faq.question}</h3>
                <p className="text-muted-foreground mt-4">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}