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
  
  const handleChatClick = () => {
    console.log('Chat button clicked!', { onChatClick: !!onChatClick });
    if (onChatClick) {
      onChatClick();
    } else {
      console.warn('onChatClick handler is not provided');
    }
  };
  
  return (
    <div className="flex items-center justify-evenly gap-2 md:gap-1 flex-1 md:flex-initial">
      {/* Mobile Chat Button - Only visible on mobile */}
      <Button
        onClick={handleChatClick}
        className="md:hidden h-11 w-11 p-2 rounded-full hover:bg-accent/50 transition-colors -pt-1"
        size="icon"
        variant="ghost"
        type="button"
      >
        <Image
          src="/robot.png"
          alt="Chat"
          width={36}
          height={36}
          className="h-9 w-9 object-contain pointer-events-none"
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
        <>
          {/* Mobile Login Icon */}
          <Link
            href={`/${locale}/login`}
            className="md:hidden h-11 w-11 p-2 flex items-center justify-center rounded-full hover:bg-accent/50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-6 w-6">
              <path 
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5" 
                d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"
              />
            </svg>
          </Link>
          {/* Desktop Login Text */}
          <Link
            href={`/${locale}/login`}
            className={cn(
              buttonVariants({ variant: "link"}),
              "hidden md:inline-flex text-sm px-2 py-1"
            )}
          >
            {t.common.login}
          </Link>
        </>
      )}
      <LanguageToggle />
      <ModeSwitcher />
    </div>
  );
}