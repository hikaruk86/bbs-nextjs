'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  threadId: string
}

export default function ReplyForm({ threadId }: Props) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch('/api/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadId,
          content,
          author
        }),
      })

      if (!res.ok) throw new Error('返信に失敗しました')

      setContent('')
      setAuthor('')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('返信に失敗しました')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="投稿者名（省略可）"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
        />
      </div>
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="返信内容"
          className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          返信する
        </button>
      </div>
    </form>
  )
} 