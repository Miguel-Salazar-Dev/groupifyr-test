'use client'

import { Avatar, Textarea } from '@nextui-org/react'
import { useRef } from 'react'
import { addMessage } from '../actions/add-message-action'
import { ComposeMessageButton } from './compose-message-button'

export function ComposeMessage ({
  profileAvatarUrl
}: {
  profileAvatarUrl: string
}) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div className="flex flex-col h-full rounded-md bg-cover bg-center bg-no-repeat align-top justify-end" style={{
      backgroundImage: "url('https://uploads-ssl.webflow.com/666254e5dfd9646b06c34d12/6667b677f57c3a1630249665_brand_bellavista_background.webp')"
    }}>
      <form ref={formRef} action={async (formData) => {
        await addMessage(formData)
        formRef.current?.reset()
      }} className='flex flex-row p-3 border-b border-gray-300 dark:border-white/20 w-full align-middle justify-center'>
        <Avatar isBordered radius="full" size="md" src={profileAvatarUrl} />
        <div className='flex flex-initial flex-row w-full ml-2 align-middle justify-center'>
        <Textarea
          name='content'
          variant="faded"
          placeholder="¡Cuentanos algo!"
          disableAutosize
          rows={2}
          className="mr-1"
        />
        <ComposeMessageButton />
        </div>
      </form>
    </div>
  )
}
