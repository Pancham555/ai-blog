import Link from "next/link"
import { Bot } from "lucide-react"
import { getAllTags } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"

export async function Footer() {
  const tags = await getAllTags()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Bot className="h-6 w-6 text-[#F5A353]" />
              <span className="text-xl font-bold text-foreground">AI News Hub</span>
            </Link>
            <p className="text-sm text-muted-foreground font-mono">
              AI-powered news generation delivering daily insights on technology, business, and innovation.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-foreground mb-4 font-mono">Navigation</h3>
            <ul className="space-y-2 font-mono">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-[#F5A353] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-[#F5A353] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tags" className="text-sm text-muted-foreground hover:text-[#F5A353] transition-colors">
                  Tags
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-[#F5A353] transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Tags */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-foreground mb-4 font-mono">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 10).map((tag) => (
                <Link key={tag.name} href={`/tags/${tag.name.toLowerCase()}`}>
                  <Badge
                    variant="outline"
                    className="text-xs hover:bg-[#F5A353]/10 hover:border-[#F5A353] transition-colors font-mono border-border"
                  >
                    {tag.name} ({tag.count})
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground font-mono">
            © {currentYear} AI News Hub. All rights reserved. Powered by artificial intelligence.
          </p>
        </div>
      </div>
    </footer>
  )
}
