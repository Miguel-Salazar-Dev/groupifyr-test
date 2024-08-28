'use client'

import GoogleIcon from '@/public/assets/google_icon.svg'
import FacebookIcon from '@/public/assets/facebook_icon.svg'
import AppleIcon from '@/public/assets/apple_icon.svg'
import { Button } from '@nextui-org/button'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

function Spinner () {
  return (
    <svg
      className="animate-spin h-5 w-5 text-current"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
  )
}

export function AuthButton () {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`
      }
    })
  }

  return (
    <div className='flex flex-row w-full items-center justify-evenly'>
      <Button className='px-1' color='primary' variant='faded' onPress={handleSignIn}>
      {isLoading
        ? <Spinner />
        : <GoogleIcon />
      }
      </Button>
      <Button className='px-1' color='primary' variant='faded'><FacebookIcon /></Button>
      <Button className='px-1' color='primary' variant='faded'><AppleIcon /></Button>
    </div>
  )
}
