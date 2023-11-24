import Editor from '@/components/editor'
import SentimentalAnalysis from '@/components/sentimental-analysis'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { JournalWithAnalysys } from '@/utils/type'

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: { id },
    include: { analysys: true },
  })
  if (user?.id !== entry?.userId) {
    throw new Error("User ID does not match the entry's user ID")
  }
  return entry as JournalWithAnalysys
}

const JournalEntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id)

  const { analysys } = entry ?? {}

  return (
    <div className="grid h-full grid-cols-1 gap-y-2 lg:grid-cols-3 lg:gap-4">
      <div className={`${analysys ? 'col-span-2' : 'col-span-3'}`}>
        <Editor entry={entry} />
      </div>

      {analysys && <SentimentalAnalysis analysys={analysys} />}
    </div>
  )
}

export default JournalEntryPage
