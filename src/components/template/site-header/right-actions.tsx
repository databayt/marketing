'use client';

import { ModeSwitcher } from './mode-switcher'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useTranslations } from '@/lib/use-translations'

interface RightActionsProps {
  isAuthenticated: boolean;
  onChatClick?: () => void;
}

export function RightActions({ isAuthenticated, onChatClick }: RightActionsProps) {
  const { t, locale } = useTranslations()

  return (
    <div className="hidden md:flex items-center gap-1">
      {isAuthenticated ? (
        <span className="text-sm px-3 py-1.5">
          {/* Authenticated user actions */}
        </span>
      ) : (
        <Link
          href={`/${locale}/login`}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "h-8 px-3 text-sm font-medium"
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
