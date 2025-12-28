'use client'

import React, { useState, useEffect } from 'react'
import { MainNav } from './main-nav'
import { RightActions } from './right-actions'
import MobileHeader from './mobile-header'

interface SiteHeaderProps {
  isAuthenticated: boolean
  onChatClick?: () => void
}

export default function SiteHeaderClient({ isAuthenticated, onChatClick }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Desktop Header - Animated */}
      <header 
        className={`
          fixed z-80 left-1/2 transform -translate-x-1/2 w-full hidden md:block
          transition-[top] duration-700 ease-linear
          ${isScrolled ? 'top-0' : 'top-4'}
        `}
      >
        <div className={`
          transition-[width,max-width,background-color,border-radius,box-shadow,opacity] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          ${isScrolled 
            ? 'w-full bg-background/95 backdrop-blur-sm rounded-none shadow-none opacity-100' 
            : 'w-fit mx-auto bg-muted rounded-2xl shadow-sm opacity-90'
          }
        `}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex h-12 items-center justify-center gap-4">
              <MainNav />
              <RightActions isAuthenticated={isAuthenticated} onChatClick={onChatClick} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header - Completely Separate */}
      <MobileHeader />
    </>
  )
}