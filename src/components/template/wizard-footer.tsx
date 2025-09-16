'use client';

import { Button } from '@/components/ui/button';
import { StepIndicator } from '@/components/wizard/indicator';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  isRTL: boolean;
  isStepValid: boolean;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  backText: string;
  nextText: string;
  finishText: string;
}

export const WizardFooter = ({
  currentStep,
  totalSteps,
  isRTL,
  isStepValid,
  onBack,
  onNext,
  onFinish,
  backText,
  nextText,
  finishText,
}: WizardFooterProps) => {
  return (
    <div className="h-16 flex-shrink-0 flex flex-col justify-center px-4 md:px-6 space-y-2">
      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          disabled={currentStep === 1}
        >
          {isRTL ? <ArrowRight className="mr-2 h-4 w-4" /> : <ArrowLeft className="mr-2 h-4 w-4" />}
          {backText}
        </Button>

        {currentStep < totalSteps ? (
          <Button
            size="sm"
            onClick={onNext}
            disabled={!isStepValid}
          >
            {nextText}
            {isRTL ? <ArrowLeft className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={onFinish}
          >
            <Check className="mr-2 h-4 w-4" />
            {finishText}
          </Button>
        )}
      </div>
    </div>
  );
};