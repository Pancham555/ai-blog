import { type NextRequest, NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blog"

export const dynamic = "force-dynamic" // ✅ valid value

// Simple search API (title / excerpt / tags).
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") || "").toLowerCase()

  const posts = await getAllPosts()
  const matches = posts.filter((p) =>
    [p.title, p.excerpt, ...(p.tags ?? [])].some((field) => field.toLowerCase().includes(q)),
  )

  return NextResponse.json({ results: matches })
}
