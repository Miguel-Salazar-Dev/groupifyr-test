'use client'

import { Textarea } from '@nextui-org/react'
import { useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

export function ComposeMessageTextarea () {
  const { pending } = useFormStatus()
  const alreadySent = useRef(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current == null) return

    if (!pending && alreadySent.current) {
      alreadySent.current = false
      textAreaRef.current.value = ''
      return
    }
    alreadySent.current = pending
  }, [pending])

  return (
    <Textarea
      ref={textAreaRef}
      name='content'
      variant="faded"
      placeholder="¡Cuentanos algo!"
      disableAutosize
      rows={4}
      className="col-span-4 md:col-span-4 mb-4"
    />
  )
}
