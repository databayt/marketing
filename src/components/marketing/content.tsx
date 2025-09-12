"use client";

import { Hero } from "./hero";
import { Ready } from "./ready";
import ReadyToBuildSection from "./ready-to-build";
import Parallax from "./parallax-text";
import { FeatureCards } from "./card";
import VideoCard from "./vedio-card";
import Product from "./product";
import OpenSource from "./open-source";
import Stack from "./stack";
import FeaturedProjects from "./video/featured-video";
import LogoCloud from "./logo-cloud";
import type { getDictionary } from '@/components/internationalization/dictionaries';
import type { Locale } from '@/components/internationalization/config';

interface SiteContentProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  params: { lang: Locale };
}

export default function SiteContent({ dictionary, params }: SiteContentProps) {
  const t = dictionary;
  return (
    <div>
      <Hero dictionary={dictionary.marketing.hero} params={params} />
      <section className="">
        <LogoCloud dictionary={dictionary.marketing.logoCloud} params={params} />
      </section>
      <section className="py-10">
        <div className="container mx-auto space-y-16">
          <VideoCard
            logo={t.marketing.content.storyTeller.logo}
            title={t.marketing.content.storyTeller.title}
            description={t.marketing.content.storyTeller.description}
            ctaText={t.marketing.content.storyTeller.ctaText}
            secondaryCtaText={t.marketing.content.storyTeller.secondaryCtaText}
            videoSrc="/marketing/site/story.mp4"
            videoPoster="/marketing/sample-poster.jpg"
          />
          <VideoCard
            logo={t.marketing.content.dreamMachine.logo}
            title={t.marketing.content.dreamMachine.title}
            description={t.marketing.content.dreamMachine.description}
            ctaText={t.marketing.content.dreamMachine.ctaText}
            secondaryCtaText={t.marketing.content.dreamMachine.secondaryCtaText}
            videoSrc="/marketing/site/dream.mp4"
            videoPoster="/marketing/sample-poster.jpg"
          />
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-10">
        <div className="container mx-auto">
          <div className="space-y-8">
            <div className="mx-auto flex max-w-full flex-col items-center space-y-4 text-center">
              <h2 className={`font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl ${params.lang === 'ar' ? 'md:text-7xl' : ''}`}>
                {dictionary.marketing?.productsSection?.title || "Product"}
              </h2>
              <p className="max-w-[95%] md:max-w-[65%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 pb-7">
                {dictionary.marketing?.productsSection?.description || "Innovative automation solutions designed to save the origin of all value, time."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Product
              logo={t.marketing.content.codebase.logo}
              title={t.marketing.content.codebase.title}
              description={t.marketing.content.codebase.description}
              ctaText={t.marketing.content.codebase.ctaText}
              secondaryCtaText={t.marketing.content.codebase.secondaryCtaText}
              imageSrc="/marketing/site/ecosystem.png"
              imageAlt="Codebase automation platform preview"
            />
            <Product
              logo={t.marketing.content.acme.logo}
              title={t.marketing.content.acme.title}
              description={t.marketing.content.acme.description}
              ctaText={t.marketing.content.acme.ctaText}
              secondaryCtaText={t.marketing.content.acme.secondaryCtaText}
              imageSrc="/marketing/site/hogwarts.jpg"
              imageAlt="Hogwarts education management system preview"
            />
            </div>
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="container mx-auto">
          <div className="space-y-4">
            <div className="mx-auto flex max-w-full flex-col items-center text-center">
              <h2 className={`font-heading text-3xl leading-[1.1] sm:text-3xl mb-2 ${params.lang === 'ar' ? 'md:text-7xl' : 'md:text-6xl'}`}>
                {dictionary.marketing?.projectsSection?.title || "Project"}
              </h2>
            </div>
            <FeaturedProjects 
              dictionary={dictionary.marketing.projects} 
              projectsSection={dictionary.marketing.projectsSection}
              params={params} 
            />
          </div>
        </div>
      </section>
      <section className="py-10">
        <FeatureCards dictionary={dictionary.marketing.featureCards} params={params} />
      </section>
      <section className="py-10">
        <Parallax dictionary={dictionary.marketing.parallax} params={params} />
      </section>
      <section className="py-10">
        <Ready dictionary={dictionary.marketing.ready} params={params} />
      </section>
      <section className="py-10">
        <OpenSource dictionary={dictionary.marketing.openSource} params={params} />
      </section>
      <section className="py-10">
        <Stack dictionary={dictionary.marketing.stack} params={params} />
      </section>
      <section className="pt-10">
        <ReadyToBuildSection dictionary={dictionary.marketing.readyToBuild} params={params} />
      </section>
    </div>
  );
}
