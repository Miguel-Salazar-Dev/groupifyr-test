'use client'

import { createClient } from '@/utils/supabase/client'
import { Input } from '@nextui-org/react'
import { type User } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'

export default function AccountForm ({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
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
      alert('Error cargando los datos del usuario!')
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
      alert('El perfil ha sido actualizado!')
    } catch (error) {
      alert('Error actualizando los datos!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form>
      <div>
        <label htmlFor="username">Username / Email</label>
        <Input id="username" type="text" value={username ?? ''} disabled />
      </div>
      <div>
        <label htmlFor='fullname'>Nombre Completo</label>
        <Input
          id="fullname"
          type="text"
          value={name ?? ''}
          onChange={(e) => { setName(e.target.value) }}
        />
      </div>
      <div>
        <button
          className="primary block"
          onClick={() => { updateProfile({ name, username, avatar_url }) }}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Actualizado'}
        </button>
      </div>
      </form>
    </div>
  )
}
