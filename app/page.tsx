import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot, Calendar, Search, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SearchBar } from "@/components/search-bar"
import { Footer } from "@/components/footer"
import { getLatestPosts } from "@/lib/blog"
import { MobileNav } from "@/components/mobile-nav"

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 font-mono">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-[#F5A353]" />
              <span className="text-2xl font-bold text-gray-900">AI News Hub</span>
            </div>
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              AI-Powered <span className="text-[#F5A353]">News</span> Intelligence
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Stay ahead with daily AI-generated insights on business, technology, education, and artificial
              intelligence trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-[#F5A353] hover:bg-[#E8944A] text-white px-8 py-3">
                <Link href="/blog" className="flex items-center">
                  Explore Latest Posts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#F5A353] text-[#F5A353] hover:bg-[#F5A353] hover:text-white px-8 py-3 bg-transparent"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Updated to side-by-side layout */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">Powered by Advanced AI</h2>

          <div className="space-y-16">
            {/* Business Section */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <Image
                  src="/images/business-mission-bro.svg"
                  alt="Business Intelligence"
                  width={400}
                  height={300}
                  className="w-full max-w-md mx-auto"
                />
              </div>
              <div className="lg:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold text-[#F5A353]">Business Intelligence</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our AI analyzes the latest business trends, market movements, and corporate strategies to deliver
                  actionable insights. From startup innovations to Fortune 500 developments, stay informed about the
                  business world's most important changes.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5A353] rounded-full mr-3"></div>
                    Market analysis and predictions
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5A353] rounded-full mr-3"></div>
                    Corporate strategy insights
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5A353] rounded-full mr-3"></div>
                    Financial trend reporting
                  </li>
                </ul>
              </div>
            </div>

            {/* AI & Technology Section */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2">
                <Image
                  src="/images/cool-robot-bro.svg"
                  alt="AI Technology"
                  width={400}
                  height={300}
                  className="w-full max-w-md mx-auto"
                />
              </div>
              <div className="lg:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold text-[#F5A353]">AI & Technology</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Dive deep into the world of artificial intelligence and emerging technologies. Our AI tracks
                  breakthroughs in machine learning, robotics, and digital innovation to keep you at the forefront of
                  technological advancement.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5A353] rounded-full mr-3"></div>
                    Latest AI breakthroughs
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5A353] rounded-full mr-3"></div>
                    Tech industry developments
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5A353] rounded-full mr-3"></div>
                    Future technology predictions
                  </li>
                </ul>
              </div>
            </div>

            {/* Education Section */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <Image
                  src="/images/education-bro.svg"
                  alt="Education Technology"
                  width={400}
                  height={300}
                  className="w-full max-w-md mx-auto"
                />
              </div>
              <div className="lg:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold text-[#F5A353]">Education Innovation</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Explore how technology is transforming education at every level. From AI-powered learning platforms to
                  virtual classrooms, discover the tools and trends shaping the future of learning and skill
                  development.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5A353] rounded-full mr-3"></div>
                    EdTech innovations
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5A353] rounded-full mr-3"></div>
                    Online learning trends
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5A353] rounded-full mr-3"></div>
                    Educational AI applications
                  </li>
                </ul>
              </div>
            </div>

            {/* News & Updates Section */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2">
                <Image
                  src="/images/news-bro.svg"
                  alt="Daily News Updates"
                  width={400}
                  height={300}
                  className="w-full max-w-md mx-auto"
                />
              </div>
              <div className="lg:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold text-[#F5A353]">Daily News Intelligence</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Never miss important developments with our automated daily news summaries. Our AI processes thousands
                  of sources to bring you the most relevant and impactful stories across all sectors, delivered fresh
                  every morning.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5A353] rounded-full mr-3"></div>
                    Automated daily summaries
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5A353] rounded-full mr-3"></div>
                    Multi-source analysis
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#F5A353] rounded-full mr-3"></div>
                    Trending topic identification
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Latest AI Insights</h2>
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-[#F5A353] text-[#F5A353] hover:bg-[#F5A353] hover:text-white bg-transparent"
              >
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow">
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
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="mt-4 p-0 text-[#F5A353] hover:text-[#E8944A]">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#F5A353]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Never Miss an AI Update</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Our AI generates fresh insights daily. Stay informed with the latest trends in technology, business, and
            education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-[#F5A353] hover:bg-gray-100">
              <Zap className="mr-2 h-5 w-5" />
              Explore AI Features
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#F5A353] bg-transparent"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Articles
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
