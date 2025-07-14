"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, User, Calendar } from "lucide-react"

interface Comment {
  id: string
  name: string
  comment: string
  joinDate: string
  createdAt: string
}

interface CommentSectionProps {
  postSlug: string
}

export function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Load comments from localStorage
    const savedComments = localStorage.getItem(`comments-${postSlug}`)
    if (savedComments) {
      setComments(JSON.parse(savedComments))
    }
  }, [postSlug])

  const saveComments = (newComments: Comment[]) => {
    localStorage.setItem(`comments-${postSlug}`, JSON.stringify(newComments))
    setComments(newComments)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !comment.trim()) return

    setIsSubmitting(true)

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      comment: comment.trim(),
      joinDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }

    const updatedComments = [newComment, ...comments]
    saveComments(updatedComments)

    setName("")
    setComment("")
    setIsSubmitting(false)
  }

  return (
    <div className="mt-12 font-mono">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-[#F5A353]" />
            Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-mono"
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Share your thoughts..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] font-mono"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || !name.trim() || !comment.trim()}
              className="bg-[#F5A353] hover:bg-[#E8944A] text-white font-mono"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              comments.map((comment) => (
                <Card key={comment.id} className="bg-gray-50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-[#F5A353]" />
                      <span className="font-semibold text-sm">{comment.name}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Joined {comment.joinDate}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{comment.createdAt}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{comment.comment}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
