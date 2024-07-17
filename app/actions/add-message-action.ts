'use server'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export const addMessage = async (formData: FormData) => {
  const content = formData.get('content')
  if (content == null) return

  const supabase = createServerComponentClient({ cookies })
  // Revisar autenticación del usuario
  const { data: { user } } = await supabase.auth.getUser()
  if (user == null) return

  await supabase.from('messages').insert({ content, user_id: user.id })

  revalidatePath('/')
}
