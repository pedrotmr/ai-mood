'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Spinner from './spinner'

const NewEntryButton = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const handleOnClick = async () => {
    setIsLoading(true)
    const data = await createNewEntry()
    if (data && 'id' in data) {
      router.push(`/journal/${data.id}`)
    }
    setIsLoading(false)
  }

  return (
    <button
      className="rounded-lg bg-white duration-200 hover:scale-105 hover:bg-gray-100 hover:shadow-lg active:scale-100"
      onClick={handleOnClick}
    >
      <div className="flex items-center justify-center px-4 py-5 sm:p-6">
        {isLoading ? (
          <Spinner className="h-1/6 w-1/6 text-blue-700" />
        ) : (
          <span className="text-3xl">New Entry</span>
        )}
      </div>
    </button>
  )
}

export default NewEntryButton
