import { Feature } from '@/components/wizard/constant';

type FeatureSelectorProps = {
  features: Feature[];
  selectedFeatures: string[];
  onToggle: (featureId: string) => void;
  businessName: string;
};

export const FeatureSelector = ({
  features,
  selectedFeatures,
  onToggle,
}: FeatureSelectorProps) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {features.map(({ id, name, popularity }) => (
          <span
            key={id}
            className={`cursor-pointer hover:opacity-100 ${
              selectedFeatures.includes(id)
                ? 'text-blue-800 underline opacity-100'
                : 'text-gray-700 opacity-50'
            }`}
            style={{
              fontSize: `${0.6 + (popularity || 5) / 15}rem`,
            }}
            onClick={() => onToggle(id)}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};
