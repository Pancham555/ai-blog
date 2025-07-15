"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ThemeToggle from "@/components/theme-toggle"
import { SearchBar } from "@/components/search-bar"

interface MobileNavProps {
  searchData?: Array<{
    slug: string
    title: string
    excerpt: string
    category: string
    date: string
    tags: string[]
  }>
}

export function MobileNav({ searchData = [] }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col gap-6 pt-8">
        <header className="flex items-center justify-between">
          <span className="text-lg font-semibold">AI News Hub</span>
          <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </header>

        {/* Search Bar */}
        <div className="w-full">
          <SearchBar 
            searchData={searchData} 
            onResultSelect={() => setOpen(false)} // Close mobile nav when search result is selected
          />
        </div>

        <nav className="flex flex-col gap-4">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/blog" onClick={() => setOpen(false)}>
            Blog
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
        </nav>

        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav