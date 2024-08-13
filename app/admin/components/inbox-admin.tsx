'use client'

import FilterOption from './filter-options'
import { MessageList } from '@/app/components/messsage-list'
import { useState } from 'react'
import NavbarAdmin from '@/app/components/admin/navbar-admin'
import SidebarLeft from '@/app/components/admin/sidebar-left'

export default function InboxAdmin ({
  profile,
  messages
}: {
  profile: UserProfile
  messages: MessageWithAuthor[]
}) {
  // Group information
  const profileBackgroundImage = profile?.group_backgroud
  const [filtro, setFiltro] = useState<string | null>(null)

  const handleFilterChange = (categoriaSeleccionada: string | null) => {
    setFiltro(categoriaSeleccionada)
  }

  const filteredMessages = filtro === null
    ? messages
    : messages.filter(message => message.category === filtro)

  return (
    <main className="flex min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white">
      <NavbarAdmin profile={profile} />
      <SidebarLeft profileBackgroundImage={profileBackgroundImage} />
      <aside id="separator-sidebar-right" className='fixed top-0 right-0 z-45 w-32 h-screen transition-transform -translate-x-full sm:translate-x-0' aria-label="Filter sidebar">
        <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
          <div className='flex flex-col space-y-2 font-normal h-full w-full items-start justify-center'>
            <FilterOption onChange={handleFilterChange} />
          </div>
        </div>
      </aside>

      <div className='pt-14 max-w-[600px] w-11/12 mx-auto border-l border-r border-gray-200 dark:border-white/80 min-h-screen'>
        <div className='flex-1 overflow-y-auto'>
          <MessageList messages={filteredMessages} />
          <div className='flex flex-col w-full h-24' />
        </div>
      </div>
    </main>
  )
}
