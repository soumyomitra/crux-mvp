// src/app/layout.tsx
'use client'

import './globals.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <header className="flex justify-between items-center px-6 py-4 bg-white text-black shadow">
          <Link href="/" className="text-xl font-bold">Crux.ai</Link>
          <nav className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/past-digests">Past Digests</Link>
            {user ? (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut()
                    window.location.reload()
                  }}
                  className="text-red-600 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </nav>
        </header>
        <main className="p-8">{children}</main>
      </body>
    </html>
  )
}
