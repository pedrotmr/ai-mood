import capitalize from '@/utils/capitalize'
import { Analysys } from '@prisma/client'

const SentimentalAnalysis = ({ analysys }: { analysys: Analysys }) => {
  const { summary, subject, mood, negative, color, sentimentScore } =
    analysys ?? {}

  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: capitalize(subject) },
    { name: 'Mood', value: capitalize(mood) },
    { name: 'Negative', value: capitalize(negative.toString()) },
    { name: 'Sentiment Score', value: sentimentScore },
  ]

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div
        style={{ backgroundColor: color }}
        className="border-b border-black/10 px-6 py-8"
      >
        <h2 className="text-2xl">Analysis</h2>
      </div>
      <div>
        <ul>
          {analysisData.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between border-b border-black/10 p-4"
            >
              <span className="pr-8 text-lg font-semibold">{item.name}</span>
              <span className='text-right'>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SentimentalAnalysis
