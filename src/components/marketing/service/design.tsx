import React from "react";
import Image from "next/image";

export default function Design() {
  return (
    <div className="py-8">
      {/* Heading with Icon */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <Image
          src="/site/design.png"
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
        <video 
          autoPlay
          muted
          loop
          className="rounded-lg w-full md:w-[500px] h-[300px] md:h-[400px] object-cover"
          preload="metadata"
        >
          <source src="/site/resize.mp4" type="video/mp4" />
        </video>
        
        <video 
          autoPlay
          muted
          loop
          className="rounded-lg w-full md:w-[500px] h-[300px] md:h-[400px] object-cover"
          preload="metadata"
        >
          <source src="/site/creative.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Image Row */}
      <div className="flex justify-center items-center mt-8 bg-amber-300">
        <div className="flex flex-col md:flex-row">
          {/* <div className="aspect-square overflow-hidden rounded-lg animation-box">
            <div>
              <Image
                src="/site/c.jpg"
                alt="Design Image 1"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div> */}
          <div className="overflow-hidden animation-box">
            <div>
              <Image
                src="/site/d.jpg"
                alt="Design Image 2"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="overflow-hidden  animation-box">
            <div>
              <Image
                src="/site/e.jpg"
                alt="Design Image 3"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-lg animation-box scale-98">
            <div>
              <Image
                src="/site/f.jpg"
                alt="Design Image 4"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}