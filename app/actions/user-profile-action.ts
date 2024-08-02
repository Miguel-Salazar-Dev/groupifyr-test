'use server'

import { createClient } from '@/utils/supabase/server'

export async function GetUserProfile () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) return

  const { data } = await supabase
    .from('profile')
    .select('*, group!inner(*)')
    .eq('id', user.id)
    .single()

  const profile = {
    name: data?.name ?? '',
    username: data?.username ?? '',
    avatarurl: data?.avatar_url ?? '',
    group: data?.group.name ?? '',
    group_id: data?.group.id ?? ''
  }

  return profile
}
