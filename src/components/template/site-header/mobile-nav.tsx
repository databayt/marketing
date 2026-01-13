"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTranslations } from "@/lib/use-translations"

export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const { t, locale } = useTranslations()

  const navItems = React.useMemo(() => [
    { href: `/${locale}`, label: t.common?.home || "Home" },
    { href: `/${locale}/about`, label: t.common?.about || "About" },
    { href: `/${locale}/service`, label: t.common?.services || "Services" },
    { href: `/${locale}/pricing`, label: t.common?.pricing || "Pricing" },
    { href: `/${locale}/#`, label: t.common?.platform || "Platform" },
  ], [t, locale])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent z-50",
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
        className="fixed! inset-0! top-14! z-50 h-[calc(100vh-3.5rem)]! w-screen! max-w-none! bg-background overflow-y-auto rounded-none border-none p-0 shadow-none duration-100"
        align="start"
        side="bottom"
        sideOffset={0}
      >
        <div className="flex flex-col gap-12 overflow-auto px-4 py-8">
          <div className="flex flex-col gap-4">
            <div className="text-muted-foreground text-sm font-medium">
              {t.navigation?.menu || "Menu"}
            </div>
            <div className="flex flex-col gap-3">
              {navItems.map((item, index) => (
                <MobileLink key={index} href={item.href} onOpenChange={setOpen}>
                  {item.label}
                </MobileLink>
              ))}
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
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn("text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  )
}
