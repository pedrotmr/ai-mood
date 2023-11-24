import { JournalWithAnalysys } from '@/utils/type'

const EntryCard = ({ entry }: { entry: JournalWithAnalysys }) => {
  const date = new Date(entry.createdAt).toDateString()

  const { analysys } = entry ?? {}

  return (
    <div className="flex flex-col divide-y divide-gray-200 rounded-lg bg-white p-4 duration-200 hover:scale-105 hover:bg-gray-50 hover:shadow-lg active:scale-100">
      <div className="p-4 sm:px-6">{date}</div>
      <div className="p-4 sm:px-6">{analysys?.subject}</div>
      {/* <div className="p-4 sm:px-6">{analysys?.mood}</div> */}
      <div className="p-4 sm:px-6">{analysys?.sentimentScore}</div>
    </div>
  )
}

export default EntryCard
