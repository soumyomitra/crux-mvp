// src/app/login/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { signInWithGoogle } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/dashboard')
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Crux Digest</h1>
      <button
        onClick={signInWithGoogle}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg"
      >
        Sign in with Google
      </button>
    </main>
  )
}
