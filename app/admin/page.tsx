'use client'
import InboxAdmin from './components/inbox-admin'
import NavbarAdmin from '../components/admin/navbar-admin'
import SendAdmin from './components/send-admin'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GetUserProfile } from '../actions/user-profile-action'

export default function AdminPage () {
  const router = useRouter()
  const [optionMenu, setOptionMenu] = useState<string>('IconInbox')
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const getUserProfile = async () => {
      const profile: UserProfile = await GetUserProfile()
      if (profile === null) {
        router.push('/login')
      }
      setProfile(profile)
    }

    getUserProfile()
  }, [])

  return (
    <section className='flex w-full bg-gray-50 dark:bg-zinc-800 min-h-screen'>
      <NavbarAdmin onOptionSelect={setOptionMenu} profile={profile} />
      {optionMenu === 'IconInbox' && <InboxAdmin profile={profile} />}
      {optionMenu === 'IconSend' && <SendAdmin />}
    </section>
  )
}
