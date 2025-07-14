import { Bot } from "lucide-react"
import Link from "next/link"
import { getAllTags } from "@/lib/blog"

export async function Footer() {
  const tags = await getAllTags()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 font-mono">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Bot className="h-6 w-6 text-[#F5A353]" />
              <span className="text-xl font-bold">AI News Hub</span>
            </div>
            <p className="text-gray-400">Automated AI-powered news insights delivered daily.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/tags/business" className="hover:text-[#F5A353] transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/tags/ai" className="hover:text-[#F5A353] transition-colors">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/tags/education" className="hover:text-[#F5A353] transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/tags/technology" className="hover:text-[#F5A353] transition-colors">
                  Technology
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Pages</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/blog" className="hover:text-[#F5A353] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tags" className="hover:text-[#F5A353] transition-colors">
                  Tags
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F5A353] transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">All Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 8).map((tag) => (
                <Link
                  key={tag.name}
                  href={`/tags/${tag.name.toLowerCase()}`}
                  className="text-xs bg-gray-800 hover:bg-[#F5A353] px-2 py-1 rounded transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} AI News Hub. Powered by artificial intelligence.</p>
        </div>
      </div>
    </footer>
  )
}
