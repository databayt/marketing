'use client';

import React, { useState } from 'react';
import ExpandButton from '@/components/atom/expand-button';
import type { getDictionary } from '@/components/internationalization/dictionaries';
import type { Locale } from '@/components/internationalization/config';
import { localeConfig } from '@/components/internationalization/config';
import { AppointmentModal } from './appointment-modal';
import { RiveBackground } from './rive-background';

interface HeroProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['marketing']['hero'];
  params: { lang: Locale };
}

export function Hero({ dictionary, params }: HeroProps) {
    const t = dictionary;
    const locale = params.lang;
    const isRTL = localeConfig[locale]?.dir === 'rtl';
    const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

    return (
        <section className={`tt-hero h-screen relative flex items-center justify-start md:justify-center ${locale === 'ar' ? 'mt-10' : 'mt-6 md:mt-10'}`}>
            <RiveBackground />
            {/* Hero Content */}
            <div className="relative z-10 padding-mobile-only">
                <div className="text-start md:text-center">
                    <div className={`flex flex-col items-start md:items-center gap-4 text-start md:text-center ${isRTL ? 'rtl' : ''}`}>
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
                        <p className="md:max-w-3xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                            {t.subtitle}
                        </p>
                        <div className={`flex flex-col md:flex-row gap-4 items-stretch md:items-center mt-2 md:mx-auto`}>
                            <ExpandButton
                                variant="default"
                                onClick={() => setAppointmentModalOpen(true)}
                                className="hover:shadow-[4px_4px_0px_black] cursor-pointer"
                            >
                                {t.appointment}
                            </ExpandButton>
                            <ExpandButton variant="outline" href="/service" className="hover:shadow-[4px_4px_0px_black]">
                                {t.services}
                            </ExpandButton>
                        </div>
                    </div>
                </div>
            </div>

            <AppointmentModal
                isOpen={appointmentModalOpen}
                onClose={() => setAppointmentModalOpen(false)}
            />
        </section>
    );
}
