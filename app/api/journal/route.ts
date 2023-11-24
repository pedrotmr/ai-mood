import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const POST = async (): Promise<NextResponse> => {
  const user = await getUserByClerkId()

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user?.id as string,
      content: '',
    },
  })

  return NextResponse.json({ data: entry })
}
