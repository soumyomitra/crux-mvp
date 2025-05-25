'use client'

import Link from 'next/link'
import Image from 'next/image'
import { signInWithGoogle } from '@/lib/auth'


export default function HomePage() {
  return (
    <main className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative text-center px-8 py-20 z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Your Daily Newsletter Digest
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Summarized. De-duplicated. Audible. Wake up to a clean, concise digest—automatically delivered at <strong>7am PT</strong>.
        </p>
        <button
         onClick={signInWithGoogle}
          className="inline-block mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-lg"
        >
         Get Started with Google
         </button>

      </section>

      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="/newsletter-collage.png"
          alt="Newsletter collage"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Instructions Section */}
      <section className="relative z-10 px-6 py-20 max-w-4xl mx-auto space-y-10 bg-white bg-opacity-5 backdrop-blur-sm rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-white mb-12">Get Started in 3 Easy Steps</h2>

        <div className="space-y-10">
          {/* Step 1 */}
          <div className="flex items-start gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-xl text-white">1</div>
            <div>
              <h3 className="text-xl font-semibold">Set up auto-forwarding</h3>
              <p className="text-gray-200">Forward your newsletter emails to:</p>
              <code className="block mt-2 text-blue-300 bg-gray-800 px-4 py-2 rounded-md font-mono">
                cruxmvp@gmail.com
              </code>
              <Link
                href="https://support.google.com/mail/answer/10957"
                target="_blank"
                className="text-blue-400 hover:underline mt-2 inline-block"
              >
                How to set up Gmail auto-forwarding →
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-xl text-white">2</div>
            <div>
              <h3 className="text-xl font-semibold">Log in with Google</h3>
              <p className="text-gray-200">Connect your Gmail so we can associate digests with your inbox.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-xl text-white">3</div>
            <div>
              <h3 className="text-xl font-semibold">Get your digest at 7am PT</h3>
              <p className="text-gray-200">
                We’ll automatically summarize and voice your newsletters into a single daily digest. 🎧
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
