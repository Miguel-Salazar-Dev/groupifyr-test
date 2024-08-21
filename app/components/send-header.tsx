'use client'

import { type RootState } from '@/lib/store'
import { Avatar } from '@nextui-org/react'
import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function SendHeader () {
  const profile = useSelector((state: RootState) => state.userProfile)

  return (
    <div className='w-full flex flex-initial items-center justify-start'>
      <Link href={'/'}><IconArrowLeft stroke={2} width={30} height={30} /></Link>
      <Avatar showFallback isBordered radius="full" size="lg" src={profile.avatarurl} className='ml-2 text-gray-700 dark:text-gray-400' />
      <div className="flex flex-col gap-1 items-start justify-center ml-4">
        <h4 className="text-small font-semibold leading-none text-default-800">{profile.name}</h4>
        <h5 className="text-small tracking-tight text-default-500">{profile.username}</h5>
      </div>
    </div>
  )
}
