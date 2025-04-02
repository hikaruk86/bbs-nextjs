import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'

const ITEMS_PER_PAGE = 20

export default async function SearchPage({
  searchParams
}: {
  searchParams: { title?: string; content?: string; page?: string }
}) {
  const resolvedParams = await Promise.resolve(searchParams)
  const titleQuery = resolvedParams.title || ''
  const contentQuery = resolvedParams.content || ''
  const currentPage = Number(resolvedParams.page) || 1
  
  const where = {
    AND: [
      titleQuery ? { title: { contains: titleQuery } } : {},
      contentQuery ? { content: { contains: contentQuery } } : {}
    ]
  }

  // 総件数を取得
  const totalCount = (titleQuery || contentQuery)
    ? await prisma.thread.count({ where })
    : 0

  // ページ数を計算
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
  
  // スレッドを取得
  const threads = (titleQuery || contentQuery)
    ? await prisma.thread.findMany({
        where,
        include: {
          _count: {
            select: { replies: true }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        },
        skip: (currentPage - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE
      })
    : []

  // ページネーションリンクを生成する関数
  const createPageLink = (page: number) => {
    const params = new URLSearchParams()
    if (titleQuery) params.set('title', titleQuery)
    if (contentQuery) params.set('content', contentQuery)
    params.set('page', page.toString())
    return `?${params.toString()}`
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">検索</h1>
            <Link 
              href="/"
              className="text-blue-200 hover:text-white transition-colors"
            >
              ← 戻る
            </Link>
          </div>
          <div className="mt-2">
            <form className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    name="title"
                    defaultValue={titleQuery}
                    placeholder="タイトルで検索"
                    className="w-full px-4 py-2 rounded-md text-gray-900"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    name="content"
                    defaultValue={contentQuery}
                    placeholder="本文で検索"
                    className="w-full px-4 py-2 rounded-md text-gray-900"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  検索
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 検索結果 */}
        <div className="p-6">
          {(titleQuery || contentQuery) && (
            <p className="mb-4 text-gray-600">
              {[
                titleQuery && `タイトル:「${titleQuery}」`,
                contentQuery && `本文:「${contentQuery}」`
              ].filter(Boolean).join(' AND ')}
              の検索結果: {totalCount}件
            </p>
          )}
          
          <div className="space-y-4">
            {threads.map((thread) => (
              <div key={thread.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <Link 
                  href={`/threads/${thread.id}`}
                  className="block"
                >
                  <h2 className="text-lg font-bold text-blue-600 hover:underline mb-2">
                    {thread.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2 mb-2">
                    {thread.content}
                  </p>
                  <div className="text-sm text-gray-500 flex gap-4">
                    <span>投稿者: {thread.author || '名無し'}</span>
                    <span>返信: {thread._count.replies}</span>
                    <span>
                      投稿日時: {new Date(thread.createdAt).toLocaleString('ja-JP')}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
            
            {(titleQuery || contentQuery) && threads.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                検索結果が見つかりませんでした。
              </p>
            )}

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
        </div>
      </div>
    </main>
  )
} 