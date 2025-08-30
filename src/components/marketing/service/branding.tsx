import React from "react";
import Image from "next/image";

export default function Branding() {
  return (
    <div className="py-8">
      {/* Heading with Icon */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <Image
          src="/site/branding.png"
          alt="Branding Icon"
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <h2 className="text-3xl font-bold text-foreground">Branding</h2>
      </div>

      {/* Description */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Create a memorable brand identity that resonates with your audience  From logos to complete brand guidelines, we craft visual stories that build trust and recognition
        </p>
      
      </div>

      {/* Four Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        
        <div className="aspect-square overflow-hidden rounded-lg animation-box">
          <div>
            <Image
              src="/site/2.jpg"
              alt="Branding Example 2"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="aspect-square overflow-hidden rounded-lg animation-box">
          <div>
            <Image
              src="/site/1.jpg"
              alt="Branding Example 1"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="aspect-square overflow-hidden rounded-lg animation-box">
          <div>
            <Image
              src="/site/3.jpg"
              alt="Branding Example 3"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="aspect-square overflow-hidden rounded-lg animation-box">
          <div>
            <Image
              src="/site/4.jpg"
              alt="Branding Example 4"
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
