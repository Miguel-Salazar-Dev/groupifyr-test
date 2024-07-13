'use client'

import { Avatar, Textarea } from '@nextui-org/react'
import { useRef } from 'react'
import { addMessage } from '../actions/add-post-action'
import { ComposeMessageButton } from './compose-message-button'

export function ComposeMessage ({
  profileAvatarUrl
}: {
  profileAvatarUrl: string
}) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={async (formData) => {
      await addMessage(formData)
      formRef.current?.reset()
    }} className='flex flex-row p-3 border-b border-gray-300 dark:border-white/20'>
      <Avatar isBordered radius="full" size="md" src={profileAvatarUrl} />
      <div className='flex flex-1 flex-col ml-2'>
      <Textarea
        name='content'
        variant="faded"
        placeholder="¡Cuentanos algo!"
        disableAutosize
        rows={2}
        className="col-span-4 md:col-span-4 mb-4"
      />
      <ComposeMessageButton />
      </div>
    </form>
  )
}
