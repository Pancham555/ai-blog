import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Hash } from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
import { Footer } from "@/components/footer"
import { getAllTags } from "@/lib/blog"
import { MobileNav } from "@/components/mobile-nav"

export default async function TagsPage() {
  const tags = await getAllTags()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 font-mono">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-[#F5A353]" />
              <span className="text-2xl font-bold text-gray-900">AI News Hub</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/blog" className="text-gray-600 hover:text-[#F5A353] transition-colors">
                Blog
              </Link>
              <Link href="/tags" className="text-[#F5A353] font-medium">
                Tags
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-[#F5A353] transition-colors">
                About
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <MobileNav />
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore by <span className="text-[#F5A353]">Tags</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover articles organized by topics and themes, all powered by AI analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tags.map((tag) => (
            <Link key={tag.name} href={`/tags/${tag.name.toLowerCase()}`}>
              <Card className="hover:shadow-lg transition-all hover:scale-105 bg-white">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-[#F5A353]/10 rounded-full w-fit">
                    <Hash className="h-6 w-6 text-[#F5A353]" />
                  </div>
                  <CardTitle className="text-[#F5A353]">{tag.name}</CardTitle>
                  <CardDescription>
                    {tag.count} article{tag.count !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="bg-[#F5A353]/10 text-[#F5A353]">
                    {tag.count} posts
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {tags.length === 0 && (
          <div className="text-center py-12">
            <Hash className="h-16 w-16 text-[#F5A353] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Tags Yet</h2>
            <p className="text-gray-600">Tags will appear here as our AI generates more content.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
