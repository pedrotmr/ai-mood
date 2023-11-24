import { auth } from '@clerk/nextjs'
import Link from 'next/link'

const Home = () => {
  const { userId } = auth()

  const href = userId ? '/journal' : '/new-user'

  return (
    <div className="flex h-[100dvh]  w-screen items-center justify-center bg-black text-white">
      <div className="max-w-[600px]">
        <h1 className="mb-4 text-6xl">The best Journal app, period.</h1>
        <p className="mb-4 text-2xl text-white/60">
          This is the best app for tracking your mood through out your life. All
          you have to do is be honest.
        </p>
        <div>
          <Link href={href}>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
