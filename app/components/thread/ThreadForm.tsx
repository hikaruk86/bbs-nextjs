'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ThreadForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch('/api/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, author }),
      })

      if (!res.ok) throw new Error('投稿に失敗しました')

      router.push('/')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('投稿に失敗しました')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          タイトル
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          投稿者名
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="省略可"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          本文
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          投稿する
        </button>
      </div>
    </form>
  )
} 