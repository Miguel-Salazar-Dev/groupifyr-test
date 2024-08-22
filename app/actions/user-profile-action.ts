'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GetUserProfile () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }

  const { data } = await supabase
    .from('profile')
    .select('*, group!inner(*)')
    .eq('id', user?.id ?? '')
    .single()

  const profile = {
    name: data?.name ?? '',
    username: data?.username ?? '',
    avatarurl: data?.avatar_url ?? '',
    group_name: data?.group.name ?? '',
    group_id: data?.group.id ?? '',
    group_backgroud: data?.group.background_img ?? '',
    group_logo: data?.group.logo_img ?? '',
    group_website: data?.group.website ?? '',
    isAdmin: data?.admin ?? false
  }

  return profile
}
