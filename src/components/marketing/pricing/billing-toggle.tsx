"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { useTranslations } from '@/lib/use-translations';

interface BillingToggleProps {
  isYearly: boolean;
  onChange: (isYearly: boolean) => void;
}

export function BillingToggle({ isYearly, onChange }: BillingToggleProps) {
  const { t, locale } = useTranslations();
  const isArabic = locale === 'ar';
  
  const monthlyButton = (
    <ToggleGroupItem
      value="monthly"
      className={cn(
        "z-20 h-9 w-full justify-center rounded-md data-[state=on]:bg-transparent hover:bg-background",
        "min-w-[80px] px-3 md:min-w-[148px] md:px-6",
        isYearly ? "text-muted-foreground hover:text-foreground" : "text-foreground",
      )}
      aria-label="Toggle monthly billing"
    >
      {t.marketing.pricing.constants.monthly.toUpperCase()}
    </ToggleGroupItem>
  );
  
  const yearlyButton = (
    <ToggleGroupItem
      value="yearly"
      className={cn(
        "z-20 h-9 w-full justify-center rounded-md data-[state=on]:bg-transparent hover:bg-background",
        "min-w-[80px] px-3 md:min-w-[148px] md:px-6",
        isYearly ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
      aria-label="Toggle yearly billing"
    >
      {t.marketing.pricing.constants.yearly.toUpperCase()}
    </ToggleGroupItem>
  );
  
  return (
    <div className="mb-4 mt-10 flex items-center gap-5 ">
      <ToggleGroup
        type="single"
        size="sm"
        value={isYearly ? "yearly" : "monthly"}
        onValueChange={(val) => {
          if (!val) return; // ignore clearing
          onChange(val === "yearly");
        }}
        aria-label="toggle-year"
        className="relative grid h-9 grid-cols-2 overflow-hidden rounded-md border bg-background p-0"
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-1/2 rounded-md bg-muted transition-transform duration-200 ease-out",
            isArabic 
              ? (isYearly ? "translate-x-0" : "translate-x-full")
              : (isYearly ? "translate-x-full" : "translate-x-0"),
          )}
        />
        {isArabic ? (
          <>
            {yearlyButton}
            {monthlyButton}
          </>
        ) : (
          <>
            {monthlyButton}
            {yearlyButton}
          </>
        )}
      </ToggleGroup>
    </div>
  );
}


