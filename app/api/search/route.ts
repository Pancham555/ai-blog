import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"

export const dynamic = "force-static" // cache at build but easy to opt-out

type PostMeta = {
  title: string
  slug: string
  tags?: string[]
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") || "").toLowerCase().trim()

  if (!q) {
    return NextResponse.json<PostMeta[]>([])
  }

  const posts = await readPosts()
  const results = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))),
  )

  return NextResponse.json(results.slice(0, 10))
}

async function readPosts(): Promise<PostMeta[]> {
  const dir = path.join(process.cwd(), "blog")
  let files: string[]
  try {
    files = await fs.readdir(dir)
  } catch {
    return []
  }

  const mdxFiles = files.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(dir, file), "utf8")
      const { data } = matter(raw)
      return {
        title: data.title ?? file.replace(/\.mdx?$/, ""),
        slug: file.replace(/\.mdx?$/, ""),
        tags: data.tags ?? [],
      } as PostMeta
    }),
  )

  return posts
}
