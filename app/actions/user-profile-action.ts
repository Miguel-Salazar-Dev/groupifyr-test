'use server'

import { createClient } from '@/utils/supabase/server'

export async function GetUserProfile () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) return

  const { data } = await supabase
    .from('profile')
    .select('*, group!inner(name)')
    .eq('id', user.id)
    .single()

  const profile = data
  return profile
}
