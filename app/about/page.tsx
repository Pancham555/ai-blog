import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Zap, Clock, GitBranch, Search, Rss } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SearchBar } from "@/components/search-bar"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"

export default function AboutPage() {
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
              <Link href="/about" className="text-[#F5A353] font-medium">
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Bot className="h-12 w-12 text-[#F5A353]" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              About <span className="text-[#F5A353]">AI News Hub</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing news consumption through artificial intelligence. Our platform automatically generates
            daily insights on business, technology, education, and AI trends, delivering fresh perspectives powered by
            advanced machine learning.
          </p>
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How Our AI Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-[#F5A353]/10 rounded-full w-fit">
                  <Rss className="h-8 w-8 text-[#F5A353]" />
                </div>
                <CardTitle className="text-[#F5A353]">Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our AI continuously monitors multiple news sources, gathering the latest information across various
                  industries and topics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-[#F5A353]/10 rounded-full w-fit">
                  <Bot className="h-8 w-8 text-[#F5A353]" />
                </div>
                <CardTitle className="text-[#F5A353]">AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Using Groq AI, we analyze and summarize complex information, identifying key trends and insights that
                  matter most.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-[#F5A353]/10 rounded-full w-fit">
                  <Zap className="h-8 w-8 text-[#F5A353]" />
                </div>
                <CardTitle className="text-[#F5A353]">Content Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our system generates comprehensive blog posts in MDX format, complete with proper formatting and
                  structure.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-[#F5A353]/10 rounded-full w-fit">
                  <GitBranch className="h-8 w-8 text-[#F5A353]" />
                </div>
                <CardTitle className="text-[#F5A353]">Auto Publishing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Articles are automatically committed to our repository and published daily, ensuring fresh content
                  every day.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-[#F5A353]" />
                  <CardTitle>Daily Automation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our cron jobs ensure new content is generated and published every day at scheduled intervals, keeping
                  you updated with the latest developments without any manual intervention.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Search className="h-6 w-6 text-[#F5A353]" />
                  <CardTitle>Smart Search</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our search functionality automatically indexes new content as it's published, providing instant access
                  to all articles with intelligent filtering and categorization.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bot className="h-6 w-6 text-[#F5A353]" />
                  <CardTitle>AI-Powered Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Every article is generated using advanced AI models that analyze trends, extract key information, and
                  present it in an easily digestible format.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <GitBranch className="h-6 w-6 text-[#F5A353]" />
                  <CardTitle>Version Control</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  All content is automatically versioned and stored in Git repositories, ensuring transparency, backup,
                  and the ability to track content evolution over time.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Content Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <Image
                    src="/images/business-mission-bro.svg"
                    alt="Business"
                    width={80}
                    height={80}
                    className="mx-auto"
                  />
                </div>
                <CardTitle className="text-[#F5A353]">Business</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Market trends, corporate strategies, financial insights, and business innovation coverage.
                </CardDescription>
                <Badge variant="secondary" className="mt-3 bg-[#F5A353]/10 text-[#F5A353]">
                  Daily Updates
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <Image
                    src="/images/cool-robot-bro.svg"
                    alt="AI Technology"
                    width={80}
                    height={80}
                    className="mx-auto"
                  />
                </div>
                <CardTitle className="text-[#F5A353]">Artificial Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Latest AI breakthroughs, machine learning advances, and future technology predictions.
                </CardDescription>
                <Badge variant="secondary" className="mt-3 bg-[#F5A353]/10 text-[#F5A353]">
                  Trending
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <Image src="/images/education-bro.svg" alt="Education" width={80} height={80} className="mx-auto" />
                </div>
                <CardTitle className="text-[#F5A353]">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  EdTech innovations, learning methodologies, and educational technology developments.
                </CardDescription>
                <Badge variant="secondary" className="mt-3 bg-[#F5A353]/10 text-[#F5A353]">
                  Growing
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <Image src="/images/news-bro.svg" alt="Technology" width={80} height={80} className="mx-auto" />
                </div>
                <CardTitle className="text-[#F5A353]">Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Tech industry news, software developments, hardware innovations, and digital transformation.
                </CardDescription>
                <Badge variant="secondary" className="mt-3 bg-[#F5A353]/10 text-[#F5A353]">
                  Popular
                </Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="bg-white rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Built with Modern Technology</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-[#F5A353]">AI & Processing</h3>
              <ul className="text-gray-600 space-y-1">
                <li>Groq AI for content generation</li>
                <li>Advanced NLP processing</li>
                <li>Automated summarization</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-[#F5A353]">Frontend & UI</h3>
              <ul className="text-gray-600 space-y-1">
                <li>Next.js App Router</li>
                <li>Tailwind CSS styling</li>
                <li>MDX content rendering</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-[#F5A353]">Automation</h3>
              <ul className="text-gray-600 space-y-1">
                <li>Cron job scheduling</li>
                <li>Git version control</li>
                <li>Automated deployment</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
