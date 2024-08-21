'use client'
import InboxAdmin from './components/inbox-admin'
import NavbarAdmin from '../components/admin/navbar-admin'
import SendAdmin from './components/send-admin'
import { useState } from 'react'

export default function AdminPage () {
  const [optionMenu, setOptionMenu] = useState<string>('IconInbox')

  return (
    <main className="flex min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white">
      <NavbarAdmin onOptionSelect={setOptionMenu} />
      {optionMenu === 'IconInbox' && <InboxAdmin />}
      {optionMenu === 'IconSend' && <SendAdmin />}
    </main>
  )
}
