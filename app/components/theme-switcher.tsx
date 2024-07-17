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
    <div className='flex items-center pr-2'>
      {theme === 'light'
        ? <button onClick={() => { setTheme('dark') }}><div className='flex flex-row align-middle justify-start gap-1'><IconMoon stroke={1} width={20} height={20} /> Modo Oscuro</div></button>
        : <button onClick={() => { setTheme('light') }}><div className='flex flex-row align-middle justify-start gap-1'><IconSun stroke={1} width={20} height={20} /> Modo Claro</div></button>
      }
    </div>
  )
}
