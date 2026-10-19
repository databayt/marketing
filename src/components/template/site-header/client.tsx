'use client'

import React, { useState, useEffect } from 'react'
import { MainNav } from './main-nav'
import { RightActions } from './right-actions'
import MobileHeader from './mobile-header'

interface SiteHeaderProps {
  isAuthenticated: boolean
  onChatClick?: () => void
  /** Keep the header out of sight; it appears only at the very top, once the visitor pushes upward there. */
  hideUntilScroll?: boolean
}

export default function SiteHeaderClient({ isAuthenticated, onChatClick, hideUntilScroll = false }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [revealed, setRevealed] = useState(!hideUntilScroll)

  useEffect(() => {
    let lastY = window.scrollY
    let touchY = 0

    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 400)
      if (!hideUntilScroll) return

      // Anywhere below the top hides it; arriving back at the top by scrolling up shows it.
      if (scrollTop > 0) setRevealed(false)
      else if (lastY > 0) setRevealed(true)
      lastY = scrollTop
    }

    // Already at the top (the hero edge): an upward push reveals, a downward one hides.
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY > 0) return
      if (e.deltaY < 0) setRevealed(true)
      else if (e.deltaY > 0) setRevealed(false)
    }
    const handleTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY }
    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 0) return
      if (e.touches[0].clientY - touchY > 10) setRevealed(true)
    }

    // Every load starts at the hero edge, not wherever the last visit left off.
    if (hideUntilScroll) {
      history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
      lastY = 0
    }
    setRevealed(!hideUntilScroll)
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (hideUntilScroll) {
      window.addEventListener('wheel', handleWheel, { passive: true })
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
    }
    return () => {
      if (hideUntilScroll) history.scrollRestoration = 'auto'
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [hideUntilScroll])

  const hidden = hideUntilScroll && !revealed
  const mobileHidden = hidden

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
      <MobileHeader hideUntilScroll={hideUntilScroll} hidden={mobileHidden} />
    </>
  )
}