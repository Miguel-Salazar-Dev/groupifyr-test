'use client'

import { Button } from '@nextui-org/react'
import { IconSend2 } from '@tabler/icons-react'
import { useFormStatus } from 'react-dom'

export function ComposeMessageButton () {
  const { pending } = useFormStatus()

  return (
    <Button
      isIconOnly
      isLoading={pending}
      type='submit'
      radius="full"
      className="bg-gradient-to-tr from-sky-800 to-sky-500 text-white shadow-lg"
    >
      {pending ? '' : <IconSend2 stroke={2} />}
    </Button>
  )
}
