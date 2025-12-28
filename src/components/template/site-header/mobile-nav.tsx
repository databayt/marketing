"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon, Languages } from "lucide-react"

import { cn } from "@/lib/utils"
import { useTranslations } from "@/lib/use-translations"
import { useSwitchLocaleHref } from "@/components/internationalization/use-locale"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { OptimizedImage } from "@/components/ui/optimized-image"
import type { Locale } from "@/components/internationalization/config"

export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { t, locale, isRTL } = useTranslations()
  const { setTheme, resolvedTheme } = useTheme()
  const switchLocaleHref = useSwitchLocaleHref()

  // Navigation items
  const navItems = React.useMemo(() => [
    { href: `/${locale}`, label: t.common?.home || "Home" },
    { href: `/${locale}/about`, label: t.common?.about || "About" },
    { href: `/${locale}/service`, label: t.common?.services || "Services" },
    { href: `/${locale}/pricing`, label: t.common?.pricing || "Pricing" },
    { href: `/${locale}/#`, label: t.common?.platform || "Platform" },
  ], [t, locale])

  // Toggle theme
  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  // Toggle language
  const toggleLanguage = React.useCallback(() => {
    const newLocale = locale === 'en' ? 'ar' : 'en'
    const href = switchLocaleHref(newLocale as Locale)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`
    router.push(href)
    setOpen(false)
  }, [locale, router, switchLocaleHref])

  // Navigate to chatbot
  const handleChatClick = React.useCallback(() => {
    router.push(`/${locale}/chatbot`)
    setOpen(false)
  }, [locale, router])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent",
            className
          )}
        >
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5"
                )}
              />
            </div>
            <span className="sr-only">{t.navigation?.toggleMenu || "Toggle Menu"}</span>
          </div>
          <span className="flex h-8 items-center text-lg leading-none font-medium">
            {t.navigation?.menu || "Menu"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/95 no-scrollbar h-[--radix-popper-available-height] w-[--radix-popper-available-width] overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur-md duration-100"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-8 overflow-auto px-6 py-6">
          {/* Logo + Brand */}
          <Link
            href={`/${locale}`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <OptimizedImage
              src="/marketing/site/logo.png"
              alt="Logo"
              width={28}
              height={28}
              className="dark:invert"
            />
            <span className="text-xl font-bold">{t.common?.brandName || "Databayt"}</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <div className="text-muted-foreground text-sm font-medium">
              {t.navigation?.menu || "Menu"}
            </div>
            <div className="flex flex-col gap-3">
              {navItems.map((item, index) => (
                <MobileLink
                  key={index}
                  href={item.href}
                  onOpenChange={setOpen}
                >
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>

          {/* Action Icons Row */}
          <div className="flex flex-col gap-4 pt-4 border-t border-border/50">
            <div className="text-muted-foreground text-sm font-medium">
              {t.common?.actions || "Actions"}
            </div>
            <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
              {/* Chat */}
              <button
                onClick={handleChatClick}
                className="h-12 w-12 rounded-full bg-muted/50 hover:bg-accent/50 transition-colors flex items-center justify-center"
              >
                <Image
                  src="/robot.png"
                  alt="Chat"
                  width={28}
                  height={28}
                  className={cn(
                    "h-7 w-7 object-contain pointer-events-none",
                    resolvedTheme === 'dark' && "invert"
                  )}
                />
              </button>

              {/* Login */}
              <Link
                href={`/${locale}/login`}
                onClick={() => setOpen(false)}
                className="h-12 w-12 rounded-full bg-muted/50 hover:bg-accent/50 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"
                  />
                </svg>
                <span className="sr-only">{t.common?.login || "Login"}</span>
              </Link>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="h-12 w-12 rounded-full bg-muted/50 hover:bg-accent/50 transition-colors flex items-center justify-center"
              >
                <Languages className="h-6 w-6" strokeWidth={1.5} />
                <span className="sr-only">{t.common?.toggleLanguage || "Toggle language"}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="h-12 w-12 rounded-full bg-muted/50 hover:bg-accent/50 transition-colors flex items-center justify-center"
              >
                {resolvedTheme === "dark" ? (
                  <SunIcon className="h-6 w-6" strokeWidth={1.5} />
                ) : (
                  <MoonIcon className="h-6 w-6" strokeWidth={1.5} />
                )}
                <span className="sr-only">{t.common?.toggleTheme || "Toggle theme"}</span>
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
}: {
  href: string
  onOpenChange?: (open: boolean) => void
  className?: string
  children: React.ReactNode
}) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href)
        onOpenChange?.(false)
      }}
      className={cn("text-2xl font-medium", className)}
    >
      {children}
    </Link>
  )
}
