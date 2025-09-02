import React from "react";
import { OptimizedImage } from '@/components/ui/optimized-image';
import { OptimizedVideo } from '@/components/ui/optimized-video';

export default function Design() {
  return (
    <div className="py-8">
      {/* Heading with Icon */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <OptimizedImage
          src="/marketing/site/design.png"
          alt="Design Icon"
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <h2 className="text-3xl font-bold text-foreground">Design</h2>
      </div>

      {/* Service Description */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Creating stunning visual designs with modern UI/UX, graphics, and layouts. 
          We bring innovative concepts to life with creative excellence.
        </p>
      </div>

      {/* Videos */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        <OptimizedVideo 
          src="/marketing/site/resize.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="rounded-lg w-full md:w-[500px] h-[300px] md:h-[400px] object-cover"
          width={500}
          height={400}
        />
        
        <OptimizedVideo 
          src="/marketing/site/creative.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="rounded-lg w-full md:w-[500px] h-[300px] md:h-[400px] object-cover"
          width={500}
          height={400}
        />
      </div>

      {/* Image Row */}
      <div className="w-full mt-8 bg-amber-300">
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex-1 overflow-hidden animation-box">
            <div>
              <OptimizedImage
                src="/marketing/site/d.jpg"
                alt="Design Image 2"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                transformation={[
                  { quality: 90, format: 'auto' }
                ]}
              />
            </div>
          </div>
          <div className="flex-1 overflow-hidden animation-box">
            <div>
              <OptimizedImage
                src="/marketing/site/e.jpg"
                alt="Design Image 3"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                transformation={[
                  { quality: 90, format: 'auto' }
                ]}
              />
            </div>
          </div>
          <div className="flex-1 overflow-hidden animation-box scale-98">
            <div>
              <OptimizedImage
                src="/marketing/site/f.jpg"
                alt="Design Image 4"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                transformation={[
                  { quality: 90, format: 'auto' }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}