"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { cn } from "@/lib/utils"
import { OptimizedImage } from '@/components/ui/optimized-image'
import { useTranslations } from "@/lib/use-translations"

export function MainNav() {
  const segment = useSelectedLayoutSegment()
  const { t, locale } = useTranslations()

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

  return (
    <div className="hidden md:flex gap-6 md:gap-10">
      <Link href={`/${locale}`} className="flex items-center gap-2">
        <OptimizedImage src="/marketing/site/logo.png" alt="Logo" width={16} height={16} className="dark:invert" />
        <span className="hidden font-bold sm:inline-block">
          {t.common.brandName}
        </span>
      </Link>
      <nav className="flex gap-1">
        {localizedItems?.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "h-8 px-3 text-sm font-medium rounded-md flex items-center transition-colors hover:bg-accent hover:text-accent-foreground",
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
  )
}
