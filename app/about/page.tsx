import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Sparkles, TrendingUp, Users, Zap, Globe } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AboutPage() {
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
              <Link href="/about" className="text-[#F5A353] font-medium">
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
            About <span className="text-[#F5A353]">AI News Hub</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing news consumption through artificial intelligence, delivering comprehensive, unbiased
            insights on the topics that matter most in our rapidly evolving world.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12 bg-background border-border">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-[#F5A353]/10 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-[#F5A353]" />
            </div>
            <CardTitle className="text-2xl text-foreground">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <CardDescription className="text-lg leading-relaxed max-w-3xl mx-auto">
              At AI News Hub, we believe that staying informed shouldn't be overwhelming. Our advanced AI systems
              analyze thousands of news sources daily to bring you the most relevant, comprehensive, and unbiased
              coverage of business, technology, education, and artificial intelligence trends.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="text-center bg-background border-border">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-[#F5A353]/10 rounded-lg flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-[#F5A353]" />
              </div>
              <CardTitle className="text-foreground">AI-Powered Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our sophisticated AI algorithms process multiple news sources to create comprehensive, well-researched
                articles with unique insights you won't find elsewhere.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center bg-background border-border">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-[#F5A353]/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-[#F5A353]" />
              </div>
              <CardTitle className="text-foreground">Real-Time Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Stay ahead of the curve with daily automated content generation that captures the latest trends and
                developments as they happen.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center bg-background border-border">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-[#F5A353]/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#F5A353]" />
              </div>
              <CardTitle className="text-foreground">Expert Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get in-depth analysis and commentary on complex topics, making technical subjects accessible to
                professionals and enthusiasts alike.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center bg-background border-border">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-[#F5A353]/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-[#F5A353]" />
              </div>
              <CardTitle className="text-foreground">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our automated systems ensure you get the latest news analysis within hours of major developments,
                keeping you informed in real-time.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center bg-background border-border">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-[#F5A353]/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-[#F5A353]" />
              </div>
              <CardTitle className="text-foreground">Global Perspective</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We aggregate news from trusted sources worldwide to provide a comprehensive, balanced view of global
                developments and trends.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center bg-background border-border">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-[#F5A353]/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-[#F5A353]" />
              </div>
              <CardTitle className="text-foreground">Unbiased Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our AI systems are designed to minimize bias and present balanced perspectives, helping you form your
                own informed opinions.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Technology Section */}
        <Card className="bg-background border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Powered by Advanced Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">AI & Machine Learning</h3>
                <p className="text-muted-foreground mb-4">
                  We leverage cutting-edge language models and machine learning algorithms to analyze, synthesize, and
                  generate high-quality content from multiple news sources.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Automated Publishing</h3>
                <p className="text-muted-foreground mb-4">
                  Our fully automated pipeline ensures consistent, timely publication of articles with integrated
                  version control and content management systems.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Quality Assurance</h3>
                <p className="text-muted-foreground mb-4">
                  Multiple AI models work together to fact-check, verify sources, and ensure the accuracy and
                  reliability of every piece of content we publish.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Continuous Learning</h3>
                <p className="text-muted-foreground mb-4">
                  Our systems continuously improve through machine learning, adapting to new trends and user preferences
                  to deliver increasingly relevant content.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
