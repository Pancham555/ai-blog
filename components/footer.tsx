"use client"
import Link from "next/link"
import { Bot } from "lucide-react"
import { getAllTags } from "@/lib/blog"

export async function Footer() {
  const tags = await getAllTags()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/40 py-8 text-sm">
      <div className="container mx-auto flex flex-col items-center gap-2 text-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Bot className="h-5 w-5 text-[#F5A353]" />
          AI&nbsp;News&nbsp;Hub
        </Link>
        <p className="text-muted-foreground">© {year} AI&nbsp;News&nbsp;Hub. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
