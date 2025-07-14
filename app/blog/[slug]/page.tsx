import Link from "next/link"
import type React from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { getPostBySlug } from "@/lib/blog"
import { ShareButton } from "@/components/share-button"
import { CommentSection } from "@/components/comment-section"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Timer, ArrowLeft, Bot } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { getAllPosts } from "@/lib/blog" // Import getAllPosts to pass searchData
import Footer from "@/components/footer" // Declare Footer variable

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Prepare search data for client components (MobileNav needs it)
  const searchData = (await getAllPosts()).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.date,
    tags: p.tags,
  }))

  const markdownComponents = {
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
      // Skip images that duplicate the hero
      if (post.heroImage && props.src === post.heroImage) return null
      return (
        <Image
          {...props}
          alt={props.alt || ""}
          width={800}
          height={450}
          className="my-4 rounded-lg object-cover w-full h-auto"
        />
      )
    },
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl font-bold text-foreground mb-4">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-foreground mb-3 mt-8">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold text-foreground mb-2 mt-6">{children}</h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-1">{children}</ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => <li className="mb-1">{children}</li>,
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[#F5A353] pl-4 italic text-muted-foreground my-4">{children}</blockquote>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    pre: ({ children }: { children?: React.ReactNode }) => (
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
    ),
  } satisfies Parameters<typeof ReactMarkdown>[0]["components"]

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
              <MobileNav searchData={searchData} /> {/* Pass searchData to MobileNav */}
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
              <CalendarDays className="h-4 w-4 mr-1" />
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="text-sm text-muted-foreground flex items-center">
              <Timer className="h-4 w-4 mr-1" />
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
            <ShareButton title={post.title} slug={post.slug} />
          </div>
        </header>

        {/* Hero Image */}
        {post.heroImage && (
          <div className="mb-8">
            <Image
              src={post.heroImage || "/placeholder.svg"}
              alt={post.title}
              width={1200}
              height={675}
              className="w-full rounded-lg object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
        </div>

        {/* Comments Section */}
        <Separator className="my-8" />
        <CommentSection postId={post.slug} />
      </article>

      <Footer />
    </div>
  )
}
