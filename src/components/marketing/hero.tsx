'use client';

import React from 'react';
import ExpandButton from '@/components/atom/expand-button';
import type { getDictionary } from '@/components/internationalization/dictionaries';
import type { Locale } from '@/components/internationalization/config';
import { localeConfig } from '@/components/internationalization/config';

interface HeroProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['marketing']['hero'];
  params: { lang: Locale };
}

export function Hero({ dictionary, params }: HeroProps) {
    const t = dictionary;
    const locale = params.lang;
    const isRTL = localeConfig[locale]?.dir === 'rtl';

    return (
        <section className={`tt-hero h-screen relative flex items-center justify-center ${locale === 'ar' ? 'mt-10' : 'mt-6 md:mt-10'}`}>
            {/* Hero Content */}
            <div className="relative z-10">
                <div className="text-center">
                    <div className={`flex flex-col items-center gap-4 text-center ${isRTL ? 'rtl' : ''}`}>
                        <h1 className={`hidden md:block font-heading font-black text-3xl sm:text-5xl md:text-6xl ${locale === 'ar' ? 'lg:text-8xl' : 'lg:text-[90px] '}`}>
                            {t.title.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    {index < t.title.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </h1>
                        <h1 className={`block md:hidden font-heading font-black ${locale === 'ar' ? 'text-5xl sm:text-7xl' : 'text-6xl sm:text-8xl'} md:text-6xl lg:text-[80px]`}>
                            {t.titleMobile.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    {index < t.titleMobile.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </h1>
                        <p className="max-w-xs md:max-w-3xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                            {t.subtitle}
                        </p>
                        <div className={`flex flex-col sm:flex-row gap-4 items-center mt-2 max-w-xs sm:max-w-none mx-auto ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                            {locale === 'ar' ? (
                                <>
                                    <ExpandButton variant="outline" href="/service" className="hover:shadow-[4px_4px_0px_black]">
                                        {t.services}
                                    </ExpandButton>
                                    <ExpandButton variant="default" href="/#" className="hover:shadow-[4px_4px_0px_black]">
                                        {t.appointment}
                                    </ExpandButton>
                                </>
                            ) : (
                                <>
                                    <ExpandButton variant="default" href="/#" className="hover:shadow-[4px_4px_0px_black]">
                                        {t.appointment}
                                    </ExpandButton>
                                    <ExpandButton variant="outline" href="/service" className="hover:shadow-[4px_4px_0px_black]">
                                        {t.services}
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
