import { createClient } from '@/utils/supabase/client'
// import { GetUserProfile } from '../actions/user-profile-action'
// import { redirect } from 'next/navigation'
import InboxAdmin from './components/inbox-admin'
// import { redirect } from 'next/navigation'
import NavbarAdmin from '../components/admin/navbar-admin'

export default async function AdminPage () {
  // const { userProfile: profile } = useUserProfile()
  if (profile === null) {
    console.error('Error al cargar el perfil del usuario al Navbar')
  }
  // const profile = await GetUserProfile()
  // if (!profile.isAdmin) redirect('/')
  // const profileGroupId = profile.group_id
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id ?? ''

  return (
    <main className="flex min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white">
      <NavbarAdmin profile={profile} />
      <InboxAdmin profileGroupId={profileGroupId} userId={userId} />
    </main>
  )
}
