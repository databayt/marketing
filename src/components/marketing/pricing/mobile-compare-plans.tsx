"use client";

import { PlansRow } from "@/components/marketing/pricing/types";
import { CircleCheck, Info } from "lucide-react";
import { comparePlans, plansColumns } from "@/components/marketing/pricing/constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeaderSection } from "@/components/atom/header-section";
import MaxWidthWrapper from "@/components/marketing/pricing/shared/max-width-wrapper";
import { useTranslations } from '@/lib/use-translations';

export function MobileComparePlans() {
  const { t, locale } = useTranslations();
  
  const renderCell = (value: string | boolean | null) => {
    if (value === null) return "—";
    if (typeof value === "boolean")
      return value ? <CircleCheck className="size-4 text-green-600" /> : "—";
    
    // Translate cell values (reusing same logic as desktop version)
    if (typeof value === "string") {
      let valueKey = '';
      
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
          .replace(/\s+&\s+/g, '')
          .replace(/\s+/g, '')
          .replace(/[^a-zA-Z]/g, '');
    }
    
    const translationKey = `marketing.pricing.comparePlans.features.${featureKey}`;
    const translation = translationKey.split('.').reduce((acc: any, key) => acc?.[key], t);
    return translation || feature;
  };
  
  const getTranslatedPlanColumn = (col: string) => {
    const planKey = col.toLowerCase();
    const translationKey = `marketing.pricing.planNames.${planKey}`;
    const translation = translationKey.split('.').reduce((acc: any, key) => acc?.[key], t);
    return translation || col;
  };

  return (
    <div className="py-10 md:hidden">
      <MaxWidthWrapper>
        <HeaderSection
          title={t.marketing.pricing.comparePlans.title}
          subtitle={t.marketing.pricing.comparePlans.subtitle}
        />

        <div className="mt-8 space-y-4">
          {plansColumns.map((planName) => (
            <Card key={planName} className="border border-border/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-center">
                  {getTranslatedPlanColumn(planName)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Accordion type="single" collapsible className="w-full">
                  {comparePlans.map((row: PlansRow, index: number) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/10">
                      <AccordionTrigger className="py-3 text-sm hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-2">
                          <span className="text-left">{getTranslatedFeature(row.feature)}</span>
                          <div className="flex items-center gap-2">
                            {renderCell(row[planName])}
                          </div>
                        </div>
                      </AccordionTrigger>
                      {row.tooltip && (
                        <AccordionContent className="pt-0 pb-3">
                          <p className="text-xs text-muted-foreground">
                            {row.tooltip}
                          </p>
                        </AccordionContent>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}