import React from 'react';
import ExpandButton from '@/components/atom/expand-button';

export function Hero() {
    return (
        <section className="tt-hero h-screen mt-10 relative flex items-center justify-center">
            {/* Hero Content */}
            <div className="relative z-10 px-6 sm:px-8 lg:px-12">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <h1 className="hidden md:block font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-8xl">
                            Grows begins here <br />
                            with a right design
                        </h1>
                        <h1 className="block md:hidden font-heading font-black text-5xl sm:text-7xl md:text-6xl lg:text-[80px]">
                            Grows begin <br />
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
                    </div>
                </div>
            </div>
        </section>
    );
}
