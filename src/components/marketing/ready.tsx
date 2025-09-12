"use client";

import React from "react";
import { GradientAnimation } from "@/components/atom/gradient-animation";
import { Button } from "../ui/button";
import type { getDictionary } from '@/components/internationalization/dictionaries';
import type { Locale } from '@/components/internationalization/config';
import { localeConfig } from '@/components/internationalization/config';

interface ReadyProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['marketing']['ready'];
  params: { lang: Locale };
}

export function Ready({ dictionary, params }: ReadyProps) {
  const t = dictionary;
  const isRTL = localeConfig[params.lang]?.dir === 'rtl';
  return (
    <div className="full-bleed-enhanced">
    <GradientAnimation height="h-[70vh]">
      <div className="absolute z-50 inset-0 flex items-center justify-center px-6 py-8 md:px-0 md:py-0">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-foreground dark:invert">
            {t.title}
          </h1>
          <p className="py-4 max-w-2xl mx-auto text-primary-foreground/80 dark:invert">
            {t.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 max-w-xs md:max-w-2xl mx-auto">
            <Button  size="lg" className="bg-background text-primary dark:invert hover:bg-background/80">
              {t.startJourney}
            </Button>
            <Button  variant="outline" size="lg" className="bg-transparent text-background hover:text-background/80 border-background dark:invert">
              {t.scheduleMeeting}
            </Button>
          </div>
          {/* <p className="flex items-center justify-center gap-2 text-primary-foreground/80 pt-4">
            <AlertTriangle className="h-4 w-4" />
            Application deadline: March 31st • Rolling admissions available
          </p> */}
        </div>
      </div>
    </GradientAnimation>
    </div>
  );
}
