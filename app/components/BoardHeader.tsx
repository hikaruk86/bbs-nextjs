import Link from 'next/link'

export default function BoardHeader() {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-t shadow-lg">
      <h1 className="text-2xl font-bold tracking-tight">チョコットランド取引BBS</h1>
      <div className="flex gap-6 mt-3">
        <Link 
          href="/threads/new" 
          className="flex items-center gap-2 hover:text-blue-200 transition-colors"
        >
          <span className="text-lg">📝</span>
          <span className="font-medium">新規作成</span>
        </Link>
        <Link 
          href="/search" 
          className="flex items-center gap-2 hover:text-blue-200 transition-colors"
        >
          <span className="text-lg">🔍</span>
          <span className="font-medium">検索</span>
        </Link>
      </div>
    </header>
  )
} 