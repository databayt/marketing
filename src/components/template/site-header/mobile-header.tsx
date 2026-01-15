'use client'

import React from 'react'
import { MobileNav } from './mobile-nav'
import { ModeSwitcher } from './mode-switcher'
import { LanguageToggle } from '@/components/ui/language-toggle'

export default function MobileHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <MobileNav />
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ModeSwitcher />
        </div>
      </div>
    </header>
  )
}
