'use client'

import React from 'react'
import { MobileNav } from './mobile-nav'

export default function MobileHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 w-screen md:hidden -mx-3 sm:-mx-10 px-3 sm:px-10">
      <div className="flex h-14 items-center">
        <MobileNav />
      </div>
    </header>
  )
}
