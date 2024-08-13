'use client'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

interface Message {
  id: string
  content: string
  created_at: string
}

interface UserGroups {
  group_id: string | null
  sub_group_1: string | null
  sub_group_2: string | null
  sub_group_3: string | null
}

const ViewMessages = () => {
  const supabase = createClient()
  const [messages, setMessages] = useState<Message[]>([])
  const [userGroups, setUserGroups] = useState<UserGroups | null>(null)

  useEffect(() => {
    const fetchUserGroups = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const userId = user?.id ?? ''

      if (userId !== null) {
        const { data, error } = await supabase
          .from('user_address')
          .select('group_id, sub_group_1: sub_1_id, sub_group_2: sub_2_id, sub_group_3: sub_3_id')
          .eq('user_id', userId)

        if (error !== null) {
          console.error('Error al obtener los grupos del usuario: ', error)
        } else {
          setUserGroups(data[0])
        }
      }
    }

    fetchUserGroups()
  }, [])

  useEffect(() => {
    const fetchMessages = async () => {
      const { data: messages } = await supabase
        .from('messages')
        .select('id, content, created_at')
        .order('created_at', { ascending: false })

      const { data: messageFilters } = await supabase
        .from('send_to')
        .select('*')

      if (messages !== null && messageFilters !== null && userGroups !== null) {
        const filteredMessages = messages.filter((message) => {
          const filtersForMessage = messageFilters.filter(
            (filter) => filter.message_id === message.id
          )

          return filtersForMessage.some((filter) => {
            const groupMatch = filter.group_id === userGroups.group_id || filter.group_id === null
            const subGroup1Match = filter.Sub_1_id === userGroups.sub_group_1 || filter.Sub_1_id === null
            const subGroup2Match = filter.Sub_2_id === userGroups.sub_group_2 || filter.Sub_2_id === null
            const subGroup3Match = filter.Sub_3_id === userGroups.sub_group_3 || filter.Sub_3_id === null

            return groupMatch && subGroup1Match && subGroup2Match && subGroup3Match
          })
        })

        setMessages(filteredMessages)
      }
    }

    if (userGroups !== null) {
      fetchMessages()
    }
  }, [userGroups])

  return (
    <div>
      <h1>Mensajes</h1>
      {messages.length > 0
        ? (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <p>{message.content}</p>
              <small>{new Date(message.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
          )
        : (
        <p>No hay mensajes</p>
          )}
    </div>
  )
}

export default ViewMessages
