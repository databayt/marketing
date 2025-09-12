"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  return (
    <button
      className="h-10 w-10 md:h-8 md:w-8 rounded-full hover:bg-accent/50 transition-colors flex items-center justify-center"
      onClick={toggleTheme}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-6 w-6 md:h-4 md:w-4" strokeWidth={1.5} />
      ) : (
        <MoonIcon className="h-6 w-6 md:h-4 md:w-4" strokeWidth={1.5} />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}