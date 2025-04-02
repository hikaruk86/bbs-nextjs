import ThreadForm from '@/app/components/thread/ThreadForm'

export default function NewThread() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">新規トピックの作成</h1>
      <ThreadForm />
    </main>
  )
} 