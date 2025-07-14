import { Bot } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin mb-4">
          <Bot className="h-12 w-12 text-[#F5A353] mx-auto" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading AI Insights...</h2>
        <p className="text-gray-600">Our AI is processing the latest information for you.</p>
      </div>
    </div>
  )
}
