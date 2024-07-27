'use client'

import { createClient } from '@/utils/supabase/client'
import { Avatar } from '@nextui-org/react'
import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

export default function SendHeader ({
  idUser
}: {
  idUser: string
}) {
  const supabase = createClient()
  const [name, setName] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('profile')
        .select('name, username, avatar_url')
        .eq('id', idUser)
        .single()

      if (data !== null) {
        setName(data.name)
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error al cargar los datos del usuario!')
    }
  }, [idUser, supabase])

  useEffect(() => {
    getProfile()
  }, [idUser, getProfile])

  return (
    <div className='w-full flex flex-initial items-center justify-start'>
      <Link href={'/'}><IconArrowLeft stroke={2} width={30} height={30} /></Link>
      <Avatar showFallback isBordered radius="full" size="lg" src={avatarUrl ?? ''} className='ml-2 text-gray-700 dark:text-gray-400' />
      <div className="flex flex-col gap-1 items-start justify-center ml-4">
        <h4 className="text-small font-semibold leading-none text-default-800">{name ?? ''}</h4>
        <h5 className="text-small tracking-tight text-default-500">{username ?? ''}</h5>
      </div>
    </div>
  )
}
