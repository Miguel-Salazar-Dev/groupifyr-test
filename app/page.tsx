import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
// import { UserProfileProvider, useUserProfile } from './contexts/user-profile-context'
// import { Provider } from 'react-redux'
// import { setUserProfile } from '@/store/userProfileSlice'
// import { store } from '@/store/store'
import ClientRedirect from './components/client-redirect'

export default async function Home () {
  const supabase = createClient()

  let profile: UserProfile | null = null

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (user === null) {
      redirect('/login')
      return
    }

    const { data, error } = await supabase
      .from('profile')
      .select('name, username, avatar_url, admin, id_group, group!inner(name, background_img, logo_img, website)')
      .eq('id', user.id)
      .single()

    if (error !== null || data === null) {
      throw new Error('BD Error: Falla al cargar datos del perfil del usuario')
    }

    profile = {
      name: data.name,
      username: data.username,
      avatarurl: data.avatar_url,
      group_id: data.id_group ?? '',
      group_name: data.group.name,
      group_backgroud: data.group.background_img,
      group_logo: data.group.logo_img,
      group_website: data.group.website ?? '',
      isAdmin: data.admin ?? false
    }

    // Dispatch profile to Redux store
    // store.dispatch(setUserProfile(profile))
    // Redirect based on admin status
    // redirect('test')
    // if (profile?.isAdmin) {
    //  redirect('/admin')
    // } else {
    //  redirect('/inbox')
    // }
  } catch (error) {
    console.error('Error cargando los datos del perfil del usuario: ', Error)
    redirect('/login')
    return
  }

  return <ClientRedirect profile={profile} />
}
