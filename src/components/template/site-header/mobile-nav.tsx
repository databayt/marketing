import * as React from "react"
import Link from "next/link"
import { OptimizedImage } from '@/components/ui/optimized-image'
import { useTranslations } from "@/lib/use-translations"

import { MainNavItem } from "./type"
import { siteConfig } from "./constant"
import { cn } from "@/lib/utils"
import { useLockBody } from "./use-lock-body"

interface MobileNavProps {
  items: MainNavItem[]
  children?: React.ReactNode
  onClose?: () => void
}

export const MobileNav = React.forwardRef<HTMLDivElement, MobileNavProps>(
  ({ items, children, onClose }, ref) => {
    useLockBody()
    const { t, locale } = useTranslations()

    return (
      <div
        className={cn(
          "fixed inset-0 top-14 z-50 grid h-[calc(100vh-3.5rem)] grid-flow-row auto-rows-max overflow-auto shadow-md animate-in slide-in-from-bottom-80 md:hidden"
        )}
        onClick={onClose}
      >
        <div 
          ref={ref}
          className="relative z-20 grid gap-2 bg-popover text-popover-foreground shadow-md w-screen py-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo with Databayt text at the top of dropdown */}
          <Link 
            href={`/${locale}`} 
            onClick={onClose}
            className="flex items-center gap-3 px-6 py-3 border-b border-border/50"
          >
            <OptimizedImage 
              src="/marketing/site/logo.png" 
              alt="Logo" 
              width={32} 
              height={32} 
              className="dark:invert" 
            />
            <span className="text-xl font-bold">{t.common.brandName || "Databayt"}</span>
          </Link>
          
          <nav className="grid grid-flow-row auto-rows-max">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                onClick={onClose}
                className={cn(
                  "flex w-full items-center py-3 px-6 text-xl font-medium text-black dark:text-white hover:bg-muted transition-colors",
                  item.disabled && "cursor-not-allowed opacity-60"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          {children}
        </div>
      </div>
    )
  }
)

MobileNav.displayName = "MobileNav"