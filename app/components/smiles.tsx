'use client'

import { createClient } from '@/utils/supabase/client'
import { IconMoodHeart } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'

export default function Smiles ({
  message,
  addOptimisticMessage
}: {
  message: MessageWithAuthor
  addOptimisticMessage: (newMessage: MessageWithAuthor) => void
}) {
  const router = useRouter()
  const handleSmiles = async () => {
    const supabase = createClient()
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (user !== null) {
      if (message.user_has_smiled_message) {
        startTransition(async () => {
          addOptimisticMessage({
            ...message,
            smiles: message.smiles - 1,
            user_has_smiled_message: !message.user_has_smiled_message
          })
          await supabase
            .from('smile')
            .delete()
            .match({ user_id: user.id, message_id: message.id })
        })
      } else {
        startTransition(async () => {
          addOptimisticMessage({
            ...message,
            smiles: message.smiles + 1,
            user_has_smiled_message: !message.user_has_smiled_message
          })
          await supabase
            .from('smile')
            .insert({ user_id: user.id, message_id: message.id })
        })
      }
      router.refresh()
    }
  }
  return (
    <button onClick={handleSmiles} className='group flex items-center'>
      <IconMoodHeart
        stroke={1}
        className={`group-hover:stroke-red-600 ${
          message.user_has_smiled_message
            ? 'stroke-red-600'
            : 'stroke-gray-500'
        }`}
      />
      <span
        className={`ml-1 text-sm group-hover:text-red-600 ${
          message.user_has_smiled_message ? 'text-red-600' : 'text-gray-500'
        }`}
      >
        {message.smiles}
      </span>
    </button>
  )
}
