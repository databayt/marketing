'use client';

import Image from 'next/image'
import { ModeSwitcher } from './mode-switcher'
import { LanguageToggle } from '@/components/ui/language-toggle'
// import { LogoutButton } from '@/components/auth/logout-button'
import { Button, buttonVariants } from '@/components/ui/button'
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
    <div className="flex items-center gap-1 md:gap-1">
      {/* Mobile Chat Button - Only visible on mobile */}
      <Button
        onClick={onChatClick}
        className="md:hidden h-10 w-10 p-1.5 rounded-full bg-transparent hover:bg-transparent"
        size="icon"
        variant="ghost"
      >
        <Image
          src="/robot.png"
          alt="Chat"
          width={32}
          height={32}
          className="h-full w-full object-contain"
        />
      </Button>
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