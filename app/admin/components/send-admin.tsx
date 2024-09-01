'use client'
import { createClient } from '@/utils/supabase/client'
import { type ChangeEvent, type ChangeEventHandler, Suspense, useState } from 'react'
import { Button, Select, SelectItem, Textarea } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'
import SendIcon from '@/public/assets/send_icon.svg'
import { IconPaperclip, IconFilterOff } from '@tabler/icons-react'
import FilterBox from './filter-box'
import { categoriesAdmin } from '@/app/actions/category-messages'
import { revalidatePath } from 'next/cache'

export default function SendAdmin () {
  const [filters, setFilters] = useState<any>({})
  const [isFiltered, setIsFiltered] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const { pending } = useFormStatus()
  const [isAttachment, setIsAttachment] = useState<string>('no')
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (event.target.files === null || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    const file = event.target.files[0]
    setUploadedFile(file)

    setIsAttachment('si')
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSendMessage = async () => {
    let attachmentUrl = ''

    if (message === null && isAttachment === 'no') return

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user === null) return

    if (isAttachment !== 'no') {
      if (uploadedFile !== null) {
        attachmentUrl = await uploadAttachment(uploadedFile, user.id)
      } else {
        attachmentUrl = ''
      }
    }

    insertMessageAndAttachment(message, user.id, attachmentUrl, category, isAttachment)
  }

  const insertMessageAndAttachment = async (content: string, userId: string, attachmentUrl: string, category: string, isFileUploaded: string) => {
    const supabase = createClient()
    // Insertar Mensaje
    const { data: messageData, error: messageError } = await supabase
      .from('messages')
      .insert({ content, user_id: userId, category })
      .select('id')
      .single()

    if (messageError !== null) {
      console.error('Error al enviar mensaje: ', messageError)
    }

    const messageId = messageData?.id ?? ''

    if (messageId !== '') {
      // Insertar Attachment
      const { error: attachmentError } = await supabase
        .from('attachments')
        .insert({ attachment: attachmentUrl, id_user: userId, id_message: messageId })

      if (attachmentError !== null) {
        console.error('Error al enviar mensaje: ', attachmentError)
      }

      // Insertar Filtros
      const filtersToInsert: any[] = []

      if (filters.group.length > 0) {
        filters.group.forEach((group_id: string) => {
          filtersToInsert.push({ message_id: messageId, group_id })
        })
      }

      if (filters.subGroup1.length > 0) {
        filters.subGroup1.forEach((sub_1_id: string) => {
          filtersToInsert.push({ message_id: messageId, sub_1_id })
        })
      }

      if (filters.subGroup2.length > 0) {
        filters.subGroup2.forEach((sub_2_id: string) => {
          filtersToInsert.push({ message_id: messageId, sub_2_id })
        })
      }

      if (filters.subGroup3.length > 0) {
        filters.subGroup3.forEach((sub_3_id: string) => {
          filtersToInsert.push({ message_id: messageId, sub_3_id })
        })
      }

      const { error: filtersError } = await supabase
        .from('send_to')
        .insert(filtersToInsert)

      if (filtersError !== null) {
        console.error('Error al aplicar filtros al mensaje: ', filtersError)
      }
      console.log('Message inserted successfully')
      revalidatePath('/')
    }
  }

  const uploadAttachment = async (file: File, uid: string) => {
    const filePath = `${uid}/${uid}-${Math.random()}.jpg`
    const supabase = createClient()

    const { error: uploadError } = await supabase.storage
      .from('attachments')
      .upload(filePath, file)

    if (uploadError !== null) {
      throw uploadError
    }

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/attachments/${filePath}`

    return url
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  return (
    <section className='static w-3/4 mx-auto min-h-screen'>
        <div className='flex flex-col w-full h-screen p-5'>
          <div id="branding" className='flex flex-row gap-5 w-full h-[150px] bg-blue-300'>
            <h1 className='flex w-full mt-10 font-semibold size text-3xl text-gray-800 items-center justify-center'>Enviar Mensaje</h1>
          </div>
          <div className='flex flex-row w-full gap-2 h-screen pt-3'>
            <div className='flex flex-col w-3/4'>
              <div id="sendTo" className='flex flex-col w-full border border-dashed rounded-md border-gray-800'>
                {isFiltered
                  ? (
                      <div className='flex w-full items-center justify-center py-8'>
                        <IconFilterOff stroke={2} />
                      </div>
                    )
                  : (
                  <div className='flex flex-col gap-1 p-2'>
                <Textarea
                  label='Filtro - Barrios'
                  isReadOnly
                  minRows={1}
                  maxRows={1}
                  isMultiline
                  className="block w-full text-xs placeholder-gray-400 text-gray-900 bg-white rounded-lg dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white resize-none"
                  placeholder='Filtros aplicados para los Barrios'
                  value={filters.subGroup1}
                />
                <Textarea
                  label='Filtro - Direcciones'
                  isReadOnly
                  minRows={1}
                  maxRows={1}
                  className="block w-full text-xs placeholder-gray-400 text-gray-900 bg-white rounded-lg dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white resize-none"
                  placeholder='Filtros aplicados para las Direcciones'
                  value={filters.subGroup2}
                />
              <Textarea
                  label='Filtro - Propiedades'
                  isReadOnly
                  minRows={1}
                  maxRows={1}
                  className="block w-full text-xs placeholder-gray-400 text-gray-900 bg-white rounded-lg dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white resize-none"
                  placeholder='Filtros aplicados para las Propiedades'
                  value={filters.subGroup3}
                />
                </div>
                    )}
              </div>
              <div id="messageBlock" className='flex flex-col flex-grow w-full h-3/6 justify-end'>
                <Select
                  name='category'
                  label='categoria'
                  labelPlacement='inside'
                  variant="underlined"
                  size="sm"
                  placeholder="Selecciona una categoria"
                  selectedKeys={[category]}
                  onChange={handleCategoryChange}
                >
                  {categoriesAdmin.map((category) => (
                    <SelectItem key={category.key}>
                      {category.label}
                    </SelectItem>
                  ))}
                </Select>
                <textarea
                  id="content"
                  name='content'
                  rows={10}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white resize-none"
                  placeholder="¡Cuentanos algo!"
                  value={message}
                  onChange={(e) => { setMessage(e.target.value) }}
                />
                <div className='flex flex-row w-full text-sm text-gray-900 bg-white dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white resize-none'>
                  <label htmlFor="file_input" className="inline-flex justify-center p-1 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-2 pb-2">
                      <IconPaperclip className="w-6 h-6 text-gray-500 dark:text-gray-400" stroke={1.5} />
                    </div>
                    <input name="file_input" id="file_input" type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                  <div className='flex items-center justify-center'>
                    {preview !== null && <img src={preview} alt="Image preview" width="300" />}
                  </div>
                </div>
              </div>
              <div id="Buttons" className='flex flex-row w-full py-3 gap-1 items-center justify-end'>
                <Button
                  isLoading={pending}
                  variant="bordered"
                  color="primary"
                  type='submit'
                  radius="sm"
                  endContent={<SendIcon className="w-5 h-5 rotate-90 rtl:-rotate-90" />}
                  // className="justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                  onPress={handleSendMessage}
                >
                  {pending ? '' : 'Enviar'}
                </Button>
              </div>
            </div>
            <div id="filterSelect" className='flex flex-col w-1/4'>
              <Suspense fallback={<p>Cargando...</p>}>
                <FilterBox onFilterSelect={setFilters} isFiltered={setIsFiltered}/>
              </Suspense>
            </div>
          </div>
        </div>
        </section>
  )
}
