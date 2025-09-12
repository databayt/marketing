"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  return (
    <Button
      variant="link"
      size="sm"
      className="h-12 w-12 md:h-8 md:w-8 px-0"
      onClick={toggleTheme}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-10 w-10 md:h-4 md:w-4" />
      ) : (
        <MoonIcon className="h-10 w-10 md:h-4 md:w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}