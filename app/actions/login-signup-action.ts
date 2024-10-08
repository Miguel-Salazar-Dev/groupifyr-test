'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login (formData: FormData) {
  const supabase = createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error !== null) {
    console.error('Error al tratar de acceder con el correo.', error)
    return { error: error.message }
  } else {
    revalidatePath('/', 'layout')
    redirect('/')
  }
}

export async function signup (formData: FormData) {
  const supabase = createClient()

  const name = formData.get('name') as string
  const avatar_url = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar_url
      }
    }
  })

  if (error !== null) {
    console.error('Error al tratar de acceder con el correo.', error)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
