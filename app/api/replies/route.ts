import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const reply = await prisma.reply.create({
    data: {
      content: body.content,
      author: body.author || '名無し',
      threadId: body.threadId
    }
  })
  return NextResponse.json(reply)
} 