import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  const user = await getUserByClerkId()

  const { content } = await request.json()

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      id: params.id,
    },
    data: {
      content,
    },
  })

  if (user?.id !== updatedEntry?.userId) {
    throw new Error("User ID does not match the entry's user ID")
  }

  const analysys = await analyze(updatedEntry.content)

  if (analysys) {
    await prisma.analysys.upsert({
      where: {
        entryId: updatedEntry.id,
      },
      update: { ...analysys },
      create: {
        userId: user?.id,
        entryId: updatedEntry.id,
        ...analysys,
      },
    })
  }

  return NextResponse.json({ data: updatedEntry })
}

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  await prisma.journalEntry.delete({
    where: {
      id: params.id,
    },
  })
  return NextResponse.json({ data: { id: params.id } })
}
