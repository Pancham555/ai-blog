import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "blog")

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  heroImage?: string
  featured?: boolean
  breaking?: boolean
  priority?: number
}

export interface Tag {
  name: string
  count: number
}

/**
 * Return all Dirent objects inside /blog and keep only regular files ending in `.mdx`.
 */
function getBlogFiles(): fs.Dirent[] {
  return fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".mdx"))
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const dirents = getBlogFiles()

  const allPostsData = dirents.map((dirent) => {
    const fileName = dirent.name
    const slug = fileName.replace(/\.mdx$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? new Date().toISOString().split("T")[0],
      excerpt: data.excerpt ?? "",
      content,
      category: data.category ?? "General",
      tags: data.tags ?? [],
      heroImage: data.heroImage,
      featured: data.featured ?? false,
      breaking: data.breaking ?? false,
      priority: data.priority ?? 0,
    } as BlogPost
  })

  // Newest first
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

/* --- remaining helper functions (unchanged) --- */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)
    return {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? new Date().toISOString().split("T")[0],
      excerpt: data.excerpt ?? "",
      content,
      category: data.category ?? "General",
      tags: data.tags ?? [],
      heroImage: data.heroImage,
      featured: data.featured ?? false,
      breaking: data.breaking ?? false,
      priority: data.priority ?? 0,
    } as BlogPost
  } catch {
    return null
  }
}

export async function getLatestPosts(limit = 10) {
  const all = await getAllPosts()
  return all.slice(0, limit)
}
export async function getFeaturedPosts(limit = 3) {
  const all = await getAllPosts()
  const featured = all.filter((p) => p.featured)
  if (featured.length < limit) return all.slice(0, limit)
  return featured.slice(0, limit)
}
export async function getBreakingNews(limit = 2) {
  const all = await getAllPosts()
  const breaking = all.filter((p) => p.breaking)
  if (breaking.length === 0) return all.slice(0, limit)
  return breaking.slice(0, limit)
}
export async function getRecentUpdates(limit = 4) {
  const all = await getAllPosts()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const recent = all.filter((p) => new Date(p.date) >= sevenDaysAgo)
  return (recent.length ? recent : all).slice(0, limit)
}
export async function getPostsByTag(tag: string) {
  const all = await getAllPosts()
  return all.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}
export async function getAllTags(): Promise<Tag[]> {
  const all = await getAllPosts()
  const counts: Record<string, number> = {}
  all.forEach((p) => p.tags.forEach((t) => (counts[t] = (counts[t] ?? 0) + 1)))
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}
export async function getPostsByCategory(category: string) {
  const all = await getAllPosts()
  return all.filter((p) => p.category.toLowerCase() === category.toLowerCase())
}
export async function searchPosts(query: string) {
  const all = await getAllPosts()
  const q = query.toLowerCase()
  return all.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  )
}
