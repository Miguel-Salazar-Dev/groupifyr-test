'use client'

import { MessageList } from '../components/messsage-list'
import NavbarComponent from '../components/navbar'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { GetUserProfile } from '../actions/user-profile-action'
import { useRouter } from 'next/navigation'
interface UserAddress {
  group: string | null
  sub_group_1: string | null
  sub_group_2: string | null
  sub_group_3: string | null
}

export default function Inbox () {
  const supabase = createClient()
  const router = useRouter()
  const [messages, setMessages] = useState<MessageWithAuthor[]>([])
  const [userGroups, setUserGroups] = useState<UserAddress | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [profileGroupName, setProfileGroupName] = useState<string>('')
  const [profileGroupId, setProfileGroupId] = useState<string>('')
  const [profileBackgroundImage, setProfileBackgroundImage] = useState<string>('')
  const [profileLogoImage, setProfileLogoImage] = useState<string>('')

  useEffect(() => {
    const getUserProfile = async () => {
      const profile: UserProfile = await GetUserProfile()
      if (profile === null) {
        router.push('/login')
      }
      setProfile(profile)
      setProfileGroupName(profile.group_name)
      setProfileGroupId(profile.group_id)
      setProfileBackgroundImage(profile.group_backgroud)
      setProfileLogoImage(profile.group_logo)
    }

    getUserProfile()
  }, [])

  useEffect(() => {
    const fetchUserInformation = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const userId = user?.id ?? ''

      if (userId !== null) {
        const { data, error } = await supabase
          .from('user_address')
          .select('group: group_id, sub_group_1: sub_1_id, sub_group_2: sub_2_id, sub_group_3: sub_3_id')
          .eq('user_id', userId)

        if (error !== null) {
          console.error('Error al obtener los grupos del usuario: ', error)
        } else {
          setUserGroups(data[0])
        }
      }
    }

    fetchUserInformation()
  }, [])

  useEffect(() => {
    const fetchMessages = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase
        .from('messages')
        .select('*, author: profile!inner(*), attach: attachments!inner(*), smiles: smile(user_id)')
        .eq('profile.id_group', profileGroupId)
        .is('profile.admin', true)
        .order('created_at', { ascending: false })

      const messages =
        data?.map((message) => {
          const hasSmiles = Array.isArray(message.smiles)
          const userHasSmiledMessage = hasSmiles
            ? message.smiles.some(
              (smile) => smile.user_id === user?.id
            )
            : false
          const hasAttachment = Array.isArray(message.attach)

          return {
            ...message,
            author: Array.isArray(message.author) ? message.author[0] : message.author,
            message_has_attachment: hasAttachment,
            attach: Array.isArray(message.attach) ? message.attach[0] : message.attach,
            user_has_smiled_message: userHasSmiledMessage,
            smiles: hasSmiles ? message.smiles.length : 0
          }
        }) ?? []

      const { data: messageFilters } = await supabase
        .from('send_to')
        .select('*')

      if (messages !== null && messageFilters !== null && userGroups !== null) {
        const filteredMessages = messages.filter((message) => {
          const filtersForMessage = messageFilters.filter((filter) => filter.message_id === message.id)

          return filtersForMessage.some((filter) => {
            const groupMatch = filter.group_id === userGroups.group || filter.group_id === null
            const subGroup1Match = filter.sub_1_id === userGroups.sub_group_1 || filter.sub_1_id === null
            const subGroup2Match = filter.sub_2_id === userGroups.sub_group_2 || filter.sub_2_id === null
            const subGroup3Match = filter.sub_3_id === userGroups.sub_group_3 || filter.sub_3_id === null

            return groupMatch && subGroup1Match && subGroup2Match && subGroup3Match
          })
        })

        setMessages(filteredMessages)
      }
    }

    if (userGroups !== null) {
      fetchMessages()
    }
  }, [profileGroupId, userGroups])

  return (
      <section className='max-w-[600px] w-11/12 mx-auto bg-white dark:bg-zinc-800 min-h-screen'>
        <div className='flex flex-col h-screen'>
          <div className='h-1/4 flex flex-col rounded-md bg-cover bg-center bg-no-repeat align-top justify-end' style={{
            backgroundImage: `url(${profileBackgroundImage})`
          }}>
            <div className='h-[100px] w-[100px] flex flex-col rounded-md bg-cover bg-center bg-no-repeat relative mb-[-50px] ml-1 z-50' style={{ backgroundImage: `url(${profileLogoImage})` }} />
          </div>
          <div className='flex flex-row w-full h-[50px] align-middle justify-end'>
            <h1 className='font-semibold text-3xl text-default-700 mr-1'>{profileGroupName}</h1>
          </div>
          <div className='flex-1 overflow-y-auto'>
            <MessageList messages={messages} />
            <div className='flex flex-col w-full h-24' />
          </div>
          <NavbarComponent profile={profile} />
        </div>
      </section>
  )
}
