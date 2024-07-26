import { createClient } from '@/utils/supabase/client'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function AuthSignOutButton () {
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <Button className='mt-1' onClick={handleSignOut}>Sign Out</Button>
  )
}
