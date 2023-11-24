'use client'

import { Analysys } from '@prisma/client'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

type DataType = {
  sentimentScore: number
}

const CustomTooltip = ({ payload, label, active }) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (active) {
    const analysis = payload[0]?.payload
    return (
      <div className="relative rounded-lg border border-black/10 bg-white/5 p-8 shadow-md backdrop-blur-md">
        <div
          className="absolute left-2 top-2 h-2 w-2 rounded-full"
          style={{ background: analysis?.color }}
        ></div>
        <p className="text-sm text-black/30">{dateLabel}</p>
        <p className="text-xl uppercase">{analysis?.mood}</p>
      </div>
    )
  }

  return null
}

const HistoryChart = ({ data }: { data: Analysys[] }) => {
  if (data.length === 0) return null

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          // stroke='#dadadada'
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis
          dataKey="updatedAt"
          tick={{ fill: '#d8d8d8' }}
          axisLine={{ stroke: '#d8d8d8' }}
          tickFormatter={(str) => {
            const date = new Date(str)
            return date.toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: '2-digit',
            })
          }}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
