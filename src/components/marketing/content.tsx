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

export default function SiteContent() {
  return (
    <div>
      <Hero />
      <section className="">
        <LogoCloud />
      </section>
      <section className="py-10">
        <div className="container mx-auto space-y-16">
          <VideoCard
            logo="Story TELLER"
            title="AI Story Generation"
            description="Transform your ideas into compelling stories with our talented storytelling team. Create engaging narratives, scripts, and content that captivates your audience."
            ctaText="Start Writing"
            secondaryCtaText="Learn More"
            videoSrc="/marketing/site/story.mp4"
            videoPoster="/marketing/sample-poster.jpg"
          />
          <VideoCard
            logo="Dream MACHINE"
            title="AI-Powered Video Creation"
            description="Bring your ideas to life — ideate, visualize, and design unique themes with ease. Share your dreams with the world using our intuitive wizard."
            ctaText="Try Now"
            secondaryCtaText="Get Expert"
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
              logo="CODEBASE"
              title="AI Story Generation"
              description="Automate the boring. at Databayt we're building codebase for business automation."
              ctaText="Databayt"
              secondaryCtaText="Codebase"
              imageSrc="/marketing/site/codebase.png"
              imageAlt="Codebase automation platform preview"
            />
            <VerticalImageCard
              logo="ACME"
              title="AI-Powered Video Creation"
              description="Company automation. managing projects, auto-generate reports, calculations, and docs"
              ctaText="Live Preview"
              secondaryCtaText="Get App"
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
