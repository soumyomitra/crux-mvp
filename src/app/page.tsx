'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">Get Started in Two Simple Steps</h1>

      <div className="w-full max-w-3xl space-y-8">
        {/* Step 1 */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white text-xl font-bold">1</div>
          <div>
            <h2 className="text-xl font-semibold mb-1">Log in with Google</h2>
            <p className="text-gray-600">Connect your Google account to get started with Crux Digest.</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white text-xl font-bold">2</div>
          <div>
            <h2 className="text-xl font-semibold mb-1">Auto-forward your email newsletters</h2>
            <p className="text-gray-600 mb-2">
              Set up auto-forwarding for your newsletter emails to our processing address:
            </p>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-md font-medium mb-2">
              📧 cruxmvp@gmail.com
            </div>
            <br />
            <Link
              href="https://support.google.com/mail/answer/10957?hl=en"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              How to set up Gmail auto-forwarding
            </Link>
          </div>
        </div>
      </div>

      {/* Completion Message */}
      <p className="mt-10 text-center text-gray-700 text-lg font-medium">
        ✅ Your digest will be ready at <strong>7am PT</strong> the following day!
      </p>

      <footer className="mt-16 text-gray-400 text-sm">
        © 2025 Crux AI · <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
      </footer>
    </main>
  )
}
