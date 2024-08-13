'use client'
import { createClient } from '@/utils/supabase/client'
import NavbarAdmin from '../components/admin/navbar-admin'
import { GetUserProfile } from '../actions/user-profile-action'
import SidebarLeft from '../components/admin/sidebar-left'
// import { IconPaperclip } from '@tabler/icons-react'
import FilterBox from './components/filter-box'
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'
import SendIcon from '@/public/assets/send_icon.svg'

export default function AdminSend () {
  const [filters, setFilters] = useState<any>({})
  const [message, setMessage] = useState<string>('')
  const [profile, setProfile] = useState<any>({})
  const [profileBackgroundImage, setProfileBackgroundImage] = useState<string>('')
  const { pending } = useFormStatus()

  useEffect(() => {
    const getUserInformation = async () => {
      const profile = await GetUserProfile()
      setProfile(profile)
      setProfileBackgroundImage(profile?.group_backgroud)
    }

    getUserInformation()
  }, [])

  const handleSendMessage = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id ?? ''

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

      if (filters.subGroup1.length > 0) {
        filters.subGroup1.forEach((Sub_1_id: string) => {
          filtersToInsert.push({ message_id: messageId, Sub_1_id })
        })
        console.log(filtersToInsert)
      }

      if (filters.subGroup2.length > 0) {
        filters.subGroup2.forEach((Sub_2_id: string) => {
          filtersToInsert.push({ message_id: messageId, Sub_2_id })
        })
        console.log(filtersToInsert)
      }

      if (filters.subGroup3.length > 0) {
        filters.subGroup3.forEach((Sub_3_id: string) => {
          filtersToInsert.push({ message_id: messageId, Sub_3_id })
        })
        console.log(filtersToInsert)
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
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100 text-black dark:bg-black dark:text-white">
      <NavbarAdmin profile={profile} />
      <section className='max-w-[600px] w-11/12 mx-auto border-l border-r border-gray-200 dark:border-white/80 min-h-screen'>
        <div className='flex flex-col h-screen'>
          <SidebarLeft profileBackgroundImage={profileBackgroundImage} />
          <div className='flex flex-col h-full pt-14 grow gap-5'>
            <h1 className='mt-10 font-semibold size text-3xl text-gray-800'>Enviar Mensaje</h1>
            <FilterBox onFilterSelect={setFilters} />
            <pre>{JSON.stringify(filters, null, 2)}</pre>
            <textarea
              id="content"
              name='content'
              rows={2}
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white resize-none"
              placeholder="¡Cuentanos algo!"
              value={message}
              onChange={(e) => { setMessage(e.target.value) }}
            />
            <Button
              isIconOnly
              isLoading={pending}
              variant="light"
              color="primary"
              type='submit'
              radius="full"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              onPress={handleSendMessage}
            >
              {pending ? '' : <SendIcon className="w-5 h-5 rotate-90 rtl:-rotate-90" />}
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
