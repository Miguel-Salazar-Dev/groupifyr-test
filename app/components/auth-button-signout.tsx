import { createClient } from '@/utils/supabase/client'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function AuthSignOutButton () {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setIsLoading(true)
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <Button isLoading={isLoading} className='mt-1' onClick={handleSignOut}>Sign Out</Button>
  )
}
