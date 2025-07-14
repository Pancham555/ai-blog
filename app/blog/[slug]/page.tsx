import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowLeft, Bot } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { Footer } from "@/components/footer"
import { CommentSection } from "@/components/comment-section"
import { ShareButton } from "@/components/share-button"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import ReactMarkdown from "react-markdown"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

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
              <ThemeToggle />
              <MobileNav />
            </div>
          </nav>
        </div>
      </header>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-[#F5A353] transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-[#F5A353]/10 text-[#F5A353]">
              {post.category}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {post.date}
            </span>
            <span className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime} min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">{post.title}</h1>

          <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
                  <Badge variant="outline" className="hover:bg-[#F5A353]/10 border-border">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
            <ShareButton />
          </div>
        </header>

        {/* Hero Image */}
        {post.heroImage && (
          <div className="mb-8">
            <img
              src={post.heroImage || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-bold text-foreground mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold text-foreground mb-3 mt-8">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-bold text-foreground mb-2 mt-6">{children}</h3>,
              p: ({ children }) => <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-1">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-1">{children}</li>,
              strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#F5A353] pl-4 italic text-muted-foreground my-4">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>
              ),
              pre: ({ children }) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
              img: ({ node, ...props }) => {
                // Suppress images from markdown content if a heroImage is already present
                if (post.heroImage) {
                  return null
                }
                // Otherwise, render the image normally
                return <img {...props} className="max-w-full h-auto rounded-lg my-4" />
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Comments Section */}
        <CommentSection postSlug={post.slug} />
      </article>

      <Footer />
    </div>
  )
}
