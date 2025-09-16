'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WizardHeaderProps {
  locale: string;
  isRTL: boolean;
  title?: string;
  backText: string;
}

export const WizardHeader = ({ locale, isRTL, title, backText }: WizardHeaderProps) => {
  return (
    <div className="h-16 flex-shrink-0 flex items-center px-4 md:px-6 relative">
      {/* Back button on the left */}
      <Link
        href={`/${locale}`}
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'flex items-center gap-2'
        )}
      >
        {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        <span>{backText}</span>
      </Link>

      {/* Title in the center */}
      {title && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl">
            {title}
          </h1>
        </div>
      )}
    </div>
  );
};