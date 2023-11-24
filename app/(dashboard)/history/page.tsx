import HistoryChart from '@/components/history-charts'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUserByClerkId()
  const analyses = await prisma.analysys.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: 'asc' },
  })
  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const average = Math.round(sum / analyses.length)
  return { average, analyses }
}

const HistoryPage = async () => {
  const { average, analyses } = await getData()

  if (analyses.length === 0) {
    return <h3 className="mb-4 text-xl text-white">No journals yet.</h3>
  }

  return (
    <div className="grid h-full grid-cols-1">
      <h1 className="mb-4 text-2xl text-white">{`Avg. Sentiment: ${average}`}</h1>

      <div className="h-full w-full p-4">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default HistoryPage
