'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type TemplateSelectorProps = {
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
};

export const TemplateSelector = ({
  selectedTemplate,
  onSelect
}: TemplateSelectorProps) => {

  // Using placeholder images from projects for now
  const templates = [
    {
      id: 'minimal',
      name: 'Minimal',
      imagePath: '/project/codebase.jpg',
      description: 'Clean and simple design'
    },
    {
      id: 'modern',
      name: 'Modern',
      imagePath: '/project/education.jpg',
      description: 'Contemporary and sleek'
    },
    {
      id: 'classic',
      name: 'Classic',
      imagePath: '/project/codebase.jpg',
      description: 'Timeless and elegant'
    },
    {
      id: 'creative',
      name: 'Creative',
      imagePath: '/project/education.jpg',
      description: 'Bold and innovative'
    }
  ];

  const getImageUrl = (imagePath: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/databayt';
    return `${baseUrl}${imagePath}?tr=w-400,h-250,q-80`;
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="grid grid-cols-4 gap-4 px-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={cn(
              "relative cursor-pointer group overflow-hidden rounded-lg border-2 transition-all duration-200",
              selectedTemplate === template.id
                ? "border-primary shadow-lg scale-[1.02]"
                : "border-muted hover:border-muted-foreground/50 hover:shadow-md"
            )}
          >
            {/* Selection indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground rounded-full p-1">
                <Check className="w-4 h-4" />
              </div>
            )}

            {/* Template image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src={getImageUrl(template.imagePath)}
                alt={`${template.name} template`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="25vw"
              />
            </div>

            {/* Template info */}
            <div className="p-2">
              <h3 className="font-medium text-sm">{template.name}</h3>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};