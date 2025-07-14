import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"
import { Octokit } from "octokit"
import fs from "fs"
import path from "path"
import axios from "axios"

export async function POST(request: NextRequest) {
  const baseTopic = "Business and Artificial Intelligence News and Current Updates"
  const newsApiKey = process.env.NEWS_API_KEY
  const groqKey = process.env.GROQ_API_KEY
  const ghToken = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER || "your-username"
  const repo = process.env.GITHUB_REPO || "ai-news-website"
  const branch = "master"

  if (!newsApiKey || !groqKey || !ghToken) {
    return NextResponse.json({ error: "Required API keys are not set" }, { status: 500 })
  }

  // 1. Attempt to fetch top headlines
  const sources = ["bbc-news", "cnn", "the-verge", "techcrunch", "business-insider"]
  let articles: any[] = []

  try {
    const headlinesUrl = `https://newsapi.org/v2/top-headlines?sources=${sources.join(
      ",",
    )}&pageSize=5&apiKey=${newsApiKey}`
    const { data } = await axios.get(headlinesUrl)
    if (data.status === "ok" && Array.isArray(data.articles)) {
      articles = data.articles
    } else {
      console.warn("NewsAPI top-headlines returned no articles, falling back.", data)
    }
  } catch (err: any) {
    console.warn("Error fetching top-headlines:", err.message)
  }

  // 2. Fallback to 'everything' query if no headlines
  if (!articles.length) {
    try {
      const query = encodeURIComponent("business artificial intelligence")
      const everythingUrl = `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=5&sortBy=publishedAt&apiKey=${newsApiKey}`
      const { data } = await axios.get(everythingUrl)
      if (data.status === "ok" && Array.isArray(data.articles)) {
        articles = data.articles
      } else {
        console.error("NewsAPI everything returned no articles.", data)
      }
    } catch (err: any) {
      console.error("Error fetching everything:", err.message)
    }
  }

  if (!articles.length) {
    return NextResponse.json({ error: "No news articles found from NewsAPI" }, { status: 500 })
  }

  // Combine and truncate for AI prompt
  const combined = articles
    .map(
      (a, i) =>
        `Article ${i + 1} from ${a.source.name}:\nTitle: ${a.title}\nDescription: ${
          a.description || ""
        }\nContent: ${a.content || ""}\nURL: ${a.url}`,
    )
    .join("\n\n")
    .slice(0, 8000)

  // 3. Generate unified article
  let aiText: string
  try {
    const client = new Groq({ apiKey: groqKey })
    const prompt = `Read these articles on ${baseTopic} and write an ~800-word unified article using the standard markdown syntax and add numeric or other details if you could find any for this : (\n\n${combined}).`
    const response = await client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a news summarization assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1200,
      temperature: 0.7,
    })
    aiText = response.choices[0].message.content?.trim() || ""
  } catch (err: any) {
    console.error("Groq AI summarization error:", err.message)
    return NextResponse.json({ error: `AI error: ${err.message}` }, { status: 500 })
  }

  // 4. Generate title
  let title: string
  try {
    const client = new Groq({ apiKey: groqKey })
    const tRes = await client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are an expert headline writer." },
        {
          role: "user",
          content: `Create a concise, 6-word max title for this article text without using filler words like here is; just return me the title: ${aiText}`,
        },
      ],
      max_tokens: 20,
      temperature: 0.5,
    })
    title = tRes.choices[0].message.content?.trim().replace(/["'*]/g, "") || baseTopic
  } catch (e: any) {
    console.warn("Title generation failed:", e.message)
    title = baseTopic
  }

  // 5. Generate description
  let description: string
  try {
    const client = new Groq({ apiKey: groqKey })
    const dRes = await client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a professional copywriter." },
        {
          role: "user",
          content: `Write a pure, 12-word max summary for this article without any filler words like here is... Just return me the description: ${aiText}`,
        },
      ],
      max_tokens: 30,
      temperature: 0.7,
    })
    description =
      dRes.choices[0].message.content
        ?.trim()
        .replace(/Here is.*?:\s*/i, "")
        .replace(/["'*]/g, "") || ""
  } catch (e: any) {
    console.warn("Description generation failed:", e.message)
    description = aiText.split("\n\n")[0].split(" ").slice(0, 12).join(" ")
  }

  // 6. Fetch relevant image from free sources
  let heroImage = "/placeholder.svg?height=400&width=800"
  try {
    // Use Lorem Picsum for free images with relevant keywords
    const imageKeywords = title.split(" ").slice(0, 2).join("-").toLowerCase()
    const imageId = Math.floor(Math.random() * 1000) + 1
    heroImage = `https://picsum.photos/800/400?random=${imageId}`

    // Alternative: Use Unsplash Source (free, no API key required)
    // heroImage = `https://source.unsplash.com/800x400/?${encodeURIComponent(imageKeywords)}`
  } catch (err: any) {
    console.warn("Error fetching free image:", err.message)
  }

  // 7. Prepare markdown and metadata
  const dateObj = new Date()
  const pubDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  // Determine category based on content
  const contentLower = aiText.toLowerCase()
  let category = "Technology"
  if (contentLower.includes("business") || contentLower.includes("market") || contentLower.includes("finance")) {
    category = "Business"
  } else if (
    contentLower.includes("education") ||
    contentLower.includes("learning") ||
    contentLower.includes("student")
  ) {
    category = "Education"
  } else if (
    contentLower.includes("ai") ||
    contentLower.includes("artificial intelligence") ||
    contentLower.includes("machine learning")
  ) {
    category = "AI"
  }

  // Extract tags
  const tags = []
  if (contentLower.includes("ai") || contentLower.includes("artificial intelligence")) tags.push("AI")
  if (contentLower.includes("business")) tags.push("Business")
  if (contentLower.includes("technology")) tags.push("Technology")
  if (contentLower.includes("education")) tags.push("Education")
  if (contentLower.includes("innovation")) tags.push("Innovation")
  if (contentLower.includes("healthcare")) tags.push("Healthcare")
  if (contentLower.includes("finance")) tags.push("Finance")

  const readTime = Math.ceil(aiText.split(" ").length / 200)

  // 8. Create local MDX file
  const blogDir = path.join(process.cwd(), "blog")
  try {
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true })
    }
  } catch (error) {
    console.warn("Could not create blog directory:", error)
  }

  const filePath = `blog/${dateObj.toISOString().slice(0, 10)}-${slug}.mdx`
  const localFilePath = path.join(process.cwd(), filePath)

  const markdown = `---
title: "${title}"
description: "${description}"
date: "${dateObj.toISOString().split("T")[0]}"
category: "${category}"
tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]
readTime: ${readTime}
slug: "${slug}"
pubDate: "${pubDate}"
heroImage: "${heroImage}"
---

![${title}](${heroImage})

${aiText}
`

  try {
    fs.writeFileSync(localFilePath, markdown, "utf-8")
  } catch (err: any) {
    console.error("Error writing local file:", err.message)
  }

  // 9. Commit to GitHub
  try {
    const octo = new Octokit({ auth: ghToken })
    const { data: refData } = await octo.rest.git.getRef({ owner, repo, ref: `heads/${branch}` })
    const baseSha = refData.object.sha

    const { data: commitData } = await octo.rest.git.getCommit({ owner, repo, commit_sha: baseSha })
    const parentTree = commitData.tree.sha

    const { data: treeData } = await octo.rest.git.createTree({
      owner,
      repo,
      base_tree: parentTree,
      tree: [{ path: filePath, mode: "100644", type: "blob", content: markdown }],
    })

    const { data: newCommit } = await octo.rest.git.createCommit({
      owner,
      repo,
      message: `chore: add unified news article for ${dateObj.toISOString().slice(0, 10)}`,
      tree: treeData.sha,
      parents: [baseSha],
    })

    await octo.rest.git.updateRef({ owner, repo, ref: `heads/${branch}`, sha: newCommit.sha })
  } catch (err: any) {
    console.error("GitHub commit failed:", err.message)
    // Don't fail the entire request if GitHub commit fails
  }

  return NextResponse.json({
    success: true,
    message: "Unified article generated ✅",
    slug,
    title,
    category,
    description,
    heroImage,
  })
}

export async function GET() {
  return NextResponse.json({
    message: "AI Blog Post Generator API",
    endpoints: {
      "POST /api/generate-post": "Generate a new blog post using AI with NewsAPI, free images, and GitHub integration",
    },
  })
}
