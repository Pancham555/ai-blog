"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Bot, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { SearchBar } from "@/components/search-bar"
import { Separator } from "@/components/ui/separator"
import ThemeToggle from "@/components/theme-toggle" // Ensure ThemeToggle is imported

interface SearchData {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  tags?: string[]
}

interface MobileNavProps {
  searchData?: SearchData[]
}

export function MobileNav({ searchData = [] }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => setIsOpen(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-[#F5A353]" />
            <span>AI News Hub</span>
          </SheetTitle>
        </SheetHeader>

        {/* Search Section */}
        <div className="mt-6">
          <div className="flex items-center space-x-2 mb-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Search Articles</span>
          </div>
          <SearchBar searchData={searchData} /> {/* Pass searchData to SearchBar */}
        </div>

        <Separator className="my-6" />

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <Link
            href="/blog"
            className="text-lg font-medium hover:text-[#F5A353] transition-colors"
            onClick={closeSheet}
          >
            Blog
          </Link>
          <Link
            href="/tags"
            className="text-lg font-medium hover:text-[#F5A353] transition-colors"
            onClick={closeSheet}
          >
            Tags
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium hover:text-[#F5A353] transition-colors"
            onClick={closeSheet}
          >
            About
          </Link>
        </nav>

        <div className="mt-auto pt-6">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  )
}
