"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Bot, Home, BookOpen, Hash, Info, X } from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/search-bar"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden font-mono">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] font-mono">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
              <Bot className="h-6 w-6 text-[#F5A353]" />
              <span className="text-xl font-bold">AI News Hub</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <SearchBar />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-3 text-lg font-medium hover:text-[#F5A353] transition-colors p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            <Link
              href="/blog"
              className="flex items-center space-x-3 text-lg font-medium hover:text-[#F5A353] transition-colors p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <BookOpen className="h-5 w-5" />
              <span>Blog</span>
            </Link>

            <Link
              href="/tags"
              className="flex items-center space-x-3 text-lg font-medium hover:text-[#F5A353] transition-colors p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <Hash className="h-5 w-5" />
              <span>Tags</span>
            </Link>

            <Link
              href="/about"
              className="flex items-center space-x-3 text-lg font-medium hover:text-[#F5A353] transition-colors p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <Info className="h-5 w-5" />
              <span>About</span>
            </Link>
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t">
            <p className="text-sm text-gray-500 text-center">© {new Date().getFullYear()} AI News Hub</p>
            <p className="text-xs text-gray-400 text-center mt-1">Powered by AI</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
