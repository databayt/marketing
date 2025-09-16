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
    <div className="h-full flex flex-col">
      <h2 className="font-heading text-3xl leading-[1.1] sm:text-2xl md:text-5xl absolute left-1/2 -translate-x-1/2 top-0">
        What Features!
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-4 flex-1 pt-16">
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
