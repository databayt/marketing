import React from "react";
import Image from "next/image";

export default function Creative() {
  return (
    <div className="py-8">
      {/* Heading with Icon */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <Image
          src="/site/creative.png"
          alt="Creative Icon"
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <h2 className="text-3xl font-bold text-foreground">Creative</h2>
      </div>

      {/* Service Description */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <p className="text-lg text-muted-foreground leading-relaxed">
          We offer comprehensive creative services including content creation, 
          poster design, and professional video editing. Our team specializes in 
          bringing your vision to life.
        </p>
      </div>

      {/* Video and Wallet */}
      <div className="flex gap-8 justify-center items-center mb-8">
        <video 
          autoPlay
          muted
          loop
          className="rounded-lg w-[500px] h-[350px] object-cover"
          preload="metadata"
        >
          <source src="/site/order.mp4" type="video/mp4" />
        </video>
        
        <Image
          src="/site/wallet.gif"
          alt="Wallet Animation"
          width={500}
          height={350}
          className="rounded-lg w-[500px] h-[350px] object-cover"
        />
      </div>

      {/* Images Row */}
      <div className="flex gap-0 justify-center items-center w-full">
        <div className="w-1/4 h-[300px] overflow-hidden animation-box">
          <div>
            <Image
              src="/site/5.jpg"
              alt="Creative Work 1"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-1/4 h-[300px] overflow-hidden animation-box">
          <div>
            <Image
              src="/site/6.jpg"
              alt="Creative Work 2"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-1/4 h-[300px] overflow-hidden animation-box">
          <div>
            <Image
              src="/site/7.jpg"
              alt="Creative Work 3"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-1/4 h-[300px] overflow-hidden animation-box">
          <div>
            <Image
              src="/site/8.jpg"
              alt="Creative Work 4"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
