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
    <main className="flex min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white">
      <NavbarAdmin onOptionSelect={setOptionMenu} profile={profile} />
      {optionMenu === 'IconInbox' && <InboxAdmin profile={profile} />}
      {optionMenu === 'IconSend' && <SendAdmin />}
    </main>
  )
}
