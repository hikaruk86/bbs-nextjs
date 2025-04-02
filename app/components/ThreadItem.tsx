import { Thread } from '../types/thread'

export default function ThreadItem({ thread }: { thread: Thread }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">
        <a href={`/thread/${thread.id}`} className="text-blue-600 hover:underline">
          {thread.title}
        </a>
      </td>
      <td className="p-3">{thread.author}</td>
      <td className="p-3 text-center">{thread.replies}</td>
      <td className="p-3 text-sm">
        {new Date(thread.createdAt).toLocaleString('ja-JP')}
      </td>
    </tr>
  )
} 