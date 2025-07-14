import Link from "next/link"
import Image from "next/image"
import { Bot, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getLatestPosts, getAllTags, getAllPosts } from "@/lib/blog"
import { Footer } from "@/components/footer"
import { SearchWrapper } from "@/components/search-wrapper" // Import the SearchWrapper
import { MobileNav } from "@/components/mobile-nav" // Import MobileNav
import { ThemeToggle } from "@/components/theme-toggle" // Import ThemeToggle

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3)
  const allTags = await getAllTags()
  const allPosts = await getAllPosts() // Declare the getAllPosts variable

  // Prepare search data for client components
  const searchData = allPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    tags: post.tags,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 font-mono text-foreground">
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
                <SearchWrapper /> {/* Use SearchWrapper here */}
              </div>
              <ThemeToggle />
              <MobileNav searchData={searchData} /> {/* Pass searchData to MobileNav */}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-center bg-gradient-to-r from-[#F5A353] to-[#E8944A] dark:from-gray-800 dark:to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/news-bro.svg"
            alt="AI News Background"
            layout="fill"
            objectFit="cover"
            className="pointer-events-none"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Your Daily Dose of AI-Generated News</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Stay ahead with the latest insights and trends, crafted by advanced artificial intelligence.
          </p>
          <Link href="/blog">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-[#F5A353] hover:bg-gray-100 dark:bg-gray-900 dark:text-[#F5A353] dark:hover:bg-gray-800 transition-colors shadow-lg"
            >
              Explore Blog Posts <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Card
              key={post.slug}
              className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground border-border"
            >
              {post.heroImage && (
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={post.heroImage || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover"
                  />
                </Link>
              )}
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-[#F5A353]/10 text-[#F5A353]">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-bold mb-2 hover:text-[#F5A353] transition-colors leading-tight">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
                      <Badge variant="outline" className="hover:bg-[#F5A353]/10 border-border">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/blog">
            <Button variant="outline" className="border-[#F5A353] text-[#F5A353] hover:bg-[#F5A353]/10 bg-transparent">
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Popular Tags Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30 dark:bg-muted/50 rounded-lg mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Popular Tags</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {allTags.map((tag) => (
            <Link key={tag.name} href={`/tags/${tag.name.toLowerCase()}`}>
              <Badge
                variant="default"
                className="px-4 py-2 text-base bg-[#F5A353] text-white hover:bg-[#E8944A] transition-colors cursor-pointer"
              >
                {tag.name} ({tag.count})
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
