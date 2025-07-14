import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Hash } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { getAllTags } from "@/lib/blog"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default async function TagsPage() {
  const tags = await getAllTags()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 font-mono">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-[#F5A353]" />
              <span className="text-2xl font-bold text-foreground">AI News Hub</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/blog" className="text-muted-foreground hover:text-[#F5A353] transition-colors">
                Blog
              </Link>
              <Link href="/tags" className="text-[#F5A353] font-medium">
                Tags
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-[#F5A353] transition-colors">
                About
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <MobileNav />
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore <span className="text-[#F5A353]">Tags</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover articles by topic and explore our comprehensive tag collection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tags.map((tag) => (
            <Link key={tag.name} href={`/tags/${tag.name.toLowerCase()}`}>
              <Card className="hover:shadow-lg transition-shadow bg-background border-border cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Hash className="h-5 w-5 text-[#F5A353]" />
                      <CardTitle className="text-foreground">{tag.name}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="bg-[#F5A353]/10 text-[#F5A353]">
                      {tag.count}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-mono">
                    {tag.count} article{tag.count !== 1 ? "s" : ""} tagged with {tag.name}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {tags.length === 0 && (
          <div className="text-center py-12">
            <Hash className="h-16 w-16 text-[#F5A353] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No Tags Yet</h2>
            <p className="text-muted-foreground">Tags will appear here as we publish more articles.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
