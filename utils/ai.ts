import { JournalEntry } from '@prisma/client'
import { loadQARefineChain } from 'langchain/chains'
import { Document } from 'langchain/document'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { z } from 'zod'

const openAIModel = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  modelName: 'gpt-3.5-turbo',
})

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
  })
)

const getPrompt = async (content: string): Promise<string> => {
  const formattedInstructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{formattedInstructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { formattedInstructions },
  })
  const input = await prompt.format({ entry: content })
  return input
}

export const analyze = async (content: string) => {
  const input = await getPrompt(content)
  const result = await openAIModel.call(input)

  try {
    return parser.parse(result)
  } catch (error) {
    console.log('error: ', error)
  }
}

export const qa = async (
  question: string,
  entries: Partial<JournalEntry>[]
) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content as string,
        metadata: {
          source: entry.id,
          date: entry.createdAt,
        },
      })
  )
  const chain = loadQARefineChain(openAIModel)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  })
  return res.output_text
}
