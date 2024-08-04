'use client'

import { useEffect, useOptimistic } from 'react'
import { useRouter } from 'next/navigation'
import { IconMessage2, IconDownload } from '@tabler/icons-react'
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
    <div key={message.id}>
    <div key={message.id} className='flex items-start gap-1.5 m-4'>
      <img
        className='w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500'
        src={message.author.avatar_url}
        alt={`${message.author.name} profile image`}
      />
      <div className='flex flex-col w-full leading-1.5 p-4 border-gray-300 bg-gray-200 rounded-e-xl rounded-es-xl dark:bg-gray-700 shadow-md dark:shadow-gray-800'>
        <div className='flex items-center space-x-2 rtl:space-x-reverse mb-2'>
          <div className="flex flex-col w-full gap-1 items-start justify-center">
            <div className='flex flex-row w-full'>
              <span className='text-sm leading-none font-semibold text-gray-900 dark:text-white'>{message.author.name}</span>
              <div className="flex flex-row flex-grow justify-end">
                  <MessageBadge category={message.category} />
              </div>
            </div>
            <span className='text-xs font-normal tracking-tight text-gray-500 dark:text-gray-400'>{localDate(message.created_at)}</span>
          </div>
        </div>
        <p className='text-sm font-normal text-gray-900 dark:text-white'>
          {message.content}
        </p>
        <div>
          {(message.message_has_attachment && message.attach.attachment !== '') &&
            (
            <div className='group relative my-2.5'>
              <div className='absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center'>
                <button data-tooltip-target='download-image' className='inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50'>
                  <IconDownload stroke={2} />
                </button>
                <div id='download-image' role='tooltip' className='absolute z-100 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'>
                  Descargar la imagen
                  <div className='tooltip-arrow' data-popper-arrow></div>
                </div>
              </div>
              <img
                src={message.attach.attachment ?? ''}
                className='rounded-lg mx-auto h-auto max-w-full'
              />
            </div>
            )
          }
        </div>
        <hr className="my-4 w-full h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
        <div className="flex flex-row w-full items-center justify-end gap-3">
          <button>
            <IconMessage2 className='w-5 h-5 text-gray-500' stroke={1} />
          </button>
        <Smiles message={message} addOptimisticMessage={addOptimisticMessage} />
        </div>
      </div>
    </div>
    </div>
  ))
}
