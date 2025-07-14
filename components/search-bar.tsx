"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

type Result = { title: string; slug: string }

export function SearchBar({ autoFocus = false }: { autoFocus?: boolean }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Result[]>([])
  const [open, setOpen] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const router = useRouter()

  // fetch results
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const fetchResults = async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        signal: controller.signal,
      })
      if (!res.ok) return
      setResults(await res.json())
      setOpen(true)
    }

    fetchResults()
    return () => controller.abort()
  }, [query])

  const handleSelect = (slug: string) => {
    setOpen(false)
    setQuery("")
    router.push(`/blog/${slug}`)
  }

  return (
    <div className="relative">
      <div className="flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="pl-10"
          autoFocus={autoFocus}
          onFocus={() => query && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 100)} // delay so click registers
        />
      </div>

      {open && results.length > 0 && (
        <Card className="absolute z-50 mt-1 w-full shadow-lg">
          <CardContent className="p-0">
            <ul>
              {results.map((r) => (
                <li
                  key={r.slug}
                  className={cn("cursor-pointer px-4 py-2 hover:bg-muted", "transition-colors")}
                  onMouseDown={() => handleSelect(r.slug)}
                >
                  {r.title}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
