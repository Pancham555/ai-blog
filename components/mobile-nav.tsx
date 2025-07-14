"use client"

import { useState } from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Bot } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col bg-background text-foreground">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <Bot className="h-8 w-8 text-[#F5A353]" />
            <span className="text-2xl font-bold text-foreground">AI News Hub</span>
          </Link>
          <ThemeToggle />
        </div>
        <nav className="flex flex-col gap-4 p-4 flex-grow">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-[#F5A353] transition-colors text-lg font-medium"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/tags"
            className="text-muted-foreground hover:text-[#F5A353] transition-colors text-lg font-medium"
            onClick={() => setIsOpen(false)}
          >
            Tags
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-[#F5A353] transition-colors text-lg font-medium"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <div className="mt-auto pt-4 border-t border-border">
            <SearchBar />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
