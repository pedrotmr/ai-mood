import { JournalEntry } from '@prisma/client'
import { update } from './actions'

const createURL = (path: string): string => {
  return window.location.origin + path
}

export const createNewEntry = async (): Promise<JournalEntry | Boolean> => {
  const res = await fetch(
    new Request(createURL('/api/journal'), { method: 'POST' })
  )
  if (res.ok) {
    const { data } = await res.json()
    update(['/journal'])
    return data
  }
  return false
}

export const updateEntry = async (
  id: string,
  content: string
): Promise<JournalEntry | Boolean> => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )
  if (res.ok) {
    const { data } = await res.json()
    update(['/journal', `journal/${id}`])
    return data
  }
  return false
}

export const deleteEntry = async (id: string): Promise<Boolean> => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'DELETE',
    })
  )
  if (res.ok) {
    update(['/journal'])
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const askQuestion = async (question: string) => {
  const res = await fetch(
    new Request(createURL('/api/question'), { method: 'POST', body: JSON.stringify(question) })
  )
  if (res.ok) {
    const { data } = await res.json()
    return data
  }
  return false
}