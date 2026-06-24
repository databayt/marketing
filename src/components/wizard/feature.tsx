'use client';

import { Feature } from '@/components/wizard/constant';
import { cn } from '@/lib/utils';

type FeatureSelectorProps = {
  features: Feature[];
  selectedFeatures: string[];
  onToggle: (featureId: string) => void;
  businessName: string;
};

// Deterministic 0..1 from a string — stable per-tag jitter for an organic cloud.
const hash01 = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return (h % 1000) / 1000;
};

export const FeatureSelector = ({
  features,
  selectedFeatures,
  onToggle,
  businessName,
}: FeatureSelectorProps) => {
  const pops = features.map((f) => f.popularity ?? 5);
  const min = Math.min(...pops);
  const max = Math.max(...pops);
  const count = selectedFeatures.length;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10">
      {/* Context chip — surfaces which business these features belong to */}
      <div className="rounded-full border bg-muted/40 px-4 py-1.5 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{businessName}</span>
        {count > 0 && (
          <span>
            {' · '}
            {count} feature{count > 1 ? 's' : ''} selected
          </span>
        )}
      </div>

      {/* Feature cloud — multi-select, size & opacity scale with popularity */}
      <div className="flex w-4/5 max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        {features.map((f) => {
          const pop = f.popularity ?? 5;
          const isSelected = selectedFeatures.includes(f.id);
          const t = max === min ? 0.5 : (pop - min) / (max - min);
          const size = 0.85 + t * 1.35 + (hash01(f.id) - 0.5) * 0.3;
          const base = 0.35 + t * 0.5 + (hash01(f.id + 'o') - 0.5) * 0.12;
          const opacity = isSelected
            ? 1
            : Math.min(0.95, Math.max(0.35, base));

          return (
            <span
              key={f.id}
              onClick={() => onToggle(f.id)}
              title={f.description}
              style={
                { fontSize: `${size}rem`, '--o': opacity } as React.CSSProperties
              }
              className={cn(
                'cursor-pointer leading-tight opacity-[var(--o)] transition-all duration-200 hover:opacity-100',
                isSelected
                  ? 'font-medium text-blue-700 underline decoration-2 underline-offset-4 dark:text-blue-400'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {f.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};
