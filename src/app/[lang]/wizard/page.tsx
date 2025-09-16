'use client';
import { useState } from 'react';
import { BusinessSelector } from '@/components/wizard/business';
import { FeatureSelector } from '@/components/wizard/feature';
import { TemplateSelector } from '@/components/wizard/template';
import { EstimatesDisplay } from '@/components/wizard/estimate';
import { StepIndicator } from '@/components/wizard/indicator';
import { BrandingForm } from '@/components/wizard/branding/form';
import { TypographySelector } from '@/components/wizard/typography';
import { IconSelector } from '@/components/wizard/icons';
import { businesses } from '@/components/wizard/constant';
import { Button, buttonVariants } from '@/components/ui/button';
import { WizardSelections } from '@/components/wizard/constant';
import ThemeSelector from '@/components/wizard/theme';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useTranslations } from '@/lib/use-translations';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ExtendedWizardSelections extends WizardSelections {
  themeColor?: string;
  borderRadius?: number;
  branding?: {
    brandName?: string;
    tagline?: string;
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  typography?: string;
  iconStyle?: string;
}

export default function SelectionWizard() {
  const { t, locale, isRTL } = useTranslations();
  const [step, setStep] = useState<number>(1);
  const [selections, setSelections] = useState<ExtendedWizardSelections>({
    business: '',
    features: [],
    template: '',
    themeColor: 'zinc',
    borderRadius: 0.5,
    branding: {
      brandName: '',
      tagline: '',
      logoUrl: '',
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
    }
  });

  // Total steps: Business, Features, Template, Theme, Branding, Typography, Icons
  const totalSteps = 7;

  const calculateEstimates = () => {
    let totalPrice = 0;
    let totalTime = 0;

    const selectedBusiness = businesses.find((b) => b.id === selections.business);
    selections.features.forEach((featureId) => {
      const feature = selectedBusiness?.features.find((f) => f.id === featureId);
      if (feature) {
        totalPrice += feature.price;
        totalTime += feature.time;
      }
    });

    // Add branding costs if brand identity is customized
    if (selections.branding?.brandName || selections.branding?.logoUrl) {
      totalPrice += 25; // Base branding cost
      totalTime += 2; // Additional days for branding
    }

    // Apply discounts for multiple features
    if (selections.features.length >= 5) {
      totalPrice = Math.round(totalPrice * 0.9); // 10% discount
    } else if (selections.features.length >= 3) {
      totalPrice = Math.round(totalPrice * 0.95); // 5% discount
    }

    return { price: totalPrice, time: totalTime };
  };

  const handleBusinessSelect = (businessId: string) => {
    setSelections({ ...selections, business: businessId, features: [] });
    setStep(2);
  };

  const handleFeatureToggle = (featureId: string) => {
    const selectedBusiness = businesses.find((b) => b.id === selections.business);
    const isSelected = selections.features.includes(featureId);
    const updatedFeatures = isSelected
      ? selections.features.filter((f) => f !== featureId)
      : [...selections.features, featureId];

    setSelections({ ...selections, features: updatedFeatures });

    // Only show toast from step 2 onwards
    if (step >= 2) {
      const feature = selectedBusiness?.features.find((f) => f.id === featureId);
      const estimates = calculateEstimates();

      toast(
        `${feature?.name} ${isSelected ? t.common.delete : t.common.save}`,
        {
          description: `${t.wizard.estimates.totalCost}: $${estimates.price} • ${t.wizard.estimates.timeframe}: ${estimates.time} ${t.wizard.estimates.days}`,
          duration: 3000,
        }
      );
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelections({ ...selections, template: templateId });
  };

  const handleThemeSelect = (color: string, radius: number) => {
    setSelections({ ...selections, themeColor: color, borderRadius: radius });
  };

  const handleBrandingUpdate = (brandingData: any) => {
    setSelections({
      ...selections,
      branding: { ...selections.branding, ...brandingData }
    });
  };

  const estimates = calculateEstimates();
  const selectedBusiness = businesses.find((b) => b.id === selections.business);

  const getStepTitle = () => {
    switch(step) {
      case 1: return t.wizard.business.title;
      case 2: return `${t.wizard.features.title} ${selectedBusiness?.name || ''}`;
      case 3: return t.wizard.template.title;
      case 4: return t.wizard.theme.title;
      case 5: return t.wizard.branding.title;
      case 6: return t.wizard.typography?.title || 'Typography';
      case 7: return t.wizard.icons?.title || 'Icons';
      default: return '';
    }
  };

  const getStepSubtitle = () => {
    switch(step) {
      case 1: return t.wizard.business.subtitle;
      case 2: return t.wizard.features.subtitle;
      case 3: return t.wizard.template.subtitle;
      case 4: return t.wizard.theme.subtitle;
      case 5: return t.wizard.branding.subtitle;
      case 6: return t.wizard.typography?.subtitle || 'Choose your font style';
      case 7: return t.wizard.icons?.subtitle || 'Select icon style';
      default: return '';
    }
  };

  const isStepValid = () => {
    switch(step) {
      case 1: return !!selections.business;
      case 2: return selections.features.length > 0;
      case 3: return !!selections.template;
      case 4: return true; // Theme is optional
      case 5: return true; // Branding is optional
      case 6: return true; // Typography is optional
      case 7: return true; // Icons is optional
      default: return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Link
        href={`/${locale}`}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
      >
        {isRTL ? <ArrowRight className="mr-2 h-4 w-4" /> : <ArrowLeft className="mr-2 h-4 w-4" />}
        {t.common.back}
      </Link>

      <div className="w-full max-w-4xl space-y-6">
        {/* Main Content Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>{getStepTitle()}</CardTitle>
            <CardDescription>{getStepSubtitle()}</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {step === 1 && (
              <BusinessSelector
                businesses={businesses}
                selectedBusiness={selections.business}
                onSelect={handleBusinessSelect}
              />
            )}

            {step === 2 && selectedBusiness && (
              <FeatureSelector
                features={selectedBusiness.features}
                selectedFeatures={selections.features}
                onToggle={handleFeatureToggle}
                businessName={selectedBusiness.name}
              />
            )}

            {step === 3 && (
              <TemplateSelector
                selectedTemplate={selections.template}
                onSelect={handleTemplateSelect}
              />
            )}

            {step === 4 && (
              <ThemeSelector
                selectedColor={selections.themeColor}
                selectedRadius={selections.borderRadius}
                onSelect={handleThemeSelect}
              />
            )}

            {step === 5 && (
              <div className="space-y-4">
                <BrandingForm
                  initialData={selections.branding}
                  onSuccess={() => {
                    toast.success(t.wizard.branding.title, {
                      description: 'Brand identity updated successfully',
                    });
                  }}
                />
              </div>
            )}

            {step === 6 && (
              <TypographySelector
                selectedTypography={selections.typography}
                onSelect={(typography) => setSelections({ ...selections, typography })}
                locale={locale}
              />
            )}

            {step === 7 && (
              <IconSelector
                selectedStyle={selections.iconStyle}
                onSelect={(iconStyle) => setSelections({ ...selections, iconStyle })}
              />
            )}
          </CardContent>
        </Card>

        {/* Estimates Display - show from step 2 onwards */}
        {step >= 2 && (
          <Card>
            <CardContent className="pt-6">
              <EstimatesDisplay {...estimates} />
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex flex-col items-center space-y-4">
          <StepIndicator currentStep={step} totalSteps={totalSteps} />

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
            >
              {isRTL ? <ArrowRight className="mr-2 h-4 w-4" /> : <ArrowLeft className="mr-2 h-4 w-4" />}
              {t.wizard.buttons.back}
            </Button>

            {step < totalSteps ? (
              <Button
                size="lg"
                onClick={() => setStep(step + 1)}
                disabled={!isStepValid()}
              >
                {t.wizard.buttons.next}
                {isRTL ? <ArrowLeft className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={() => {
                  toast.success(t.wizard.buttons.finish, {
                    description: `${t.wizard.estimates.totalCost}: $${estimates.price} • ${t.wizard.estimates.timeframe}: ${estimates.time} ${t.wizard.estimates.days}`,
                  });
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                {t.wizard.buttons.startProject}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}