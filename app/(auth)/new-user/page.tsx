import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const createNewUser = async (): Promise<void> => {
  const user = await currentUser()

  if (!user) return

  const match = await prisma.user.findUnique({
    where: { clerkId: user.id as string },
  })

  if (match) {
    return redirect('/journal')
  }

  const emailExists = await prisma.user.findUnique({
    where: { email: user.emailAddresses[0].emailAddress },
  })

  if (!emailExists) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    })
  }

  redirect('/journal')
}

const NewUser = async () => {
  await createNewUser()
  return null
}

export default NewUser
