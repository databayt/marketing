import React from "react";
import { OptimizedImage } from '@/components/ui/optimized-image';
// import MainButton from "../common/MainButton";

interface IProps {
  title: () => React.JSX.Element;
  description: string;
  rightSideImageUrl: string;
}

function MainLayoutCard({ title, description, rightSideImageUrl }: IProps) {
  return (
    <section className="flex justify-between gap-large md:gap-4 items-center mt-[5rem] flex-col md:flex-row">
      <div>
        <div className="leading-[4rem] md:leading-large text-white text-medium md:text-large font-[600] text-center md:text-left">
          {title()}
        </div>
        <p className="text-normal text-grey mt-4 mb-[4.5rem] text-center md:text-left">
          {description}
        </p>
        <div className="flex justify-center md:justify-start">
          {/* <MainButton
            text="Get started"
            variant="secondary"
            classes="w-[10.9375rem] text-[#333] text-[1.125rem] rounded-normal"
            size="normal"
          /> */}
        </div>
      </div>
      <div>
        <OptimizedImage
          src={rightSideImageUrl}
          width={500}
          height={400}
          className="rounded-xl md:max-w-[31.25rem]"
          alt="overview"
        />
      </div>
    </section>
  );
}

export default MainLayoutCard;