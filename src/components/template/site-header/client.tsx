'use client'

import React, { useState, useEffect } from 'react'
import { MainNav } from './main-nav'
import { RightActions } from './right-actions'
import MobileHeader from './mobile-header'

interface SiteHeaderProps {
  isAuthenticated: boolean
  onChatClick?: () => void
  /** Keep the header out of sight over the hero; it slides in shortly after scrolling starts. */
  hideUntilScroll?: boolean
}

const REVEAL_DELAY_MS = 350

export default function SiteHeaderClient({ isAuthenticated, onChatClick, hideUntilScroll = false }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [revealed, setRevealed] = useState(!hideUntilScroll)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 400)

      if (!hideUntilScroll) return
      if (scrollTop > 0) {
        if (timer === undefined) {
          timer = setTimeout(() => setRevealed(true), REVEAL_DELAY_MS)
        }
      } else {
        clearTimeout(timer)
        timer = undefined
        setRevealed(false)
      }
    }

    setRevealed(!hideUntilScroll || window.scrollY > 0)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hideUntilScroll])

  const hidden = hideUntilScroll && !revealed

  return (
    <>
      {/* Desktop Header - Animated */}
      <header 
        className={`
          fixed z-80 left-1/2 transform -translate-x-1/2 w-full hidden md:block
          transition-[top,translate,opacity] duration-700 ease-linear
          ${isScrolled ? 'top-0' : 'top-4'}
          ${hidden ? '-translate-y-[150%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}
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
      <MobileHeader hideUntilScroll={hideUntilScroll} hidden={hidden} />
    </>
  )
}