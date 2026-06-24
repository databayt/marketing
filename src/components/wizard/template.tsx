'use client';

import { cn } from '@/lib/utils';

type TemplateSelectorProps = {
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
};

const templates = ['minimal', 'modern', 'classic', 'creative'] as const;

/**
 * Pure, text-free wireframe previews — each one expresses a layout archetype
 * using nothing but neutral skeleton blocks so the shape does the talking.
 */
const TemplateMock = ({ id }: { id: string }) => {
  switch (id) {
    case 'minimal':
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 p-5">
          <div className="h-1.5 w-8 rounded-full bg-foreground/20" />
          <div className="mt-4 h-2 w-20 rounded-full bg-foreground/15" />
          <div className="h-1.5 w-12 rounded-full bg-foreground/10" />
          <div className="mt-3 h-5 w-14 rounded-md bg-foreground/20" />
        </div>
      );
    case 'modern':
      return (
        <div className="flex h-full w-full flex-col gap-2 p-3">
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/30" />
            <div className="flex gap-1">
              <div className="h-1.5 w-4 rounded-full bg-foreground/10" />
              <div className="h-1.5 w-4 rounded-full bg-foreground/10" />
              <div className="h-1.5 w-4 rounded-full bg-foreground/10" />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-1 rounded-lg bg-foreground/15 p-2">
            <div className="h-1.5 w-1/2 rounded-full bg-background/70" />
            <div className="h-1.5 w-1/3 rounded-full bg-background/50" />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-6 rounded-md bg-foreground/10" />
            <div className="h-6 rounded-md bg-foreground/10" />
            <div className="h-6 rounded-md bg-foreground/10" />
          </div>
        </div>
      );
    case 'classic':
      return (
        <div className="flex h-full w-full flex-col items-center gap-2 p-4">
          <div className="h-2 w-12 rounded-full bg-foreground/25" />
          <div className="h-px w-full bg-border" />
          <div className="mt-1 flex flex-col items-center gap-1.5">
            <div className="h-2 w-24 rounded-full bg-foreground/15" />
            <div className="h-1.5 w-16 rounded-full bg-foreground/10" />
          </div>
          <div className="mt-2 grid w-full grid-cols-2 gap-3">
            {[0, 1].map((col) => (
              <div key={col} className="space-y-1.5">
                <div className="h-1 w-full rounded-full bg-foreground/10" />
                <div className="h-1 w-full rounded-full bg-foreground/10" />
                <div className="h-1 w-4/5 rounded-full bg-foreground/10" />
              </div>
            ))}
          </div>
        </div>
      );
    case 'creative':
      return (
        <div className="relative h-full w-full overflow-hidden p-3">
          <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-primary/25" />
          <div className="absolute right-3 top-4 h-10 w-10 rotate-12 rounded-lg bg-foreground/15" />
          <div className="absolute bottom-7 left-4 h-2 w-16 -rotate-6 rounded-full bg-foreground/25" />
          <div className="absolute bottom-4 left-4 h-2 w-10 -rotate-6 rounded-full bg-foreground/10" />
          <div className="absolute bottom-3 right-5 h-7 w-7 rounded-full border-2 border-foreground/20" />
        </div>
      );
    default:
      return null;
  }
};

export const TemplateSelector = ({
  selectedTemplate,
  onSelect,
}: TemplateSelectorProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
        {templates.map((id) => {
          const isActive = selectedTemplate === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              aria-pressed={isActive}
              className={cn(
                'aspect-[4/3] overflow-hidden rounded-xl border-2 bg-background transition-colors duration-200',
                isActive
                  ? 'border-foreground'
                  : 'border-border hover:border-muted-foreground/40'
              )}
            >
              <TemplateMock id={id} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
