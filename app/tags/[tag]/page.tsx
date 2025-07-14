import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Calendar, Hash, Bot } from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
import { Footer } from "@/components/footer"
import { getPostsByTag, getAllTags } from "@/lib/blog"
import { MobileNav } from "@/components/mobile-nav"

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: tag.name.toLowerCase(),
  }))
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getPostsByTag(params.tag)

  if (posts.length === 0) {
    notFound()
  }

  const tagName = params.tag.charAt(0).toUpperCase() + params.tag.slice(1)

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
              <Link href="/tags" className="text-gray-600 hover:text-[#F5A353] transition-colors">
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
        <div className="mb-8">
          <Link href="/tags">
            <Button variant="ghost" className="mb-6 text-[#F5A353] hover:text-[#E8944A]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tags
            </Button>
          </Link>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Hash className="h-8 w-8 text-[#F5A353]" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{tagName}</h1>
            </div>
            <p className="text-xl text-gray-600">
              {posts.length} article{posts.length !== 1 ? "s" : ""} tagged with "{tagName}"
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.slug} className="hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-[#F5A353]/10 text-[#F5A353]">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center">
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
      </div>

      <Footer />
    </div>
  )
}
