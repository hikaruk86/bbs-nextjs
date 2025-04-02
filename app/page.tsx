import BoardHeader from './components/BoardHeader'
import ThreadList from './components/ThreadList'
import { prisma } from './lib/prisma'

const ITEMS_PER_PAGE = 20

export default async function Home({
  searchParams
}: {
  searchParams: { page?: string }
}) {
  const resolvedParams = await Promise.resolve(searchParams)
  const currentPage = Number(resolvedParams.page) || 1

  // 総件数を取得
  const totalCount = await prisma.thread.count()

  // ページ数を計算
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  // スレッドを取得
  const threads = await prisma.thread.findMany({
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

  return (
    <main className="max-w-6xl mx-auto p-4">
      <BoardHeader />
      <ThreadList 
        threads={threads}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  )
}
