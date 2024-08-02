'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export const addMessage = async (formData: FormData) => {
  const content = formData.get('content') as string
  const attachment = formData.get('file_input') as File
  const isFileUploaded = formData.get('file_uploaded') as string

  let attachmentUrl = ''

  if (content === null && isFileUploaded === 'no') return

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) return

  const userId = user.id

  if (isFileUploaded !== 'no') {
    attachmentUrl = await uploadAttachment(attachment, userId)
  }

  insertMessageAndAttachment(content, userId, attachmentUrl, isFileUploaded)
}

const insertMessageAndAttachment = async (content: string, userId: string, attachmentUrl: string, isFileUploaded: string) => {
  const supabase = createClient()
  try {
    // Insert Message
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .insert({ content, user_id: userId })
      .select('id')
      .single()

    if (messageError !== null) throw new Error()

    const messageId = message.id

    // Insert Attachment
    const { error: attachmentError } = await supabase
      .from('attachments')
      .insert({ attachment: attachmentUrl, id_user: userId, id_message: messageId })

    if (attachmentError !== null) throw new Error()

    console.log('Message inserted successfully')
    revalidatePath('/')
  } catch (error) {
    alert('Error uploading avatar!')
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
