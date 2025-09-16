'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type TypographySelectorProps = {
  selectedTypography?: string;
  onSelect: (typographyId: string) => void;
  locale: string;
};

export const TypographySelector = ({
  selectedTypography,
  onSelect,
  locale
}: TypographySelectorProps) => {

  // Typography options with placeholder images
  const typographyOptions = {
    en: [
      {
        id: 'inter',
        name: 'Inter',
        imagePath: '/typography/inter.png',
        description: 'Clean and modern'
      },
      {
        id: 'roboto',
        name: 'Roboto',
        imagePath: '/typography/roboto.png',
        description: 'Google\'s signature font'
      },
      {
        id: 'poppins',
        name: 'Poppins',
        imagePath: '/typography/poppins.png',
        description: 'Geometric and friendly'
      },
      {
        id: 'playfair',
        name: 'Playfair Display',
        imagePath: '/typography/playfair.png',
        description: 'Elegant serif'
      }
    ],
    ar: [
      {
        id: 'noto-arabic',
        name: 'Noto Sans Arabic',
        imagePath: '/typography/noto-arabic.png',
        description: 'واضح وحديث'
      },
      {
        id: 'cairo',
        name: 'Cairo',
        imagePath: '/typography/cairo.png',
        description: 'هندسي وودود'
      },
      {
        id: 'amiri',
        name: 'Amiri',
        imagePath: '/typography/amiri.png',
        description: 'كلاسيكي وأنيق'
      },
      {
        id: 'tajawal',
        name: 'Tajawal',
        imagePath: '/typography/tajawal.png',
        description: 'بسيط ومعاصر'
      }
    ]
  };

  const getImageUrl = (imagePath: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/databayt';
    // For now, using placeholder images
    return `${baseUrl}/project/codebase.jpg?tr=w-300,h-200,q-80`;
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="font-heading text-3xl leading-[1.1] sm:text-2xl md:text-5xl absolute left-1/2 -translate-x-1/2 top-0">
        What typography!
      </h2>
      <div className="space-y-4 pt-16 overflow-auto">
        {/* English Fonts */}
        <div>
          <h3 className="text-lg font-semibold mb-4">English Fonts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {typographyOptions.en.map((font) => (
              <div
                key={font.id}
                onClick={() => onSelect(font.id)}
                className={cn(
                  "relative cursor-pointer group overflow-hidden rounded-lg border-2 transition-all duration-200",
                  selectedTypography === font.id
                    ? "border-primary shadow-lg"
                    : "border-muted hover:border-muted-foreground/50 hover:shadow-md"
                )}
              >
                {/* Selection indicator */}
                {selectedTypography === font.id && (
                  <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </div>
                )}

                {/* Font preview image */}
                <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className={`text-2xl font-bold`} style={{ fontFamily: font.name }}>
                      Aa
                    </div>
                  </div>
                </div>

                {/* Font info */}
                <div className="p-3 bg-background">
                  <h4 className="font-medium text-sm">{font.name}</h4>
                  <p className="text-xs text-muted-foreground">{font.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arabic Fonts */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Arabic Fonts / خطوط عربية</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {typographyOptions.ar.map((font) => (
              <div
                key={font.id}
                onClick={() => onSelect(font.id)}
                className={cn(
                  "relative cursor-pointer group overflow-hidden rounded-lg border-2 transition-all duration-200",
                  selectedTypography === font.id
                    ? "border-primary shadow-lg"
                    : "border-muted hover:border-muted-foreground/50 hover:shadow-md"
                )}
              >
                {/* Selection indicator */}
                {selectedTypography === font.id && (
                  <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </div>
                )}

                {/* Font preview */}
                <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="text-2xl font-bold" dir="rtl">
                      أبجد
                    </div>
                  </div>
                </div>

                {/* Font info */}
                <div className="p-3 bg-background">
                  <h4 className="font-medium text-sm">{font.name}</h4>
                  <p className="text-xs text-muted-foreground">{font.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};