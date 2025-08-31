import React from 'react';
import Image from 'next/image';
import ExpandButton from '@/components/atom/expand-button';
import LogoCloud  from './logo-cloud';

export function Hero() {
    return (
        <header className="tt-hero py-20 md:mt-14 gradient-top-right min-h-screen relative overflow-hidden">
            {/* Gradient Container with Background Image */}
            <div className="tt-gradient-container absolute top-40 md:top-0 -right-6 md:right-0 z-0">
                <div className="tt-gradient-panel">
                    <Image 
                        className="tt-gradient-image gradient-accordion-square w-screen h-auto md:w-[744px] block"
                        src="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/6580b17f35510ffc21541053_gradient-noise-green-red.png"
                        alt="decorative background"
                        width={744}
                        height={744}
                        draggable={false}
                        sizes="(max-width: 767px) 100vw, 744px"
                        loading="lazy"
                    />
                </div>
            </div>
            
            {/* Hero Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-6 sm:px-8 lg:px-12 md:mt-0">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <h1 className="hidden md:block font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-8xl">
                            Grows begins here <br />
                            with a right design
                        </h1>
                        <h1 className="block md:hidden font-heading font-black text-5xl sm:text-7xl md:text-6xl lg:text-[80px]">
                            Grows begins <br />
                            here with the <br />
                            right design
                        </h1>
                        <p className="max-w-xs md:max-w-3xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Every great brand grows from the right design. We craft elegant, functional, and impactful experiences that connect with people and inspire lasting engagement.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-center mt-2">
                            <ExpandButton variant="default" href="/#" className="hover:shadow-[4px_4px_0px_black]">
                                Appointment
                            </ExpandButton>
                            <ExpandButton variant="outline" href="/service" className="hover:shadow-[4px_4px_0px_black]">
                                Services
                            </ExpandButton>
                        </div>
                        <LogoCloud />
                    </div>
                </div>
            </div>
        </header>
    );
}
