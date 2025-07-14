import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Bot, Sparkles, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
import { Footer } from "@/components/footer"
import { getLatestPosts } from "@/lib/blog"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3)

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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-[#F5A353]/10 px-4 py-2 rounded-full">
              <Sparkles className="h-5 w-5 text-[#F5A353]" />
              <span className="text-sm font-medium text-[#F5A353]">AI-Powered News Generation</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            AI News <span className="text-[#F5A353]">Hub</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Stay ahead with daily AI-generated insights on business, technology, education, and artificial intelligence
            trends. Powered by cutting-edge AI to deliver the most relevant news analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog">
              <Button size="lg" className="bg-[#F5A353] hover:bg-[#E8944A] text-white font-mono">
                Explore Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="font-mono border-[#F5A353] text-[#F5A353] hover:bg-[#F5A353]/10 bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose AI News Hub?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the future of news consumption with our AI-driven platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow bg-background border-border">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#F5A353]/10 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-[#F5A353]" />
                </div>
                <CardTitle className="text-foreground">AI-Generated Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our advanced AI analyzes multiple news sources to create comprehensive, unbiased articles with unique
                  insights.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-background border-border">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#F5A353]/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-[#F5A353]" />
                </div>
                <CardTitle className="text-foreground">Real-Time Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Stay current with daily automated content generation that captures the latest trends and developments.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-background border-border">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#F5A353]/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#F5A353]" />
                </div>
                <CardTitle className="text-foreground">Expert Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get in-depth analysis and commentary on complex topics, making technical subjects accessible to
                  everyone.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest <span className="text-[#F5A353]">Insights</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most recent AI-generated articles covering the latest in technology and business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {latestPosts.map((post) => (
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
                          <Badge variant="outline" className="text-xs hover:bg-[#F5A353]/10">
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

          <div className="text-center">
            <Link href="/blog">
              <Button
                size="lg"
                variant="outline"
                className="font-mono border-[#F5A353] text-[#F5A353] hover:bg-[#F5A353]/10 bg-transparent"
              >
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
