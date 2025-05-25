export async function playText(text: string) {
  console.log('Requesting TTS for text:', text)
  const res = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) {
    const errorDetails = await res.json()
    console.error('Failed to fetch TTS audio:', errorDetails)
    throw new Error('Failed to fetch TTS audio')
  }

  const audioBlob = await res.blob()
  const audioUrl = URL.createObjectURL(audioBlob)
  const audio = new Audio(audioUrl)
  await audio.play()
}

export async function playTextFromAPI(text: string): Promise<HTMLAudioElement> {
  const res = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const errorDetails = await res.json();
    console.error('Failed to fetch TTS audio:', errorDetails);
    throw new Error('Failed to fetch TTS audio');
  }

  const audioBlob = await res.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  return audio;
}

