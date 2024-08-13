'use client'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import FilterComponent from './components/filtercomponent'

const SendMessage = () => {
  const [filters, setFilters] = useState<any>({})
  const [message, setMessage] = useState<string>('')

  const handleSendMessage = async () => {
    const supabase = createClient()
    const { data: user } = await supabase.auth.getUser()
    const userId = user.user?.id ?? ''
    const { data: messageData, error: messageError } = await supabase
      .from('messages')
      .insert([{ content: message, user_id: userId }])
      .select('id')

    if (messageError !== null) {
      console.error('Error al enviar mensaje: ', messageError)
      return
    }

    const messageId = messageData?.[0].id

    if (messageId !== null) {
      const filtersToInsert: any[] = []

      if (filters.groups.length > 0) {
        filters.groups.forEach((group_id: string) => {
          filtersToInsert.push({ message_id: messageId, group_id })
        })
      }

      if (filters.subGroup1.length > 0) {
        filters.subGroup1.forEach((Sub_1_id: string) => {
          filtersToInsert.push({ message_id: messageId, Sub_1_id })
        })
      }

      if (filters.subGroup2.length > 0) {
        filters.subGroup2.forEach((Sub_2_id: string) => {
          filtersToInsert.push({ message_id: messageId, Sub_2_id })
        })
      }

      if (filters.subGroup3.length > 0) {
        filters.subGroup3.forEach((Sub_3_id: string) => {
          filtersToInsert.push({ message_id: messageId, Sub_3_id })
        })
      }

      const { error: filtersError } = await supabase
        .from('send_to')
        .insert(filtersToInsert)

      if (filtersError !== null) {
        console.error('Error al aplicar filtros al mensaje: ', filtersError)
      } else {
        console.log('Mensaje enviado y filtros aplicados exitosamente')
      }
    }
  }

  return (
    <div>
      <h1>Enviar Mensaje</h1>
      <FilterComponent onFilterSelect={setFilters} />
      <pre>{JSON.stringify(filters, null, 2)}</pre>
      <textarea
        value={message}
        onChange={(e) => { setMessage(e.target.value) }}
        placeholder='Escribenos algo!'
      />

      <button onClick={handleSendMessage}>Enviar Mensaje</button>
    </div>
  )
}

export default SendMessage
