'use client'

import { Textarea } from '@nextui-org/react'
import { useRef } from 'react'
import { addMessage } from '../actions/add-message-action'
import { ComposeMessageButton } from './compose-message-button'

export function ComposeMessage () {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div className="flex flex-col h-full w-full">
      <form ref={formRef} action={async (formData) => {
        await addMessage(formData)
        formRef.current?.reset()
      }} className='flex flex-row p-3 border-b border-gray-300 dark:border-white/20 w-full align-middle justify-center'>
        <div className='flex flex-initial flex-row w-full ml-2 align-middle justify-center'>
        <Textarea
          name='content'
          variant="faded"
          placeholder="¡Cuentanos algo!"
          disableAutosize
          rows={3}
          className="mr-1"
        />
        <ComposeMessageButton />
        </div>
      </form>
    </div>
  )
}
