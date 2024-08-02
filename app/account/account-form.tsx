'use client'

import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'
import InfoIcon from '@/public/assets/info.svg'
import UploadAvatar from './upload-avatar'
import { Button, Input } from '@nextui-org/react'

export default function AccountForm ({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [alarm, setAlarm] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  let userId: string

  if (user !== null) {
    userId = user.id
  } else { userId = '' }

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profile')
        .select('name, username, avatar_url')
        .eq('id', userId)
        .single()

      if (error !== null && status !== 406) {
        console.log(error)
        throw new Error()
      }

      if (data !== null) {
        setName(data.name)
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      console.log('Error cargando los datos del usuario!')
      setFail(true)
      setAlarm('Error!')
      setMessage(' hubo un problema cargando los datos del usuario.')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile ({
    name,
    username,
    avatar_url
  }: {
    name: string | null
    username: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase
        .from('profile')
        .update({
          name: name ?? '',
          avatar_url: avatar_url ?? '',
          update_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
      if (error !== null) { alert('Error!') }
      console.log('El perfil ha sido actualizado!')
      setSuccess(true)
      setAlarm('Exito!')
      setMessage(' El perfil ha sido actualizado.')
    } catch (error) {
      console.log('Error actualizando los datos!')
      setFail(true)
      setAlarm('Error!')
      setMessage(' hubo un problema actualizando los datos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex w-full items-center justify-center'>
        <UploadAvatar
          uid={userId ?? null}
          url={avatar_url}
          onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({ name, username, avatar_url: url })
          }}
        />
      </div>
      <div className='flex flex-col flex-grow'>
        <form className='flex flex-col items-center justify-center w-full gap-6'>
          <Input
            isDisabled
            size='md'
            type="email"
            id="email"
            name="email"
            label="Correo electrónico"
            labelPlacement='outside'
            variant='bordered'
            placeholder="Ingresa tu correo electrónico"
            value={username ?? ''}
            className='max-w-sm'
          />
          <Input
            isClearable
            required
            size='md'
            type="name"
            name="name"
            id="name"
            label="Nombre completo"
            labelPlacement='outside'
            variant='bordered'
            placeholder="Ingresa tu nombre completo"
            className='max-w-sm'
            value={name ?? ''}
            onChange={(e) => { setName(e.target.value) }}
          />
          <Button
            color='primary'
            variant='shadow'
            type='submit'
            onClick={() => { updateProfile({ name, username, avatar_url }) }}
            className='px-10'
            isLoading={loading}
            isDisabled={loading}
          >
            {loading ? 'Actualizando...' : 'Actualizar'}
          </Button>
          {success &&
             (
                <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                  <InfoIcon className="flex-shrink-0 inline w-4 h-4 me-3" />
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">{alarm}</span>{message}
                  </div>
                </div>
             )
          }
          {fail &&
            (
              <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                <InfoIcon className="flex-shrink-0 inline w-4 h-4 me-3" />
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">{alarm}</span>{message}
                </div>
              </div>
            )
          }
        </form>
      </div>
    </div>
  )
}
