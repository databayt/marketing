'use client';

import React from 'react';
import ExpandButton from '@/components/atom/expand-button';
import { useTranslations } from '@/lib/use-translations';

export function Hero() {
    const { t, isRTL, locale } = useTranslations();

    return (
        <section className="tt-hero h-screen mt-10 relative flex items-center justify-center">
            {/* Hero Content */}
            <div className="relative z-10">
                <div className="text-center">
                    <div className={`flex flex-col items-center gap-4 text-center ${isRTL ? 'rtl' : ''}`}>
                        <h1 className={`hidden md:block font-heading font-black text-3xl sm:text-5xl ${locale === 'ar' ? 'md:text-6xl lg:text-8xl' : 'md:text-5xl lg:text-8xl'}`}>
                            {t.marketing.hero.title.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    {index < t.marketing.hero.title.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </h1>
                        <h1 className="block md:hidden font-heading font-black text-5xl sm:text-7xl md:text-6xl lg:text-[80px]">
                            {t.marketing.hero.titleMobile.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    {index < t.marketing.hero.titleMobile.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </h1>
                        <p className="max-w-xs md:max-w-3xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                            {t.marketing.hero.subtitle}
                        </p>
                        <div className={`flex flex-col sm:flex-row gap-4 items-center mt-2 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                            {locale === 'ar' ? (
                                <>
                                    <ExpandButton variant="outline" href="/service" className="hover:shadow-[4px_4px_0px_black]">
                                        {t.marketing.hero.services}
                                    </ExpandButton>
                                    <ExpandButton variant="default" href="/#" className="hover:shadow-[4px_4px_0px_black]">
                                        {t.marketing.hero.appointment}
                                    </ExpandButton>
                                </>
                            ) : (
                                <>
                                    <ExpandButton variant="default" href="/#" className="hover:shadow-[4px_4px_0px_black]">
                                        {t.marketing.hero.appointment}
                                    </ExpandButton>
                                    <ExpandButton variant="outline" href="/service" className="hover:shadow-[4px_4px_0px_black]">
                                        {t.marketing.hero.services}
                                    </ExpandButton>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
