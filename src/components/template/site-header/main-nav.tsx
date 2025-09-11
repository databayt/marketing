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
    <div className="flex gap-6 md:gap-10">
      <Link href={`/${locale}`} className="hidden items-center gap-2 md:flex">
        <OptimizedImage src="/marketing/site/logo.png" alt="Hogwarts Logo" width={16} height={16} className="dark:invert -mt-1" />
        <span className="hidden font-bold sm:inline-block  ">
          {t.common.brandName}
        </span>
      </Link>
      <nav className="hidden gap-6 md:flex">
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
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <OptimizedImage src="/marketing/site/logo.png" alt="Menu" width={16} height={16} className="dark:invert" />}
        <span className="font-bold text-sm">{t.navigation.menu}</span>
      </button>
      {showMobileMenu && (
        <MobileNav items={localizedItems} onClose={() => setShowMobileMenu(false)} ref={mobileMenuRef}>{children}</MobileNav>
      )}
    </div>
  )
}