'use client';

import { ModeSwitcher } from './mode-switcher'
import { LanguageToggle } from '@/components/ui/language-toggle'
// import { LogoutButton } from '@/components/auth/logout-button'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface RightActionsProps {
  isAuthenticated: boolean;
}

export function RightActions({ isAuthenticated }: RightActionsProps) {
  return (
    <div className="flex items-center">
      {isAuthenticated ? (
        <Button
          variant="link"
          asChild
        >
          {/* <LogoutButton>Logout</LogoutButton> */}
        </Button>
      ) : (
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "link"}),
            
          )}
        >
          Login
        </Link>
      )}
      <LanguageToggle />
      <ModeSwitcher />
    </div>
  );
}