"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment, useParams } from "next/navigation"
import { MainNavItem } from "./type"
import { siteConfig } from "./constant"
import { cn } from "@/lib/utils"
import { Icons } from "./icons"
import { MobileNav } from "./mobile-nav"
import { OptimizedImage } from '@/components/ui/optimized-image'
import { useTranslations } from "@/lib/use-translations"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const { t, locale } = useTranslations()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const mobileMenuRef = React.useRef<HTMLDivElement>(null)

  // Create localized navigation items
  const localizedItems = React.useMemo(() => [
    {
      title: t.common.about,
      href: `/${locale}/about`,
    },
    {
      title: t.common.services,
      href: `/${locale}/service`,
    },
    {
      title: t.common.pricing,
      href: `/${locale}/pricing`,
    },
    {
      title: t.common.platform,
      href: `/${locale}/#`,
    },
  ], [t, locale])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false)
      }
    }

    if (showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMobileMenu])

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6 md:gap-10">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <OptimizedImage src="/marketing/site/logo.png" alt="Hogwarts Logo" width={16} height={16} className="dark:invert -mt-1" />
          <span className="hidden font-bold sm:inline-block">
            {t.common.brandName}
          </span>
        </Link>
        <nav className="flex gap-6">
          {localizedItems?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.includes(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div className="flex items-center gap-2 md:hidden">
        {/* Mobile Logo - Links to homepage */}
        <Link href={`/${locale}`} className="flex items-center justify-center h-8 w-8">
          <OptimizedImage src="/marketing/site/logo.png" alt="Logo" width={18} height={18} className="dark:invert" />
        </Link>
        
        {/* Mobile Menu Button with Hamburger Icon */}
        <button
          className="flex items-center justify-center h-10 w-10"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                d="M18 6L6 18M6 6l12 12"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      {showMobileMenu && (
        <MobileNav items={localizedItems} onClose={() => setShowMobileMenu(false)} ref={mobileMenuRef}>{children}</MobileNav>
      )}
    </>
  )
}