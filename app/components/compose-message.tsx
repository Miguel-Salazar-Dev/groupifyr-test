'use client'

import { Select, type Selection, SelectItem } from '@nextui-org/react'
import { useRef, useState } from 'react'
import { addMessage } from '../actions/add-message-action'
import { ComposeMessageButton } from './compose-message-button'
import { IconPaperclip } from '@tabler/icons-react'
import { categories } from '../actions/category-messages'

export function ComposeMessage () {
  const formRef = useRef<HTMLFormElement>(null)
  const [value, setValue] = useState<Selection>(new Set([]))
  const [isAttachment, setIsAttachment] = useState<string | null>('no')
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (event.target.files === null || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    const file = event.target.files[0]

    setIsAttachment('si')
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    return file
  }

  return (
    <div className="flex flex-col h-full w-full">
      <form ref={formRef} action={async (formData) => {
        await addMessage(formData)
        formRef.current?.reset()
      }} className='flex flex-row p-1 w-full align-middle justify-center'>
        <div className="flex items-center px-3 rounded-lg w-full gap-1">
          <div className='flex flex-row w-full gap-1 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            <div className='flex flex-col w-full gap-[2px]'>
              <Select
                name='category'
                variant="underlined"
                size="sm"
                placeholder="Selecciona una categoria"
                defaultSelectedKeys={['Mensaje']}
                selectedKeys={value}
                onSelectionChange={setValue}
              >
                {categories.map((category) => (
                  <SelectItem key={category.key}>
                    {category.label}
                  </SelectItem>
                ))}
              </Select>
              <textarea
                id="content"
                name='content'
                className="block p-2.5 w-full h-full text-sm text-gray-900 bg-white rounded-lg dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white resize-none"
                placeholder="¡Cuentanos algo!">
              </textarea>
            </div>
            <div className='flex flex-col items-center justify-center'>
              {preview !== null && <img src={preview} alt="Image preview" width="100" />}
              <div className='flex flex-col'>
                <label htmlFor="file_input" className="inline-flex justify-center p-1 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-2 pb-2">
                    <IconPaperclip className="w-6 h-6 text-gray-500 dark:text-gray-400" stroke={1.5} />
                  </div>
                  <input name="file_input" id="file_input" type="file" className="hidden" onChange={handleFileChange} />
                  <input name="file_uploaded" id="file_uploaded" type="text" className='hidden' value={isAttachment ?? ''} />
                </label>
                <ComposeMessageButton />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
