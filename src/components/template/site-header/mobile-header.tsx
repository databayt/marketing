'use client'

import React from 'react'
import { MainNav } from './main-nav'
import { marketingConfig } from './constant'
import { RightActions } from './right-actions'

interface MobileHeaderProps {
  isAuthenticated: boolean
  onChatClick?: () => void
}

export default function MobileHeader({ isAuthenticated, onChatClick }: MobileHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] md:hidden bg-background border-b border-border">
      <div className="flex h-14 items-center px-8">
        <div className="flex items-center justify-between w-full">
          <MainNav items={marketingConfig.mainNav} />
          <RightActions isAuthenticated={isAuthenticated} onChatClick={onChatClick} />
        </div>
      </div>
    </header>
  )
}