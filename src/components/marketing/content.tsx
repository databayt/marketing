"use client";

import { Hero } from "./hero";
import { Ready } from "./ready";
import ReadyToBuildSection from "./ready-to-build";
import Parallax from "./parallax-text";
import { FeatureCards } from "./card";
import VideoCard from "./vedio-card";
import VerticalImageCard from "./vertical-image-card";
import OpenSource from "./open-source";
import Stack from "./stack";
import FeaturedProjects from "./video/featured-video";
import LogoCloud from "./logo-cloud";
import { useTranslations } from '@/lib/use-translations';

export default function SiteContent() {
  const { t } = useTranslations();
  return (
    <div>
      <Hero />
      <section className="">
        <LogoCloud />
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
      
      {/* Vertical Layout Image Cards */}
      <section className="py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VerticalImageCard
              logo={t.marketing.content.codebase.logo}
              title={t.marketing.content.codebase.title}
              description={t.marketing.content.codebase.description}
              ctaText={t.marketing.content.codebase.ctaText}
              secondaryCtaText={t.marketing.content.codebase.secondaryCtaText}
              imageSrc="/marketing/site/codebase.png"
              imageAlt="Codebase automation platform preview"
            />
            <VerticalImageCard
              logo={t.marketing.content.acme.logo}
              title={t.marketing.content.acme.title}
              description={t.marketing.content.acme.description}
              ctaText={t.marketing.content.acme.ctaText}
              secondaryCtaText={t.marketing.content.acme.secondaryCtaText}
              imageSrc="/marketing/site/acme-preview.jpg"
              imageAlt="ACME company automation platform preview"
            />
          </div>
        </div>
      </section>
      <section className="py-10">
        <FeaturedProjects />
      </section>
      <section className="py-10">
        <FeatureCards />
      </section>
      <section className="py-10">
        <Parallax />
      </section>
      <section className="py-10">
        <Ready />
      </section>
      <section className="py-10">
        <OpenSource />
      </section>
      <section className="py-10">
        <Stack />
      </section>
      <section className="pt-10">
        <ReadyToBuildSection />
      </section>
    </div>
  );
}
