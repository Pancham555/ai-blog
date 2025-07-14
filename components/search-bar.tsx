"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import type { BlogPost } from "@/lib/blog"

interface SearchResult {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
}

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // Load all posts on component mount
    getAllPosts().then(setAllPosts)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true)
      // Search through actual posts
      setTimeout(() => {
        const searchResults = allPosts
          .filter(
            (post) =>
              post.title.toLowerCase().includes(query.toLowerCase()) ||
              post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
              post.content.toLowerCase().includes(query.toLowerCase()) ||
              post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
          )
          .map((post) => ({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            category: post.category,
            date: post.date,
          }))
        setResults(searchResults)
        setIsLoading(false)
      }, 300)
    } else {
      setResults([])
    }
  }, [query, allPosts])

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        className="relative w-full md:w-64 justify-start text-sm text-muted-foreground bg-background border-border font-mono shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#F5A353]/50"
        onClick={() => setIsOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Search articles...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 dark:bg-black/70 flex items-start justify-center pt-20 px-4">
      <Card className="w-full max-w-2xl bg-background border-border shadow-2xl">
        <CardContent className="p-0">
          <div className="flex items-center border-b border-border px-4">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-mono bg-transparent"
              autoFocus
            />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {isLoading && <div className="p-4 text-center text-sm text-muted-foreground font-mono">Searching...</div>}

          {results.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              {results.map((result) => (
                <Link
                  key={result.slug}
                  href={`/blog/${result.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block p-4 hover:bg-muted border-b border-border last:border-b-0 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="bg-[#F5A353]/10 text-[#F5A353] font-mono">
                      {result.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">{result.date}</span>
                  </div>
                  <h3 className="font-medium text-sm mb-1 font-mono">{result.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 font-mono">{result.excerpt}</p>
                </Link>
              ))}
            </div>
          )}

          {query.length > 2 && results.length === 0 && !isLoading && (
            <div className="p-4 text-center text-sm text-muted-foreground font-mono">
              No results found for "{query}"
            </div>
          )}

          {query.length <= 2 && (
            <div className="p-4 text-center text-sm text-muted-foreground font-mono">
              Type at least 3 characters to search
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
