import BusinessCard from "./business-card";
import Design from "./design";
import Branding from "./branding";
import Creative from "./creative";
import { Sales } from "./sales";
import SectionHeading from "./section-heading";

export default function ServiceContent() {
  return (
    <>
    <div className="flex w-full flex-col py-14 mt-18 items-center">
      <SectionHeading />
      
      <Design />
      <Branding />
      <Creative />
    </div>
    <Sales />
    </>
  );
}