import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Bot } from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
import { Footer } from "@/components/footer"
import { getAllPosts } from "@/lib/blog"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default async function BlogPage() {
  const posts = await getAllPosts()

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
              <Link href="/blog" className="text-[#F5A353] font-medium">
                Blog
              </Link>
              <Link href="/tags" className="text-muted-foreground hover:text-[#F5A353] transition-colors">
                Tags
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-[#F5A353] transition-colors">
                About
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <ThemeToggle />
              <MobileNav />
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            AI-Generated <span className="text-[#F5A353]">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Daily AI-powered analysis of the latest trends in business, technology, education, and artificial
            intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.slug} className="hover:shadow-lg transition-shadow bg-background border-border">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-[#F5A353]/10 text-[#F5A353]">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </span>
                </div>
                <CardTitle className="line-clamp-2 hover:text-[#F5A353] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 mb-4">{post.excerpt}</CardDescription>
                <div className="flex items-center justify-between">
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="p-0 text-[#F5A353] hover:text-[#E8944A]">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                  <div className="flex gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
                        <Badge variant="outline" className="text-xs hover:bg-[#F5A353]/10 border-border">
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <Bot className="h-16 w-16 text-[#F5A353] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No Posts Yet</h2>
            <p className="text-muted-foreground">
              Our AI is working on generating the first batch of insights. Check back soon!
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
