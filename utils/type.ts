import { Analysys, JournalEntry } from '@prisma/client'

export type JournalWithAnalysys = JournalEntry & {
  analysys: Analysys
}
