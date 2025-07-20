import { getAllPosts } from "@/lib/blog"
import { SearchBar } from "./search-bar"

// This is a Server Component that fetches data and passes it to the client SearchBar
export async function SearchWrapper() {
  const posts = await getAllPosts()
  const searchData = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    tags: post.tags, // Include tags for search filtering
  }))

  return <SearchBar searchData={searchData} />
}
