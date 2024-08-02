'use client'

import { Input, Textarea } from '@nextui-org/react'
import { useRef, useState } from 'react'
import { addMessage } from '../actions/add-message-action'
import { ComposeMessageButton } from './compose-message-button'
import { IconPaperclip, IconPhotoFilled } from '@tabler/icons-react'

export function ComposeMessage () {
  const formRef = useRef<HTMLFormElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isAttachment, setIsAttachment] = useState<string | null>('no')

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (event.target.files === null || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    const file = event.target.files[0]
    setFileName(file.name)
    setIsAttachment('si')

    return file
  }

  return (
    <div className="flex flex-col h-full w-full">
      <form ref={formRef} action={async (formData) => {
        await addMessage(formData)
        formRef.current?.reset()
      }} className='flex flex-row p-3 border-b border-gray-300 dark:border-white/20 w-full align-middle justify-center'>
        <div className='flex flex-initial flex-row w-full align-middle justify-end gap-2'>
          <div className='flex flex-col w-full'>
            <Textarea
              name='content'
              variant="faded"
              placeholder="¡Cuentanos algo!"
              disableAutosize
              rows={3}
            />
            <Input
              isReadOnly
              isDisabled
              type="text"
              label=""
              variant='bordered'
              labelPlacement='outside-left'
              size='sm'
              className='block w-full'
              startContent={<IconPhotoFilled />}
              value={fileName ?? ''}
            />
          </div>
          <div>
            <div className="flex items-center justify-center mb-1">
              <label htmlFor="file_input" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-2 pb-2">
                  <IconPaperclip className="w-6 h-6 text-gray-500 dark:text-gray-400" stroke={1.5} />
                </div>
                <input name="file_input" id="file_input" type="file" className="hidden" onChange={handleFileChange} />
                <input name="file_uploaded" id="file_uploaded" type="text" className='hidden' value={isAttachment ?? ''} />
              </label>
            </div>
            <ComposeMessageButton />
          </div>
        </div>
      </form>
    </div>
  )
}
