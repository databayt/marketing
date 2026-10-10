'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { MobileNav } from './mobile-nav'

interface MobileHeaderProps {
  /** Float over the page (fixed) instead of taking space, so it can slide in. */
  hideUntilScroll?: boolean
  hidden?: boolean
}

export default function MobileHeader({ hideUntilScroll = false, hidden = false }: MobileHeaderProps) {
  return (
    <header
      className={cn(
        'bg-background top-0 z-[9999] w-screen md:hidden px-3 sm:px-10',
        hideUntilScroll
          ? 'fixed inset-x-0 transition-[translate,opacity] duration-500 ease-out'
          : 'sticky -mx-3 sm:-mx-10',
        hidden && '-translate-y-full opacity-0 pointer-events-none'
      )}
    >
      <div className="flex h-14 items-center">
        <MobileNav />
      </div>
    </header>
  )
}
