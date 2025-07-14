"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SearchResult {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
}

interface SearchBarProps {
  autoFocus?: boolean
  searchData: SearchResult[] // Now receives data as a prop
}

export function SearchBar({ autoFocus = false, searchData }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.length > 1) {
      // Start filtering after 1 character
      const lowerCaseQuery = query.toLowerCase()
      const results = searchData.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerCaseQuery) ||
          post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
          post.category.toLowerCase().includes(lowerCaseQuery) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)),
      )
      setFilteredResults(results)
      setIsOpen(results.length > 0)
    } else {
      setFilteredResults([])
      setIsOpen(false)
    }
  }, [query, searchData])

  const handleSelect = (slug: string) => {
    setIsOpen(false)
    setQuery("")
    router.push(`/blog/${slug}`)
    if (inputRef.current) {
      inputRef.current.blur() // Remove focus from input after selection
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false)
      if (inputRef.current) {
        inputRef.current.blur()
      }
    }
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && filteredResults.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)} // Delay to allow click on results
          onKeyDown={handleKeyDown}
          placeholder="Search articles..."
          className="pl-10 bg-background border-border font-mono shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#F5A353]/50"
          autoFocus={autoFocus}
        />
      </div>

      {isOpen && filteredResults.length > 0 && (
        <Card className="absolute z-50 mt-1 w-full shadow-lg bg-background border-border">
          <CardContent className="p-0">
            <ul className="max-h-64 overflow-auto">
              {filteredResults.map((result) => (
                <li
                  key={result.slug}
                  className={cn("cursor-pointer px-4 py-2 hover:bg-muted transition-colors")}
                  onMouseDown={() => handleSelect(result.slug)} // Use onMouseDown to trigger before onBlur
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="bg-[#F5A353]/10 text-[#F5A353] font-mono">
                      {result.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">{result.date}</span>
                  </div>
                  <h3 className="font-medium text-sm mb-1 font-mono">{result.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 font-mono">{result.excerpt}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {isOpen && query.length > 1 && filteredResults.length === 0 && (
        <Card className="absolute z-50 mt-1 w-full shadow-lg bg-background border-border">
          <CardContent className="p-4 text-center text-sm text-muted-foreground font-mono">
            No results found for "{query}"
          </CardContent>
        </Card>
      )}
    </div>
  )
}
