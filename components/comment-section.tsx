"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, User, Calendar } from "lucide-react"

interface Comment {
  id: string
  name: string
  content: string
  joinDate: string
  timestamp: string
}

interface CommentSectionProps {
  postSlug: string
}

export function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [userName, setUserName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Load comments from localStorage
    const savedComments = localStorage.getItem(`comments-${postSlug}`)
    if (savedComments) {
      setComments(JSON.parse(savedComments))
    }
  }, [postSlug])

  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem(`comments-${postSlug}`, JSON.stringify(updatedComments))
    setComments(updatedComments)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !userName.trim()) return

    setIsSubmitting(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const comment: Comment = {
      id: Date.now().toString(),
      name: userName.trim(),
      content: newComment.trim(),
      joinDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }),
      timestamp: new Date().toISOString(),
    }

    const updatedComments = [comment, ...comments]
    saveComments(updatedComments)

    setNewComment("")
    setUserName("")
    setIsSubmitting(false)
  }

  return (
    <div className="border-t border-border pt-12">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-[#F5A353]" />
        <h2 className="text-2xl font-bold text-foreground">Comments ({comments.length})</h2>
      </div>

      {/* Comment Form */}
      <Card className="mb-8 bg-background border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Leave a Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="font-mono bg-background border-border"
              required
            />
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] font-mono bg-background border-border"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting || !newComment.trim() || !userName.trim()}
              className="bg-[#F5A353] hover:bg-[#E8944A] text-white font-mono"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card className="bg-background border-border">
            <CardContent className="py-8 text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-mono">No comments yet. Be the first to share your thoughts!</p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="bg-background border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-[#F5A353]/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-[#F5A353]" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground font-mono">{comment.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                      <Calendar className="h-3 w-3" />
                      <span>Joined {comment.joinDate}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground font-mono leading-relaxed">{comment.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
