'use client'

import { setUserProfile } from '@/lib/features/user-state/user-slice'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// interface ClientRedirectProps {
//  profile: UserProfile
// }

export default function ClientRedirect ({ profile }: { profile: UserProfile | null }) {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (profile !== null) {
      // Dispatch profile to Redux store
      dispatch(setUserProfile(profile))
      // Redirect based on admin status
      // router.push('/test')
      if (profile.isAdmin) {
        router.push('/admin')
      } else {
        router.push('/inbox')
      }
    }
  }, [profile, dispatch, router])

  return null
}
