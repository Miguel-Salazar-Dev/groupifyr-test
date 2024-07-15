'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { IconSun, IconMoon } from '@tabler/icons-react'

export function ThemeSwitcher () {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='flex flex-1 items-center justify-end pr-2'>
      {theme === 'light'
        ? <button onClick={() => { setTheme('dark') }}><IconMoon stroke={1} /></button>
        : <button onClick={() => { setTheme('light') }}><IconSun stroke={1} /></button>
      }
    </div>
  )
}
