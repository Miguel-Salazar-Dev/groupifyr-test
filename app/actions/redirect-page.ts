'use server'

import { redirect } from 'next/navigation'

export async function redirectLogIn () {
  redirect('/login')
}

export async function redirectAdmin () {
  redirect('/admin')
}

export async function redirectHome () {
  redirect('/')
}
