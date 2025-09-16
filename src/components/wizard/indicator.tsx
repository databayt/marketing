
// components/StepIndicator.tsx
type StepIndicatorProps = {
    currentStep: number;
    totalSteps: number;
  };
  
  export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
    return (
      <div className="flex justify-center gap-1">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentStep >= i + 1 ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    );
  };