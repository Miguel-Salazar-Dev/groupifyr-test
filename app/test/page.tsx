'use client'

import { type RootState } from '@/lib/store'
import { useSelector } from 'react-redux'

export default function Test () {
  const profile = useSelector((state: RootState) => state.userProfile)

  return (
    <div>
      <h1>Saludos, {profile.name}</h1>
    </div>
  )
}
