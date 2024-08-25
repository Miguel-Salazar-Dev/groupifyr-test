import { createClient } from '@/utils/supabase/server'
import RegistrarseForm from './registrarse-form'
import { redirect } from 'next/navigation'

export default async function Registrarse () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }

  return <RegistrarseForm user_id={user.id} />
}
