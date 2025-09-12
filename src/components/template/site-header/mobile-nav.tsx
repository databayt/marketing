import * as React from "react"
import Link from "next/link"
import { OptimizedImage } from '@/components/ui/optimized-image'

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

    return (
      <div
        className={cn(
          "fixed inset-0 top-14 z-50 grid h-[calc(100vh-3.5rem)] grid-flow-row auto-rows-max overflow-auto shadow-md animate-in slide-in-from-bottom-80 md:hidden"
        )}
        onClick={onClose}
      >
        <div 
          ref={ref}
          className="relative z-20 grid gap-6 bg-popover text-popover-foreground shadow-md w-screen py-6 px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <Link href="/" className="flex items-center space-x-3">
            <OptimizedImage src="/marketing/site/logo.png" alt="Logo" width={20} height={20} className="dark:invert" />
            <span className="font-bold text-base">{siteConfig.name}</span>
          </Link>
          <nav className="grid grid-flow-row auto-rows-max text-base">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                onClick={onClose}
                className={cn(
                  "flex w-full items-center rounded-md p-3 text-base font-medium hover:underline",
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