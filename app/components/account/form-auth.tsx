'use client'

import { Button, Input } from '@nextui-org/react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useState } from 'react'
import { login, signup } from '@/app/actions/login-signup-action'
import { useFormStatus } from 'react-dom'

function SubmitLogin () {
  const { pending } = useFormStatus()
  return <Button isLoading={pending} color='primary' variant='shadow' type='submit' formAction={login} fullWidth>Iniciar sesión</Button>
}

function SubmitSignup () {
  const { pending } = useFormStatus()
  return <Button isLoading={pending} color='primary' variant='shadow' type='submit' formAction={signup} fullWidth>Regístrate</Button>
}

export default function FormAuth ({ option }: { option: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => { setIsVisible(!isVisible) }

  return (
    <form className='flex flex-col items-center justify-center w-full gap-6'>
      {option === 'SignUp'
        ? (<Input
          isClearable
          required
          size='md'
          type="name"
          name="name"
          label="Nombre completo"
          labelPlacement='outside'
          variant='bordered'
          placeholder="Ingresa tu nombre completo"
          className='max-w-sm'
        />)
        : <></>
      }
      <Input
        isClearable
        required
        size='md'
        type="email"
        name="email"
        label="Correo electrónico"
        labelPlacement='outside'
        variant='bordered'
        placeholder="Ingresa tu correo electrónico"
        className='max-w-sm'
      />
      <Input
        required
        size='md'
        label="Contraseña"
        labelPlacement='outside'
        variant="bordered"
        placeholder='Ingresa tu contraseña'
        endContent={
          <button className='focus:outline-none' type='button' onClick={toggleVisibility} aria-label='toggle password visibility'>
            {isVisible
              ? (
                <IconEyeOff stroke={1} className='text-2xl text-default-400 pointer-events-none' />
                )
              : (
                <IconEye stroke={1} className='text-2xl text-default-400 pointer-events-none' />
                )
            }
          </button>
          }
          type={isVisible ? 'text' : 'password'}
          name="password"
          className='max-w-sm'
        />
        <div className='flex flex-row w-full max-w-sm items-center justify-evenly'>
          {option === 'LogIn'
            ? <SubmitLogin />
            : <SubmitSignup />
          }
        </div>
    </form>
  )
}
