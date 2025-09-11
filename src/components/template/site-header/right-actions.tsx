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
    <div className="flex items-center">
      {isAuthenticated ? (
        <Button
          variant="link"
          asChild
        >
          {/* <LogoutButton>{t.common.logout}</LogoutButton> */}
        </Button>
      ) : (
        <Link
          href={`/${locale}/login`}
          className={cn(
            buttonVariants({ variant: "link"}),
            
          )}
        >
          {t.common.login}
        </Link>
      )}
      <LanguageToggle />
      <ModeSwitcher />
    </div>
  );
}