'use client'

import { useSelector } from 'react-redux'
import { MessageList } from '../components/messsage-list'
import NavbarComponent from '../components/navbar'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { type RootState } from '@/lib/store'
interface UserAddress {
  group: string | null
  sub_group_1: string | null
  sub_group_2: string | null
  sub_group_3: string | null
}

export default function Inbox () {
  const supabase = createClient()
  const [messages, setMessages] = useState<MessageWithAuthor[]>([])
  const [userGroups, setUserGroups] = useState<UserAddress | null>(null)

  const profile = useSelector((state: RootState) => state.userProfile)

  useEffect(() => {
    const fetchUserInformation = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const userId = user?.id ?? ''

      if (userId !== null) {
        const { data, error } = await supabase
          .from('user_address')
          .select('group: group_id, sub_group_1: sub_1_id, sub_group_2: sub_2_id, sub_group_3: sub_3_id')
          .eq('user_id', userId)

        if (error !== null) {
          console.error('Error al obtener los grupos del usuario: ', error)
        } else {
          setUserGroups(data[0])
        }
      }
    }

    fetchUserInformation()
  }, [])

  useEffect(() => {
    const fetchMessages = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase
        .from('messages')
        .select('*, author: profile!inner(*), attach: attachments!inner(*), smiles: smile(user_id)')
        .eq('profile.id_group', profile?.group_id ?? '')
        .is('profile.admin', true)
        .order('created_at', { ascending: false })

      const messages =
        data?.map((message) => {
          const hasSmiles = Array.isArray(message.smiles)
          const userHasSmiledMessage = hasSmiles
            ? message.smiles.some(
              (smile) => smile.user_id === user?.id
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

      const { data: messageFilters } = await supabase
        .from('send_to')
        .select('*')

      if (messages !== null && messageFilters !== null && userGroups !== null) {
        const filteredMessages = messages.filter((message) => {
          const filtersForMessage = messageFilters.filter((filter) => filter.message_id === message.id)

          return filtersForMessage.some((filter) => {
            const groupMatch = filter.group_id === userGroups.group || filter.group_id === null
            const subGroup1Match = filter.sub_1_id === userGroups.sub_group_1 || filter.sub_1_id === null
            const subGroup2Match = filter.sub_2_id === userGroups.sub_group_2 || filter.sub_2_id === null
            const subGroup3Match = filter.sub_3_id === userGroups.sub_group_3 || filter.sub_3_id === null

            return groupMatch && subGroup1Match && subGroup2Match && subGroup3Match
          })
        })

        setMessages(filteredMessages)
      }
    }

    if (userGroups !== null) {
      fetchMessages()
    }
  }, [profile?.group_id, userGroups])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100 text-black dark:bg-black dark:text-white">
      <section className='max-w-[600px] w-11/12 mx-auto border-l border-r border-gray-200 dark:border-white/80 min-h-screen'>
        <div className='flex flex-col h-screen'>
          <div className='h-1/4 flex flex-col rounded-md bg-cover bg-center bg-no-repeat align-top justify-end' style={{
            backgroundImage: `url(${profile?.group_backgroud})`
          }}>
            <div className='h-[100px] w-[100px] flex flex-col rounded-md bg-cover bg-center bg-no-repeat relative mb-[-50px] ml-1 z-50' style={{ backgroundImage: `url(${profile?.group_logo})` }} />
          </div>
          <div className='flex flex-row w-full h-[50px] align-middle justify-end'>
            <h1 className='font-semibold text-3xl text-default-700 mr-1'>{profile?.group_name}</h1>
          </div>
          <div className='flex-1 overflow-y-auto'>
            <MessageList messages={messages} />
            <div className='flex flex-col w-full h-24' />
          </div>
          <NavbarComponent />
        </div>
      </section>
    </main>
  )
}
