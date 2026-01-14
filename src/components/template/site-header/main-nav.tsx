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
        <OptimizedImage src="/marketing/site/logo.png" alt="Logo" width={16} height={16} className="dark:invert pt-0.5" />
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
  )
}
