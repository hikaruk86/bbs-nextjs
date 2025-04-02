import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// スレッド更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const thread = await prisma.thread.update({
      where: { id: params.id },
      data: {
        title: body.title,
        content: body.content
      }
    })
    return NextResponse.json(thread)
  } catch (error) {
    const err = error as Error
    console.error('Failed to update thread:', err.message)
    return NextResponse.json(
      { error: `Failed to update thread: ${err.message}` },
      { status: 500 }
    )
  }
}

// スレッド削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.thread.delete({
      where: { id: params.id }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    const err = error as Error
    console.error('Failed to delete thread:', err.message)
    return NextResponse.json(
      { error: `Failed to delete thread: ${err.message}` },
      { status: 500 }
    )
  }
} 