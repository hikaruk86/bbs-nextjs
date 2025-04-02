import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

// スレッド作成
export async function POST(request: Request) {
  const body = await request.json()
  const thread = await prisma.thread.create({
    data: {
      title: body.title,
      content: body.content,
      author: body.author || '名無し'
    }
  })
  return NextResponse.json(thread)
} 