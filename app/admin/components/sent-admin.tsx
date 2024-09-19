import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import FilterOption from './filter-options'
import { MessageList } from '@/app/components/messsage-list'

export default function SentAdmin ({ groupId }: { groupId: string }) {
  const supabase = createClient()
  const router = useRouter()
  const [filtro, setFiltro] = useState<string | null>(null)
  const [messages, setMessages] = useState<MessageWithAuthor[]>([])

  useEffect(() => {
    const getMessages = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user === null) {
        console.error('Error intentando obtener datos de Usuario')
        router.push('/login')
        return
      }

      const { data } = await supabase
        .from('messages')
        .select('*, author: profile!inner(*), attach: attachments!inner(*), smiles: smile(user_id)')
        .eq('profile.id_group', groupId)
        .is('profile.admin', true)
        .order('created_at', { ascending: false })

      const messages = data?.map((message) => {
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
  }, [])

  const handleFilterChange = (categoriaSeleccionada: string | null) => {
    setFiltro(categoriaSeleccionada)
  }

  const filteredMessages = filtro === null
    ? messages
    : messages.filter(message => message.category === filtro)

  return (
    <section className='static md:min-w-[600px] lg:min-w-[800px] max-w-[800px] mx-auto min-h-screen'>
      <div className='flex flex-col h-screen max-h-screen'>
        <div className='px-3 py-1 bg-gray-200 dark:bg-zinc-800 rounded mb-2'>
          <div className='flex flex-col space-y-2 font-normal h-full w-full items-start justify-center'>
            <FilterOption onChange={handleFilterChange} />
          </div>
        </div>
        <div className='flex flex-col pt-2 overflow-y-auto'>
          <div className='flex flex-col'>
            <MessageList messages={filteredMessages} />
          </div>
        </div>
      </div>
    </section>
  )
}
