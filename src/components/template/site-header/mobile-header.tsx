'use client'

import React from 'react'
import { MobileNav } from './mobile-nav'

export default function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] md:hidden bg-background">
      <div className="flex h-14 items-center px-4">
        <MobileNav />
      </div>
    </header>
  )
}
