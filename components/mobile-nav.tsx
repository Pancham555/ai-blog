"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Bot, Home, BookOpen, Hash, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchBar } from "@/components/search-bar"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[300px] sm:w-[350px] flex flex-col font-mono bg-background">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
            <Bot className="h-6 w-6 text-[#F5A353]" />
            <span className="text-xl font-bold">AI News Hub</span>
          </Link>
          <ThemeToggle />
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchBar autoFocus />
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-4">
          <NavLink href="/" onClick={() => setOpen(false)}>
            <Home className="h-5 w-5" />
            Home
          </NavLink>
          <NavLink href="/blog" onClick={() => setOpen(false)}>
            <BookOpen className="h-5 w-5" />
            Blog
          </NavLink>
          <NavLink href="/tags" onClick={() => setOpen(false)}>
            <Hash className="h-5 w-5" />
            Tags
          </NavLink>
          <NavLink href="/about" onClick={() => setOpen(false)}>
            <Info className="h-5 w-5" />
            About
          </NavLink>
        </nav>

        {/* Footer */}
        <footer className="mt-auto pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} AI News Hub</p>
          <p className="text-xs text-muted-foreground mt-1">Powered by AI</p>
        </footer>

        {/* Close button */}
        <SheetTrigger asChild className="absolute right-4 top-4">
          <Button variant="ghost" size="icon" aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </SheetTrigger>
      </SheetContent>
    </Sheet>
  )
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center space-x-3 text-lg font-medium rounded-lg p-3 transition-colors hover:bg-muted hover:text-[#F5A353]"
    >
      {children}
    </Link>
  )
}

/*  also export default so both `import MobileNav` and
    `import { MobileNav }` work without changes elsewhere */
export default MobileNav
