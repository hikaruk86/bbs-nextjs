import { Thread } from '@prisma/client'
import Link from 'next/link'

type ThreadWithCount = Thread & {
  _count: {
    replies: number
  }
}

type Props = {
  threads: ThreadWithCount[]
  currentPage: number
  totalPages: number
}

export default function ThreadList({ threads, currentPage, totalPages }: Props) {
  // ページネーションリンクを生成する関数
  const createPageLink = (page: number) => {
    return `?page=${page}`
  }

  return (
    <div className="bg-white p-4 rounded-b">
      <div className="notice-box mb-4">
        <h2 className="font-bold mb-2">この掲示板について【必ずお読みください】</h2>
        <p>この掲示板は、取引専用です。ただし、アバターの取引は、できません。</p>
        <p className="mt-2">交渉ではないコメントや取引する気のないコメントはすべて不正投稿です。</p>
        <p className="mt-2">【仕様変更：10月2日17:00～】返信コメントの投稿にあわせてスレッドが先頭に移動する機能は停止されました。</p>
        <p className="mt-2">スレッド主は、自分のスレッドを確認しやすいように「お気に入り」「ブックマーク」などの機能を活用してください。</p>
        <p className="mt-2">返信者は、スレッドが作成された日時や、返信コメントの日時を確認して、交渉の参考にしてください。</p>
      </div>

      <table className="thread-table">
        <thead>
          <tr>
            <th>トピックス</th>
            <th className="w-24 text-center">投稿者</th>
            <th className="w-16 text-center">返信</th>
            <th className="w-32">投稿日時</th>
          </tr>
        </thead>
        <tbody>
          {threads.map((thread) => (
            <tr key={thread.id} className="thread-row hover:bg-gray-50">
              <td>
                <Link href={`/threads/${thread.id}`} className="text-blue-600 hover:underline">
                  {thread.title}
                </Link>
              </td>
              <td className="text-center">{thread.author || '名無し'}</td>
              <td className="text-center">{thread._count.replies}</td>
              <td>{new Date(thread.createdAt).toLocaleString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {currentPage > 1 && (
            <Link
              href={createPageLink(currentPage - 1)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              前へ
            </Link>
          )}
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={createPageLink(page)}
              className={`px-4 py-2 rounded transition-colors ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page}
            </Link>
          ))}

          {currentPage < totalPages && (
            <Link
              href={createPageLink(currentPage + 1)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              次へ
            </Link>
          )}
        </div>
      )}
    </div>
  )
} 