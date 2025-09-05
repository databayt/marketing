"use client";

import { PlansRow } from "@/components/marketing/pricing/types";
import { CircleCheck, Info } from "lucide-react";

import { comparePlans, plansColumns } from "@/components/marketing/pricing/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HeaderSection } from "@/components/atom/header-section";
import MaxWidthWrapper from "@/components/marketing/pricing/shared/max-width-wrapper";
import { useTranslations } from '@/lib/use-translations';

export function ComparePlans() {
  const { t, locale } = useTranslations();
  
  const renderCell = (value: string | boolean | null) => {
    if (value === null) return "—";
    if (typeof value === "boolean")
      return value ? <CircleCheck className="mx-auto size-[22px]" /> : "—";
    
    // Translate cell values
    if (typeof value === "string") {
      // Create a comprehensive mapping for all translation keys
      let valueKey = '';
      
      // Handle specific value mappings
      switch(value.toLowerCase()) {
        case 'up to 5': valueKey = 'upTo5'; break;
        case 'up to 15': valueKey = 'upTo15'; break;
        case 'unlimited': valueKey = 'unlimited'; break;
        case 'basic': valueKey = 'basic'; break;
        case 'advanced': valueKey = 'advanced'; break;
        case 'premium': valueKey = 'premium'; break;
        case 'custom': valueKey = 'custom'; break;
        case 'static': valueKey = 'static'; break;
        case 'basic cms': valueKey = 'basicCms'; break;
        case 'advanced cms': valueKey = 'advancedCms'; break;
        case 'custom cms': valueKey = 'customCms'; break;
        case 'basic ssl': valueKey = 'basicSsl'; break;
        case 'advanced ssl': valueKey = 'advancedSsl'; break;
        case 'premium ssl': valueKey = 'premiumSsl'; break;
        case 'custom security': valueKey = 'customSecurity'; break;
        case 'email': valueKey = 'email'; break;
        case 'priority': valueKey = 'priority'; break;
        case '24/7': valueKey = 'support24_7'; break;
        case '24/7 + manager': valueKey = 'support24_7Manager'; break;
        case '1 round': valueKey = 'oneRound'; break;
        case '3 rounds': valueKey = 'threeRounds'; break;
        case 'shared': valueKey = 'shared'; break;
        case 'vps': valueKey = 'vps'; break;
        case 'dedicated': valueKey = 'dedicated'; break;
        case 'monthly': valueKey = 'monthly'; break;
        case 'weekly': valueKey = 'weekly'; break;
        case 'daily': valueKey = 'daily'; break;
        case 'real-time': valueKey = 'realTime'; break;
        case 'self-service': valueKey = 'selfService'; break;
        case 'guided': valueKey = 'guided'; break;
        case 'full service': valueKey = 'fullService'; break;
        case 'white-glove': valueKey = 'whiteGlove'; break;
        case 'basic guides': valueKey = 'basicGuides'; break;
        case 'video tutorials': valueKey = 'videoTutorials'; break;
        case 'custom training': valueKey = 'customTraining'; break;
        default: valueKey = value.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
      }
      
      const translationKey = `marketing.pricing.comparePlans.values.${valueKey}`;
      const translation = translationKey.split('.').reduce((acc: any, key) => acc?.[key], t);
      return translation || value;
    }
    return value;
  };
  
  const getTranslatedFeature = (feature: string) => {
    // Handle specific feature mappings
    let featureKey = '';
    switch(feature.toLowerCase()) {
      case 'website pages': featureKey = 'websitePages'; break;
      case 'responsive design': featureKey = 'responsiveDesign'; break;
      case 'custom branding': featureKey = 'customBranding'; break;
      case 'seo optimization': featureKey = 'seoOptimization'; break;
      case 'contact forms': featureKey = 'contactForms'; break;
      case 'animations & effects': featureKey = 'animationsEffects'; break;
      case 'content management': featureKey = 'contentManagement'; break;
      case 'performance optimization': featureKey = 'performanceOptimization'; break;
      case 'security features': featureKey = 'securityFeatures'; break;
      case 'analytics & reporting': featureKey = 'analyticsReporting'; break;
      case 'support': featureKey = 'support'; break;
      case 'revisions': featureKey = 'revisions'; break;
      case 'hosting': featureKey = 'hosting'; break;
      case 'backup & maintenance': featureKey = 'backupMaintenance'; break;
      case 'custom integrations': featureKey = 'customIntegrations'; break;
      case 'training & documentation': featureKey = 'trainingDocumentation'; break;
      case 'launch assistance': featureKey = 'launchAssistance'; break;
      case 'performance monitoring': featureKey = 'performanceMonitoring'; break;
      default: 
        featureKey = feature
          .charAt(0).toLowerCase() + feature.slice(1)
          .replace(/\s+&\s+/g, '') // Remove & with spaces  
          .replace(/\s+/g, '') // Remove spaces
          .replace(/[^a-zA-Z]/g, ''); // Remove special chars
    }
    
    const translationKey = `marketing.pricing.comparePlans.features.${featureKey}`;
    const translation = translationKey.split('.').reduce((acc: any, key) => acc?.[key], t);
    return translation || feature;
  };
  
  const getTranslatedTooltip = (tooltip: string | undefined) => {
    if (!tooltip) return undefined;
    
    // Create a mapping for tooltip keys based on the original tooltip content
    let tooltipKey = '';
    if (tooltip.includes('website pages')) tooltipKey = 'websitePages';
    else if (tooltip.includes('Mobile-friendly')) tooltipKey = 'responsiveDesign';
    else if (tooltip.includes('Brand colors')) tooltipKey = 'customBranding';
    else if (tooltip.includes('Search engine')) tooltipKey = 'seoOptimization';
    else if (tooltip.includes('Contact form')) tooltipKey = 'contactForms';
    else if (tooltip.includes('Interactive animations')) tooltipKey = 'animationsEffects';
    else if (tooltip.includes('Content management')) tooltipKey = 'contentManagement';
    else if (tooltip.includes('Website speed')) tooltipKey = 'performanceOptimization';
    else if (tooltip.includes('Security certificates')) tooltipKey = 'securityFeatures';
    else if (tooltip.includes('Website analytics')) tooltipKey = 'analyticsReporting';
    else if (tooltip.includes('Customer support')) tooltipKey = 'support';
    else if (tooltip.includes('Number of design')) tooltipKey = 'revisions';
    else if (tooltip.includes('Website hosting')) tooltipKey = 'hosting';
    else if (tooltip.includes('Backup frequency')) tooltipKey = 'backupMaintenance';
    else if (tooltip.includes('Third-party service')) tooltipKey = 'customIntegrations';
    else if (tooltip.includes('User training')) tooltipKey = 'trainingDocumentation';
    else if (tooltip.includes('Website launch')) tooltipKey = 'launchAssistance';
    else if (tooltip.includes('Ongoing website')) tooltipKey = 'performanceMonitoring';
    
    if (tooltipKey) {
      const translationKey = `marketing.pricing.comparePlans.tooltips.${tooltipKey}`;
      const translation = translationKey.split('.').reduce((acc: any, key) => acc?.[key], t);
      return translation || tooltip;
    }
    return tooltip;
  };
  
  const getTranslatedPlanColumn = (col: string) => {
    const planKey = col.toLowerCase();
    const translationKey = `marketing.pricing.planNames.${planKey}`;
    const translation = translationKey.split('.').reduce((acc: any, key) => acc?.[key], t);
    return translation || col;
  };

  return (
    <div className="py-20">
      <MaxWidthWrapper>
        <HeaderSection
          title={t.marketing.pricing.comparePlans.title}
          subtitle={t.marketing.pricing.comparePlans.subtitle}
        />

        <div className="my-10 overflow-x-scroll max-lg:mx-[-0.8rem] md:overflow-x-visible">
          <table className="w-full table-fixed">
            <thead>
              <tr className="">
                <th className="sticky left-0 z-20 w-40 bg-background py-5 md:w-1/4 lg:top-12"></th>
                {plansColumns.map((col) => (
                  <th
                    key={col}
                    className="sticky z-10 w-40 bg-background py-5 font-heading text-center capitalize tracking-wide md:w-auto lg:top-12"
                  >
                    {getTranslatedPlanColumn(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {comparePlans.map((row: PlansRow, index: number) => (
                <tr key={index} className="">
                  <td
                    data-tip={row.tooltip ? row.tooltip : ""}
                    className="sticky left-0 bg-background md:bg-transparent"
                  >
                    <div className="flex items-center justify-between space-x-2 py-4">
                      <span className="lg:text-base">
                        {getTranslatedFeature(row.feature)}
                      </span>
                      {row.tooltip && (
                        <Popover>
                          <PopoverTrigger className="rounded p-1 hover:bg-muted">
                            <Info className="size-[18px] text-muted-foreground" />
                          </PopoverTrigger>
                          <PopoverContent
                            side="top"
                            className="max-w-80 py-3"
                          >
                            {getTranslatedTooltip(row.tooltip)}
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </td>
                  {plansColumns.map((col) => (
                    <td
                      key={col}
                      className="py-4 text-center text-muted-foreground lg:text-base"
                    >
                      {renderCell(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}