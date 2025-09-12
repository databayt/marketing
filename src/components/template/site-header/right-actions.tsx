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
    <div className="flex items-center gap-0.5 md:gap-1">
      {/* Mobile Chat Button - Only visible on mobile */}
      <Button
        onClick={handleChatClick}
        className="md:hidden h-10 w-10 p-2 rounded-full bg-transparent hover:bg-accent/50 transition-colors"
        size="icon"
        variant="ghost"
        type="button"
      >
        <Image
          src="/robot.png"
          alt="Chat"
          width={32}
          height={32}
          className="h-8 w-8 object-contain pointer-events-none"
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
            className="md:hidden h-10 w-10 p-2 flex items-center justify-center rounded-full hover:bg-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path 
                fill="currentColor" 
                d="M12.48 20q-.213 0-.356-.143t-.143-.357t.143-.357t.357-.143h5.904q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5h-5.903q-.214 0-.357-.143t-.143-.357t.143-.357t.357-.143h5.904q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm.407-7.5H4.5q-.213 0-.357-.143T4 12t.143-.357t.357-.143h8.387l-1.972-1.971q-.14-.14-.15-.338q-.01-.199.15-.364t.354-.168t.36.162l2.613 2.613q.242.243.242.566t-.242.566l-2.613 2.613q-.146.146-.347.153t-.367-.159q-.16-.165-.156-.357q.003-.191.162-.35z" 
                strokeWidth="0.5" 
                stroke="currentColor"
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