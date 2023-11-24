'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const QuestionInput = () => {
  const [value, setValue] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const answer = await askQuestion(value)
    setAnswer(answer)
    setValue('')
    setIsLoading(false)
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Ask a question"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-11 rounded-lg border border-black/20 px-4 py-2 text-lg"
        />
        <button
          type="submit"
          className="ml-2 h-11 rounded-lg bg-blue-400 px-4 py-2 text-lg duration-300 hover:bg-blue-500"
        >
          Ask
        </button>
      </form>
      {isLoading && <div>...loading</div>}
      {answer && <div>{answer}</div>}
    </>
  )
}

export default QuestionInput
