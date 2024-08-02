'use client'

import GoogleIcon from '@/public/assets/google_icon.svg'
import FacebookIcon from '@/public/assets/facebook_icon.svg'
import AppleIcon from '@/public/assets/apple_icon.svg'
import { Button } from '@nextui-org/button'
import { createClient } from '@/utils/supabase/client'

export function AuthButton () {
  const supabase = createClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`
      }
    })
  }

  return (
    <div className='flex flex-row w-full items-center justify-evenly'>
      <Button className='px-1' onClick={handleSignIn} color='primary' variant='faded'><GoogleIcon /></Button>
      <Button className='px-1' color='primary' variant='faded'><FacebookIcon /></Button>
      <Button className='px-1' color='primary' variant='faded'><AppleIcon /></Button>
    </div>
  )
}
