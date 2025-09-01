import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Sales() {
  return (
    <div className="bg-[#0080FF] full-bleed">
      <div className="container-responsive">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
          {/* Content Section - Now on the left */}
          <div className="flex-1 text-center lg:text-left lg:pl-12" >
          <h2 className="text-4xl font-bold text-muted mb-2 mt-8 md:mt-0">Let's work together</h2>
            <p className="text-lg mb-4 max-w-lg mx-auto lg:mx-0 text-muted">
              Ready to take your business to the next level? 
            </p>
           
            <Button className="bg-muted hover:bg-muted/80 text-primary flex items-center gap-2 mx-auto lg:mx-0">
              <Image
                src="/site/b.jpg"
                alt="Gift box icon"
                width={20}
                height={20}
                className="rounded-sm"
              />
              Collect your gift
            </Button>
          </div>
          
          {/* Image Section - Now on the right */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full lg:pl-24">
              <Image
                src="/site/a.png"
                alt="Sales representative"
                width={200}
                height={200}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
