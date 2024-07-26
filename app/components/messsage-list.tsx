'use client'

import { useEffect, useOptimistic } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardBody, CardFooter, Avatar } from '@nextui-org/react'
import { IconMessage2 } from '@tabler/icons-react'
import Smiles from './smiles'
import { createClient } from '@/utils/supabase/client'
import MessageBadge from './message-badge'

export function MessageList ({ messages }: { messages: MessageWithAuthor[] }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
  MessageWithAuthor[],
  MessageWithAuthor
  >(messages, (currentOptimisticMessages, newMessage) => {
    const newOptimisticMessages = [...currentOptimisticMessages]
    const index = newOptimisticMessages.findIndex(
      (message) => message.id === newMessage.id
    )
    newOptimisticMessages[index] = newMessage
    return newOptimisticMessages
  })

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const channel = supabase
      .channel('realtime messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          router.refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  const localDate = (createdAt: string) => {
    const DateLocal = new Date(createdAt).toLocaleString()
    return DateLocal
  }

  return optimisticMessages.map((message) => (
    <Card key={message.id} className="shadow-none bg-transparent hover:bg-slate-300 dark:hover:bg-slate-800 transition border-b rounded-t-sm rounded-b-md border-gray-300 dark:border-white/20">
      <CardHeader className="justify-between">
        <div className="flex flex-row w-full gap-5">
          <Avatar isBordered radius="full" size="md" src={message.author.avatar_url} />
          <div className="flex flex-row flex-grow">
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-medium font-semibold leading-none text-default-800">{message.author.name}</h4>
              <h6 className="text-xs tracking-tight text-default-500">{localDate(message.created_at)}</h6>
            </div>
            <div className="flex flex-row flex-grow justify-end">
              <div>
                <MessageBadge category={message.category} />
              </div>
            </div>
          </div>
        </div>

      </CardHeader>
      <CardBody className="px-3 py-0 text-medium text-default-600">
        <p>
          {message.content}
        </p>

      </CardBody>
      <CardFooter className="flex flex-row w-full items-center justify-end gap-3">
      <button>
        <IconMessage2 className='w-5 h-5 text-gray-500' stroke={1} />
      </button>
        <Smiles message={message} addOptimisticMessage={addOptimisticMessage} />
      </CardFooter>
    </Card>
  ))
}
