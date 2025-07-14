"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Toggle between system / light / dark.
 * Icon switches instantly without waiting for hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const nextTheme = resolvedTheme === "dark" ? "light" : resolvedTheme === "light" ? "system" : "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      className={cn("rounded-full", className)}
      onClick={() => setTheme(nextTheme)}
    >
      <Sun className={cn("h-5 w-5 transition-all duration-300", resolvedTheme === "dark" && "rotate-90 scale-0")} />
      <Moon
        className={cn("absolute h-5 w-5 transition-all duration-300", resolvedTheme !== "dark" && "-rotate-90 scale-0")}
      />
    </Button>
  )
}
