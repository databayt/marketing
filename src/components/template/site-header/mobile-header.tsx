'use client'

import React from 'react'
import { MobileNav } from './mobile-nav'
import { ModeSwitcher } from './mode-switcher'
import { LanguageToggle } from '@/components/ui/language-toggle'

export default function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] md:hidden bg-background">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Left: Menu trigger */}
        <MobileNav />

        {/* Right: Language & Theme toggles (always visible, outside menu) */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ModeSwitcher />
        </div>
      </div>
    </header>
  )
}
