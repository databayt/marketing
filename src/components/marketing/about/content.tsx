import React from 'react';
import { useTranslations } from '@/lib/use-translations';

const Introduction = ({ t }: { t: any }) => {
    return (
        <div className='space-y-6'>
            <h4 className='text-2xl leading-relaxed'>
                {t.marketing.about.introduction.paragraph1}
            </h4>
            <h4 className='text-2xl leading-relaxed'>
                {t.marketing.about.introduction.paragraph2}
            </h4>
            <h4 className='text-2xl leading-relaxed'>
                {t.marketing.about.introduction.paragraph3}
            </h4>
            <h4 className='text-2xl leading-relaxed'>
                {t.marketing.about.introduction.paragraph4}
            </h4>
        </div>
    )
}

const WhatWeDo = ({ t }: { t: any }) => {
    return (
        <div className='space-y-4 py-10'>
            <h4 className='text-2xl font-semibold'>{t.marketing.about.whatWeDo.title}</h4>
            <p className='text-white/80'>{t.marketing.about.whatWeDo.development}</p>
            <p className='text-white/80'>{t.marketing.about.whatWeDo.automation}</p>
            <p className='text-white/80'>{t.marketing.about.whatWeDo.consulting}</p>
            <p className='text-white/80'>{t.marketing.about.whatWeDo.openSource}</p>
        </div>
    )
}

const BusinessModel = ({ t }: { t: any }) => {
    return (
        <div className='space-y-4 py-10'>
            <h4 className='text-2xl font-semibold'>{t.marketing.about.businessModel.title}</h4>
            <h4 className='text-xl font-medium'>{t.marketing.about.businessModel.perProject.title}</h4>
            <p className='text-white/80'>{t.marketing.about.businessModel.perProject.description}</p>

            <h4 className='text-xl font-medium'>{t.marketing.about.businessModel.partners.title}</h4>
            <p className='text-white/80'>{t.marketing.about.businessModel.partners.description}</p>

            <h4 className='text-xl font-medium'>{t.marketing.about.businessModel.codebase.title}</h4>
            <p className='text-white/80'>{t.marketing.about.businessModel.codebase.description}</p>

            <h4 className='text-xl font-medium'>{t.marketing.about.businessModel.saas.title}</h4>
            <p className='text-white/80'>{t.marketing.about.businessModel.saas.description}</p>
        </div>
    )
}

const CoreValues = ({ t }: { t: any }) => {
    return (
        <div className='space-y-4 py-10'>
            <h4 className='text-2xl font-semibold'>{t.marketing.about.coreValues.title}</h4>
            <h4 className='text-xl font-medium'>{t.marketing.about.coreValues.transparency.title}</h4>
            <p className='text-white/80'>{t.marketing.about.coreValues.transparency.description}</p>

            <h4 className='text-xl font-medium'>{t.marketing.about.coreValues.innovation.title}</h4>
            <p className='text-white/80'>{t.marketing.about.coreValues.innovation.description}</p>

            <h4 className='text-xl font-medium'>{t.marketing.about.coreValues.growth.title}</h4>
            <p className='text-white/80'>{t.marketing.about.coreValues.growth.description}</p>

            <h4 className='text-xl font-medium'>{t.marketing.about.coreValues.excellence.title}</h4>
            <p className='text-white/80'>{t.marketing.about.coreValues.excellence.description}</p>
        </div>
    )
}

export const Content = () => {
    const { t, isRTL } = useTranslations();
    
    return (
        <div className={`md:max-w-[80%] py-40 ${isRTL ? 'mr-0 ml-auto text-right' : ''}`}>
            <Introduction t={t} />
            <WhatWeDo t={t} />
            <BusinessModel t={t} />
            <CoreValues t={t} />
        </div>
    );
};

