"use client";

import React from "react";
import { GradientAnimation } from "@/components/atom/gradient-animation";
import { Button } from "../ui/button";
import { useTranslations } from '@/lib/use-translations';

export function Ready() {
  const { isRTL, t } = useTranslations();
  return (
    <div className="full-bleed-enhanced">
    <GradientAnimation height="h-[70vh]">
      <div className="absolute inset-0">
        <div className="text-center pt-16">
          <h1 className="text-4xl font-bold text-primary-foreground dark:invert">
            {t.marketing.ready.title}
          </h1>
          <p className="py-4 max-w-2xl mx-auto text-primary-foreground/80 dark:invert">
            {t.marketing.ready.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 max-w-xs md:max-w-2xl mx-auto">
            <Button  size="lg" className="bg-background text-primary dark:invert hover:bg-background/80">
              {t.marketing.ready.startJourney}
            </Button>
            <Button  variant="outline" size="lg" className="bg-transparent text-background hover:text-background/80 border-background dark:invert">
              {t.marketing.ready.scheduleMeeting}
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
