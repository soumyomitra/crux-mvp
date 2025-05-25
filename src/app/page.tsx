'use client'
import { signInWithGoogle } from '@/lib/auth'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Crux.ai</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10">
          Your daily newsletter digest — summarized, de-duplicated, delivered.
        </p>
        <button
          onClick={signInWithGoogle}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-lg shadow"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  )
}
