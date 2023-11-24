import { auth } from '@clerk/nextjs'
import { User } from '@prisma/client'
import { prisma } from './db'

export const getUserByClerkId = async (): Promise<User | null> => {
  const { userId } = auth()

  if (userId == null) return null

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  return user
}
