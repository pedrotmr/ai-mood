import EntryCard from '@/components/entry-card'
import NewEntryButton from '@/components/new-entry-button'
import QuestionInput from '@/components/question-input'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { JournalWithAnalysys } from '@/utils/type'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserByClerkId()

  if (!user?.id) return []

  const entries = await prisma.journalEntry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: { analysys: true },
  })

  return entries as JournalWithAnalysys[]
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <>
      <h2 className="mb-8 text-3xl text-white">Journal</h2>
      <div className="mb-8">
        <QuestionInput />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <NewEntryButton />

        {entries?.map((entry) => (
          <Link key={entry.id} href={`journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </>
  )
}

export default JournalPage
