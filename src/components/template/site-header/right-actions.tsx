'use client';

import { ModeSwitcher } from './mode-switcher'
import { LanguageToggle } from '@/components/ui/language-toggle'
// import { LogoutButton } from '@/components/auth/logout-button'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useTranslations } from '@/lib/use-translations'

interface RightActionsProps {
  isAuthenticated: boolean;
}

export function RightActions({ isAuthenticated }: RightActionsProps) {
  const { t, locale } = useTranslations()
  
  return (
    <div className="flex items-center gap-1 md:gap-1">
      {isAuthenticated ? (
        <Button
          variant="link"
          asChild
          className="text-base md:text-sm px-3 py-2 md:px-2 md:py-1"
        >
          {/* <LogoutButton>{t.common.logout}</LogoutButton> */}
        </Button>
      ) : (
        <Link
          href={`/${locale}/login`}
          className={cn(
            buttonVariants({ variant: "link"}),
            "text-base md:text-sm px-3 py-2 md:px-2 md:py-1"
          )}
        >
          {t.common.login}
        </Link>
      )}
      <div className="p-1"><LanguageToggle /></div>
      <div className="p-1"><ModeSwitcher /></div>
    </div>
  );
}