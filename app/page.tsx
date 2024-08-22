import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import ClientRedirect from './components/client-redirect'

export default async function Home () {
  const supabase = createClient()

  let isAdmin: boolean
  let groupId: string | null

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (user === null) {
      redirect('/login')
      return
    }

    const { data, error } = await supabase
      .from('profile')
      .select('admin, id_group')
      .eq('id', user.id)
      .single()

    if (error !== null || data === null) {
      throw new Error('BD Error: Falla al cargar datos del perfil del usuario')
    }

    isAdmin = data.admin
    groupId = data.id_group ?? null
  } catch (error) {
    console.error('Error cargando los datos del perfil del usuario: ', Error)
    redirect('/login')
    return
  }

  return <ClientRedirect isAdmin={isAdmin} groupId={groupId} />
}
