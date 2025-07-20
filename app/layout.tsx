import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

// Use Vercel's official font
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "AI News Hub",
  description: "Your daily dose of AI-generated news and insights.",
  generator: "Next.js",
  applicationName: "AI News Hub",
  keywords: ["AI", "News", "Technology", "Blog", "Vercel"],
  authors: [{ name: "Vercel" }],
  creator: "Vercel",
  publisher: "Vercel",
  metadataBase: new URL("https://biz-news.vercel.app"), // Replace with your actual domain
  openGraph: {
    title: "AI News Hub",
    description: "Your daily dose of AI-generated news and insights.",
    url: "https://biz-news.vercel.app",
    siteName: "AI News Hub",
    images: [
      {
        url: "/og-image.jpg", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "AI News Hub",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI News Hub",
    description: "Your daily dose of AI-generated news and insights.",
    images: ["/og-image.jpg"], // Replace with your actual Twitter image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
