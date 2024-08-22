'use client'

import FilterOption from './filter-options'
import { MessageList } from '@/app/components/messsage-list'
import { Suspense, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function InboxAdmin ({ profile }: { profile: UserProfile | null }) {
  const supabase = createClient()
  const router = useRouter()
  const [filtro, setFiltro] = useState<string | null>(null)
  const [messages, setMessages] = useState<MessageWithAuthor[]>([])

  useEffect(() => {
    const getMessages = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user === null) {
        router.push('/login')
        return
      }

      const { data } = await supabase
        .from('messages')
        .select('*, author: profile!inner(*), attach: attachments!inner(*), smiles: smile(user_id)')
        .eq('profile.id_group', profile?.group_id ?? '')
        .is('profile.admin', false)
        .order('created_at', { ascending: false })

      const messages =
        data?.map((message) => {
          const hasSmiles = Array.isArray(message.smiles)
          const userHasSmiledMessage = hasSmiles
            ? message.smiles.some(
              (smile) => smile.user_id === user.id
            )
            : false
          const hasAttachment = Array.isArray(message.attach)

          return {
            ...message,
            author: Array.isArray(message.author) ? message.author[0] : message.author,
            message_has_attachment: hasAttachment,
            attach: Array.isArray(message.attach) ? message.attach[0] : message.attach,
            user_has_smiled_message: userHasSmiledMessage,
            smiles: hasSmiles ? message.smiles.length : 0
          }
        }) ?? []

      setMessages(messages)
    }
    getMessages()
  }, [profile?.group_id, router])

  const handleFilterChange = (categoriaSeleccionada: string | null) => {
    setFiltro(categoriaSeleccionada)
  }

  const filteredMessages = filtro === null
    ? messages
    : messages.filter(message => message.category === filtro)

  return (
    <section className='static max-w-[800px] mx-auto border-l border-r border-gray-200 dark:border-white/80 min-h-screen'>
      <div>
        <div className='px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded'>
          <div className='flex flex-col space-y-2 font-normal h-full w-full items-start justify-center'>
            <FilterOption onChange={handleFilterChange} />
          </div>
        </div>
        <div className='pt-14'>
          <div className='flex-1 overflow-y-auto'>
            <Suspense fallback={<p>Loading Messages...</p>}>
              <MessageList messages={filteredMessages} />
            </Suspense>
            <div className='flex flex-col w-full h-24' />
          </div>
        </div>
      </div>
    </section>
  )
}
