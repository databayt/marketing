'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WizardHeaderProps {
  locale: string;
  isRTL: boolean;
  title?: string;
  backText: string;
}

export const WizardHeader = ({ locale, title, backText }: WizardHeaderProps) => {
  return (
    <div className="h-16 flex-shrink-0 flex items-center px-4 md:px-6 relative">
      {/* Back link on the left — text only, no icon; sits near the top */}
      <Link
        href={`/${locale}`}
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'self-start -mt-4 px-2 text-muted-foreground hover:text-foreground'
        )}
      >
        {backText}
      </Link>

      {/* Title in the center */}
      {title && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl whitespace-nowrap">
            {title}
          </h1>
        </div>
      )}
    </div>
  );
};
