'use client'

import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'
import SendIcon from '@/public/assets/send_icon.svg'

export function ComposeMessageButton () {
  const { pending } = useFormStatus()

  return (
    <Button
      isIconOnly
      isLoading={pending}
      variant="light"
      color="primary"
      type='submit'
      radius="full"
      className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
    >
      {pending ? '' : <SendIcon className="w-5 h-5 rotate-90 rtl:-rotate-90" />}
    </Button>
  )
}
