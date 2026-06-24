'use client';
import { useState } from 'react';
import { BusinessSelector } from '@/components/wizard/business';
import { FeatureSelector } from '@/components/wizard/feature';
import { TemplateSelector } from '@/components/wizard/template';
import { TypographySelector } from '@/components/wizard/typography';
import { IconSelector } from '@/components/wizard/icons';
import { StartDialog } from '@/components/wizard/start';
import { WizardHeader } from '@/components/template/wizard-header';
import { WizardFooter } from '@/components/template/wizard-footer';
import { businesses, getBusinessFeatures } from '@/components/wizard/constant';
import { WizardSelections } from '@/components/wizard/constant';
import ThemeSelector from '@/components/wizard/theme';
import { toast } from 'sonner';
import { useTranslations } from '@/lib/use-translations';

interface ExtendedWizardSelections extends WizardSelections {
  themeColor?: string;
  borderRadius?: number;
  shadow?: string;
  typography?: string;
  iconStyle?: string;
}

export default function SelectionWizard() {
  const { t, locale, isRTL } = useTranslations();
  const [step, setStep] = useState<number>(1);
  const [startOpen, setStartOpen] = useState(false);
  const [selections, setSelections] = useState<ExtendedWizardSelections>({
    business: '',
    features: [],
    template: '',
    themeColor: 'zinc',
    borderRadius: 0.5,
    shadow: 'sm',
  });

  // Steps: Business, Features, Template, Theme, Typography, Icons
  const totalSteps = 6;

  const calculateEstimates = (featureIds: string[] = selections.features) => {
    let totalPrice = 0;
    let totalTime = 0;

    const selectedBusiness = businesses.find((b) => b.id === selections.business);
    const featureList = selectedBusiness ? getBusinessFeatures(selectedBusiness) : [];
    featureIds.forEach((featureId) => {
      const feature = featureList.find((f) => f.id === featureId);
      if (feature) {
        totalPrice += feature.price;
        totalTime += feature.time;
      }
    });

    // Apply discounts for multiple features
    if (featureIds.length >= 5) {
      totalPrice = Math.round(totalPrice * 0.9); // 10% discount
    } else if (featureIds.length >= 3) {
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
      const featureList = selectedBusiness ? getBusinessFeatures(selectedBusiness) : [];
      const feature = featureList.find((f) => f.id === featureId);
      const estimates = calculateEstimates(updatedFeatures);

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
    // hold on the selection long enough to see the border land, then advance
    setTimeout(() => setStep(4), 700);
  };

  const handleThemeSelect = (color: string, radius: number, shadow: string) => {
    setSelections({
      ...selections,
      themeColor: color,
      borderRadius: radius,
      shadow,
    });
  };

  const handleIconSelect = (iconStyle: string) => {
    setSelections({ ...selections, iconStyle });
    // let the selection border land, then open the submit dialog
    setTimeout(() => setStartOpen(true), 700);
  };

  const estimates = calculateEstimates();
  const selectedBusiness = businesses.find((b) => b.id === selections.business);

  // Everything the user picked, formatted for the project request issue.
  const projectSummary = {
    business: selectedBusiness?.name ?? '',
    features: selectedBusiness
      ? getBusinessFeatures(selectedBusiness)
          .filter((f) => selections.features.includes(f.id))
          .map((f) => f.name)
      : [],
    template: selections.template
      ? selections.template.charAt(0).toUpperCase() + selections.template.slice(1)
      : '',
    theme: `${selections.themeColor ?? 'zinc'} · radius ${selections.borderRadius ?? 0.5} · shadow ${selections.shadow ?? 'sm'}`,
    typography: selections.typography ?? '',
    iconStyle: selections.iconStyle ?? '',
    price: estimates.price,
    time: estimates.time,
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return 'What business!';
      case 2: return 'What features!';
      case 3: return 'What template!';
      case 4: return 'What theme!';
      case 5: return 'What typography!';
      case 6: return 'What icons!';
      default: return '';
    }
  };

  const isStepValid = () => {
    switch(step) {
      case 1: return !!selections.business;
      case 2: return selections.features.length > 0;
      case 3: return !!selections.template;
      case 4: return true; // Theme is optional
      case 5: return true; // Typography is optional
      case 6: return true; // Icons is optional
      default: return false;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background pt-4 md:pt-8">
      {/* Header */}
      <WizardHeader
        locale={locale}
        isRTL={isRTL}
        title={getStepTitle()}
        backText={t.common.back}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden px-4 md:px-6 py-8 md:py-12">
        <div className="w-full max-w-6xl mx-auto h-full">
            {step === 1 && (
              <BusinessSelector
                businesses={businesses}
                selectedBusiness={selections.business}
                onSelect={handleBusinessSelect}
              />
            )}

            {step === 2 && selectedBusiness && (
              <FeatureSelector
                features={getBusinessFeatures(selectedBusiness)}
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
                selectedShadow={selections.shadow}
                onSelect={handleThemeSelect}
              />
            )}

            {step === 5 && (
              <TypographySelector
                selectedTypography={selections.typography}
                onSelect={(typography) => setSelections({ ...selections, typography })}
                locale={locale}
              />
            )}

            {step === 6 && (
              <div className="flex h-full items-center justify-center">
                <IconSelector
                  selectedStyle={selections.iconStyle}
                  onSelect={handleIconSelect}
                />
              </div>
            )}
        </div>
      </div>

      {/* Footer */}
      <WizardFooter
        currentStep={step}
        totalSteps={totalSteps}
        isRTL={isRTL}
        isStepValid={isStepValid()}
        onBack={() => step > 1 && setStep(step - 1)}
        onNext={() => setStep(step + 1)}
        onStart={() => setStartOpen(true)}
        prevText={t.wizard.buttons.prev}
        nextText={t.wizard.buttons.next}
        startText="Start"
      />

      <StartDialog
        open={startOpen}
        onOpenChange={setStartOpen}
        summary={projectSummary}
      />
    </div>
  );
}