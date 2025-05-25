import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: true,
  },
}

// Define the expected request shape
type TTSRequest = {
  text: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { text } = req.body as TTSRequest
  if (!text) {
    return res.status(400).json({ error: 'Missing text input' })
  }

  try {
    const elevenApiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY
    const voiceId = process.env.ELEVENLABS_VOICE_ID || 'onwK4e9ZLuTAKqWW03F9'

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': elevenApiKey!,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('TTS API Error:', errorText)
      return res.status(500).json({ error: 'TTS API failed', details: errorText })
    }

    const audioBuffer = await response.arrayBuffer()
    res.setHeader('Content-Type', 'audio/mpeg')
    res.status(200).send(Buffer.from(audioBuffer))
  } catch (err) {
    const error = err as Error
    console.error('Server error:', error)
    res.status(500).json({ error: 'Unexpected error', message: error.message })
  }
}
