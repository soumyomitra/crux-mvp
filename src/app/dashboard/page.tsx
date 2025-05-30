import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { playTextFromAPI } from '@/lib/tts'

export default function Dashboard() {
  const [userName, setUserName] = useState('')
  const [digestDates, setDigestDates] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [topics, setTopics] = useState<{ topic: string; summary: string; sources?: string[] }[]>([])
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    async function checkAuthAndFetchDates() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setRedirecting(true)
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
        return
      }

      setUserName(user.user_metadata.full_name || user.email)

      const { data, error } = await supabase
        .from('daily_digests')
        .select('digest_date')
        .eq('user_id', user.id)
        .order('digest_date', { ascending: false })

      if (error) console.error('Date fetch error:', error.message)
      else if (data.length > 0) {
        const dates = data.map((row) => row.digest_date)
        setDigestDates(dates)
        setSelectedDate(dates[0])
      }

      setAuthChecked(true)
    }
    checkAuthAndFetchDates()
  }, [])

  useEffect(() => {
    async function fetchDigest() {
      if (!selectedDate) return

      const { data: { user } } = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from('daily_digests')
        .select('topics')
        .eq('user_id', user.id)
        .eq('digest_date', selectedDate)
        .single()

      if (error) console.error('Digest fetch error:', error.message)
      else setTopics(data.topics || [])
      setCurrentIndex(null)
    }
    fetchDigest()
  }, [selectedDate])

  const speakTopic = async (index: number) => {
    if (index < 0 || index >= topics.length) return
    setIsLoadingAudio(true)
    try {
      const topic = topics[index]
      setCurrentIndex(index)
      setIsPlaying(true)

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }

      const audio = await playTextFromAPI(`${topic.topic}. ${topic.summary}`)
      audioRef.current = audio
      audio.onended = () => {
        if (index < topics.length - 1) {
          speakTopic(index + 1)
        } else {
          setIsPlaying(false)
          setCurrentIndex(null)
        }
      }
      await audio.play()
    } catch (err) {
      console.error('Audio playback error:', err)
    } finally {
      setIsLoadingAudio(false)
    }
  }

  const handlePlay = () => {
    if (currentIndex === null) speakTopic(0)
    else {
      audioRef.current?.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }

  const handleNext = () => {
    if (currentIndex !== null && currentIndex < topics.length - 1) speakTopic(currentIndex + 1)
  }

  const handlePrevious = () => {
    if (currentIndex !== null && currentIndex > 0) speakTopic(currentIndex - 1)
  }

  if (redirecting) return <main className="flex items-center justify-center min-h-screen bg-black text-white text-xl">Redirecting to login…</main>
  if (!authChecked) return <main className="flex items-center justify-center min-h-screen bg-black text-white text-xl">Loading dashboard…</main>

  return (
    <main className="flex min-h-screen bg-black text-white px-4 py-8 pb-24">
      <div className="w-1/2 pr-8">
        <h1 className="text-4xl font-bold mb-4">Hello, {userName}</h1>
        <div className="mb-4">
          <label className="block text-sm mb-2 font-semibold">Select a Digest Date</label>
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded w-full"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {digestDates.map((date) => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>

        <ul className="space-y-2">
          {topics.map((t, idx) => (
            <li
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`cursor-pointer p-3 rounded ${currentIndex === idx ? 'bg-blue-700' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              {t.topic} {t.sources ? `(${t.sources.length} mention${t.sources.length > 1 ? 's' : ''})` : ''}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-1/2 pl-8">
        {currentIndex !== null && topics[currentIndex] && (
          <div className="bg-gray-900 p-6 rounded shadow text-left">
            <h3 className="text-2xl font-bold mb-2">{topics[currentIndex].topic}</h3>
            <p className="text-white text-lg">{topics[currentIndex].summary}</p>
            {Array.isArray(topics[currentIndex].sources) && topics[currentIndex].sources.length > 0 && (
              <p className="text-sm text-gray-400 mt-4">
                <strong>Sources:</strong> {topics[currentIndex].sources.join(', ')}
              </p>
            )}
          </div>
        )}
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 shadow-lg flex items-center justify-center gap-6 z-50">
        <button onClick={handlePrevious} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg disabled:opacity-50" disabled={isLoadingAudio}>⏮ Prev</button>
        <button
          onClick={isPlaying ? handlePause : handlePlay}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full shadow-lg text-white ${isPlaying ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'} disabled:opacity-50`}
          disabled={isLoadingAudio}
        >
          {isLoadingAudio ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : isPlaying ? '⏸ Pause' : '▶️ Play'}
        </button>
        <button onClick={handleNext} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg disabled:opacity-50" disabled={isLoadingAudio}>⏭ Next</button>
      </footer>
    </main>
  )
}
