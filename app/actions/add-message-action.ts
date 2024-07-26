'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export const addMessage = async (formData: FormData) => {
  const content = formData.get('content') as string
  if (content == null) return

  const supabase = createClient()
  // Revisar autenticación del usuario
  const { data: { user } } = await supabase.auth.getUser()
  if (user == null) return

  await supabase.from('messages').insert({ content, user_id: user.id })

  revalidatePath('/')
}
