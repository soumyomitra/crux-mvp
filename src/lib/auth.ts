// src/lib/auth.ts
import { supabase } from './supabaseClient'

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
  if (error) console.error('Google Sign-In Error:', error.message)
}

export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) console.error('Get User Error:', error.message)
  return user
}
