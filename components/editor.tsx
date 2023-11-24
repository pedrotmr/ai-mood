'use client'

import { updateEntry } from '@/utils/api'
import { TrashIcon } from '@heroicons/react/20/solid'
import { JournalEntry } from '@prisma/client'
import { useState } from 'react'
import DeleteModal from './delete-modal'
import Spinner from './spinner'

const Editor = ({ entry }: { entry: JournalEntry }) => {
  const [value, setValue] = useState(entry?.content)
  const [isSaving, setIsSaving] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    await updateEntry(entry.id, value)
    setIsSaving(false)
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex h-full flex-col rounded-lg border border-gray-200 bg-gray-50 shadow"
      >
        <div className="grow rounded-lg bg-white">
          <textarea
            className={`h-full w-full resize-none rounded-lg p-6 text-xl outline-none duration-500 ${
              isSaving && 'bg-slate-300 text-gray-500'
            }`}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isSaving}
            placeholder="Write about your day"
          />
        </div>

        <div className="flex justify-between border-t p-4">
          <button
            type="submit"
            // className="flex items-center rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white  duration-500 hover:bg-blue-800"
            disabled={value.length < 1}
            className={`flex items-center rounded-lg px-4 py-2 font-semibold text-white duration-500 ${
              value.length < 1
                ? 'cursor-not-allowed bg-blue-200'
                : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            {isSaving ? (
              <>
                <Spinner className="mr-2" /> Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center rounded p-2 px-3 text-gray-500  duration-300 hover:bg-gray-100 hover:text-gray-900"
            onClick={() => setDeleteModalOpen(true)}
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </form>

      <DeleteModal
        isOpen={deleteModalOpen}
        closeModal={() => setDeleteModalOpen(false)}
        id={entry.id}
      />
    </>
  )
}

export default Editor
