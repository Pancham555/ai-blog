import Link from "next/link"
import { Bot } from "lucide-react"
import { getAllTags } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"

/**
 * Footer
 * --------
 * - Server Component (no "use client") so it can safely call functions that rely on `fs`.
 * - Provides BOTH a named and default export.
 */
export async function Footer() {
  const tags = await getAllTags()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/40 py-10 text-sm text-muted-foreground">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="mb-4 flex items-center gap-2 font-semibold text-foreground">
            <Bot className="h-6 w-6 text-[#F5A353]" />
            AI&nbsp;News&nbsp;Hub
          </Link>
          <p className="max-w-xs font-mono">AI-powered news delivered daily&nbsp;— business, education &amp; tech.</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-4 font-semibold text-foreground">Navigation</h3>
          <ul className="space-y-2 font-mono">
            <li>
              <Link href="/" className="transition-colors hover:text-[#F5A353]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-[#F5A353]">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/tags" className="transition-colors hover:text-[#F5A353]">
                Tags
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-[#F5A353]">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Popular tags */}
        <div className="md:col-span-2">
          <h3 className="mb-4 font-semibold text-foreground">Popular&nbsp;Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 10).map((tag) => (
              <Link key={tag.name} href={`/tags/${tag.name.toLowerCase()}`}>
                <Badge
                  variant="outline"
                  className="border-border font-mono text-xs transition-colors hover:border-[#F5A353] hover:bg-[#F5A353]/10"
                >
                  {tag.name} ({tag.count})
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-center font-mono">© {year} AI&nbsp;News&nbsp;Hub — All rights reserved.</p>
    </footer>
  )
}

/* default export so `import Footer from "@/components/footer"` works */
export default Footer
