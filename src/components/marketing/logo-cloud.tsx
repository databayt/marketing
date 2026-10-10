'use client'

import { InfiniteSlider } from '@/components/atom/infinite-slider'
import { ProgressiveBlur } from '@/components/atom/progressive-blur'
import { OptimizedImage } from '@/components/ui/optimized-image'
import type { getDictionary } from '@/components/internationalization/dictionaries';
import type { Locale } from '@/components/internationalization/config';

const sponsors = [
    { 
        name: "Faisal", 
        src: "/marketing/sponser/faisal.png", 
        width: 120, 
        height: 60, 
        className: "h-12 w-auto" 
    },
    { 
        name: "MTDT", 
        src: "/marketing/sponser/mtdt.png", 
        width: 120, 
        height: 60, 
        className: "h-12 w-auto" 
    },
    { 
        name: "Zain", 
        src: "/marketing/sponser/zain.png", 
        width: 100, 
        height: 50, 
        className: "h-10 w-auto" 
    },
    { 
        name: "Khartoum", 
        src: "/marketing/sponser/khartoum.png", 
        width: 120, 
        height: 60, 
        className: "h-12 w-auto" 
    },
    { 
        name: "Dal", 
        src: "/marketing/sponser/dal.png", 
        width: 120, 
        height: 60, 
        className: "h-12 w-auto" 
    },
    { 
        name: "249", 
        src: "/marketing/sponser/249.png", 
        width: 100, 
        height: 50, 
        className: "h-10 w-auto" 
    },
    { 
        name: "University of Khartoum", 
        src: "/marketing/sponser/uok.png", 
        width: 110, 
        height: 55, 
        className: "h-11 w-auto" 
    },
]

interface LogoCloudProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['marketing']['logoCloud'];
  params: { lang: Locale };
}

// The logos speak for themselves — no "trusted by" title (dictionary kept for the prop contract).
export default function LogoCloud(_props: LogoCloudProps) {
    return (
        <section className="overflow-hidden mt-6 md:mt-0 py-8 md:py-16">
            <div className="group relative section-frame">
                <div className="flex flex-col items-center">
                    <div className="relative w-full py-6" style={{direction: 'ltr'}}>
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={80}>
                            {sponsors.map((sponsor, index) => (
                                <div key={index} className="flex items-center justify-center">
                                    <OptimizedImage
                                        src={sponsor.src}
                                        alt={sponsor.name}
                                        width={sponsor.width}
                                        height={sponsor.height}
                                        className={`${sponsor.className} object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 dark:invert`}
                                    />
                                </div>
                            ))}
                        </InfiniteSlider>

                        <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
