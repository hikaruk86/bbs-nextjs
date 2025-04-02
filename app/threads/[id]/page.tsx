import { prisma } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import ReplyForm from '@/app/components/thread/ReplyForm'
import Link from 'next/link'

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const resolvedParams = await Promise.resolve(params)

  // スレッドと返信を同時に取得
  const thread = await prisma.thread.findUnique({
    where: { id: resolvedParams.id },
    include: {
      replies: {
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  })

  if (!thread) {
    notFound()
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* スレッドヘッダー */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{thread.title}</h1>
            <Link 
              href="/"
              className="text-blue-200 hover:text-white transition-colors"
            >
              ← 戻る
            </Link>
          </div>
          <div className="text-sm">
            <span className="mr-4">投稿者: {thread.author || '名無し'}</span>
            <span>投稿日時: {new Date(thread.createdAt).toLocaleString('ja-JP')}</span>
          </div>
        </div>

        {/* スレッド本文 */}
        <div className="p-6 border-b">
          <p className="whitespace-pre-wrap">{thread.content}</p>
        </div>

        {/* 返信セクション */}
        <div>
          <h2 className="px-6 py-8 text-xl font-bold text-gray-700">返信一覧</h2>
          
          {/* 返信一覧 */}
          <div className="space-y-4">
            {thread.replies.map((reply) => (
              <div key={reply.id} className="mx-6 p-6 bg-blue-50 rounded-lg">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{reply.author || '名無し'}</span>
                  <span>{new Date(reply.createdAt).toLocaleString('ja-JP')}</span>
                </div>
                <p className="whitespace-pre-wrap">{reply.content}</p>
              </div>
            ))}
          </div>

          {/* 返信フォーム */}
          <div className="mt-8 mx-6 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4">返信を投稿</h2>
            <ReplyForm threadId={thread.id} />
          </div>
        </div>
      </div>
    </main>
  )
} 