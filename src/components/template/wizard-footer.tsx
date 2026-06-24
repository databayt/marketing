'use client';

import { Button } from '@/components/ui/button';
import { StepIndicator } from '@/components/wizard/indicator';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  isRTL: boolean;
  isStepValid: boolean;
  onBack: () => void;
  onNext: () => void;
  prevText: string;
  nextText: string;
}

export const WizardFooter = ({
  currentStep,
  totalSteps,
  isRTL,
  isStepValid,
  onBack,
  onNext,
  prevText,
  nextText,
}: WizardFooterProps) => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center px-4 md:px-6 py-6 gap-7">
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
          {isRTL ? <ArrowRight className="me-2 h-4 w-4" /> : <ArrowLeft className="me-2 h-4 w-4" />}
          {prevText}
        </Button>

        {currentStep < totalSteps && (
          <Button size="sm" onClick={onNext} disabled={!isStepValid}>
            {nextText}
            {isRTL ? <ArrowLeft className="ms-2 h-4 w-4" /> : <ArrowRight className="ms-2 h-4 w-4" />}
          </Button>
        )}
      </div>
    </div>
  );
};
