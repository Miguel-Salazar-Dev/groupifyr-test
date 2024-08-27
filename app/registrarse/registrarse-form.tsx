'use client'

import { useCallback, useEffect, useState } from 'react'
import { fetchInitialProfile, getGroupInformation, getSubGroup1Information, getSubGroup2Information, getSubGroup3Information, updateAvatar, updateUserProfile } from '../lib/data'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import InfoIcon from '@/public/assets/info.svg'
import { useRouter } from 'next/navigation'
import UploadAvatar from '../account/upload-avatar'

export default function RegistrarseForm ({ user_id }: { user_id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [alarm, setAlarm] = useState<string | null>(null)
  const [selectedAllAddress, setSelectedAllAddress] = useState(false)
  const [disableButton, setDisableButton] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  // const [userId, setUserId] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [avatar_url, setAvatarUrl] = useState<string>('')
  const [groupList, setGroupList] = useState<Group[]>([])
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [subGroup1List, setSubGroup1List] = useState<Group[]>([])
  const [selectedSubGroup1, setSelectedSubGroup1] = useState<string>('')
  const [subGroup2List, setSubGroup2List] = useState<Group[]>([])
  const [selectedSubGroup2, setSelectedSubGroup2] = useState<string>('')
  const [subGroup3List, setSubGroup3List] = useState<Group[]>([])
  const [selectedSubGroup3, setSelectedSubGroup3] = useState<string>('')

  const getUserProfile = useCallback(async () => {
    try {
      setLoading(true)

      const profile: InitialProfile = await fetchInitialProfile()

      if (profile !== undefined || profile !== null) {
        // setUserId(profile.id)
        setName(profile.name)
        setUsername(profile.username)
        setAvatarUrl(profile.avatarurl)
      }

      const groups = await getGroupInformation()
      if (groups !== null) {
        setGroupList(groups)
      }
    } catch (error) {
      console.log('Error cargando los datos del usuario')
      setFail(true)
      setAlarm('Error!')
      setMessage(' hubo un problema cargando los datos del usuario.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getUserProfile()
  }, [getUserProfile])

  useEffect(() => {
    const getSubGroup1List = async () => {
      try {
        setLoading(true)
        setSelectedSubGroup1('')
        setSelectedSubGroup2('')
        setSelectedSubGroup3('')
        const subgroup1 = await getSubGroup1Information(selectedGroup)
        if (subgroup1 !== null) {
          setSubGroup1List(subgroup1)
        }
      } catch (error) {
        console.log('Error cargando los datos del Sub Grupo 1')
        setFail(true)
        setAlarm('Error!')
        setMessage(' hubo un problema cargando los datos del sub grupo 1.')
      } finally {
        setLoading(false)
      }
    }

    getSubGroup1List()
  }, [selectedGroup])

  useEffect(() => {
    const getSubGroup2List = async () => {
      try {
        setLoading(true)
        setSelectedSubGroup2('')
        setSelectedSubGroup3('')
        const subgroup2 = await getSubGroup2Information(selectedSubGroup1)
        if (subgroup2 !== null) {
          setSubGroup2List(subgroup2)
        }
      } catch (error) {
        console.log('Error cargando los datos del Sub Grupo 2')
        setFail(true)
        setAlarm('Error!')
        setMessage(' hubo un problema cargando los datos del sub grupo 2.')
      } finally {
        setLoading(false)
      }
    }

    getSubGroup2List()
  }, [selectedSubGroup1])

  useEffect(() => {
    const getSubGroup3List = async () => {
      try {
        setLoading(true)
        setSelectedSubGroup3('')
        const subgroup3 = await getSubGroup3Information(selectedSubGroup2, selectedSubGroup1)
        if (subgroup3 !== null) {
          setSubGroup3List(subgroup3)
        }
      } catch (error) {
        console.log('Error cargando los datos del Sub Grupo 3')
        setFail(true)
        setAlarm('Error!')
        setMessage(' hubo un problema cargando los datos del sub grupo 3.')
      } finally {
        setLoading(false)
        setSelectedAllAddress(true)
        if (name !== null && selectedAllAddress) {
          setDisableButton(true)
        }
      }
    }

    getSubGroup3List()
  }, [selectedSubGroup2])

  const handleUserUpdate = async () => {
    const profileData = {
      id: user_id,
      name,
      username,
      id_group: selectedGroup
    }
    const addressData = {
      user_id,
      group_id: selectedGroup,
      sub_1_id: selectedSubGroup1,
      sub_2_id: selectedSubGroup2,
      sub_3_id: selectedSubGroup3
    }

    const result = await updateUserProfile(profileData, addressData)

    if (result.success) {
      console.log('Profile and address updated successfully!')
      setSuccess(true)
      setAlarm('Exito!')
      setMessage(' El perfil ha sido actualizado. Sera redirigido automaticamente')
      redirectUpdated()
    } else {
      console.error('Failed to update profile and address:', result.error)
      setFail(true)
      setAlarm('Error!')
      setMessage(' hubo un problema actualizando los datos')
    }
  }

  const redirectUpdated = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push('/')
  }

  return (
      <section className='max-w-[600px] w-11/12 mx-auto border-l border-r border-gray-200 dark:border-white/80 min-h-screen'>
        <div className='flex flex-col h-screen'>
          <div className='w-full h-1/10 flex flex-col items-center justify-start border p-2 gap-4'>
            <h1 className='font-semibold text-3xl text-default-700'>Gracias por registrate {name}</h1>
            <p>Antes que puedas disfrutar de todas las ventajas que tiene Bezinos.app necesitamos que nos proporciones algunos datos.</p>
            <p>Recuerda siempre, que tus datos estan seguros y no seran compartidos con terceros. Los necesitamos para poder brindarte una experiencia mas directa y personalizada.</p>
          </div>
          <div className='w-full flex flex-col justify-start pt-5 px-3 pb-20 overflow-scroll'>
            <div className='flex w-full items-center justify-center'>
              <UploadAvatar
                uid={user_id}
                url={avatar_url}
                onUpload={(url) => {
                  setAvatarUrl(url)
                  updateAvatar(avatar_url, user_id)
                }}
              />
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-col items-center justify-center w-full gap-6'>
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
                  value={username}
                  className='max-w-sm'
                />
                <Input
                  isRequired
                  isDisabled={loading}
                  size='md'
                  type="name"
                  name="name"
                  id="name"
                  color={name === '' ? 'danger' : 'success'}
                  label="Nombre completo"
                  labelPlacement='outside'
                  variant='bordered'
                  placeholder="Ingresa tu nombre completo"
                  className='max-w-sm'
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                />
                <div className='flex flex-col border w-full max-w-sm gap-6 border-gray-300 rounded p-3'>
                  {loading && <p className="text-small text-default-500">cargando...</p>}
                  <Select
                    label="Corregimiento"
                    placeholder="Selecciona tu corregimiento"
                    isDisabled={loading}
                    isLoading={loading}
                    variant='bordered'
                    color={selectedGroup === '' ? 'danger' : 'success'}
                    selectedKeys={[selectedGroup]}
                    onChange={(e) => { setSelectedGroup(e.target.value) }}
                    className='max-w-xs'
                  >
                    {groupList.map((group) => (
                      <SelectItem key={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Barrios"
                    placeholder="Selecciona tu barrio"
                    isDisabled={loading}
                    isLoading={loading}
                    variant='bordered'
                    color={selectedSubGroup1 === '' ? 'danger' : 'success'}
                    selectedKeys={[selectedSubGroup1]}
                    onChange={(e) => { setSelectedSubGroup1(e.target.value) }}
                    className={selectedGroup === '' ? 'max-w-xs hidden' : 'max-w-xs'}
                  >
                    {subGroup1List.map((subgroup1) => (
                      <SelectItem key={subgroup1.id}>
                        {subgroup1.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Calles"
                    placeholder="Selecciona tu calle"
                    isDisabled={loading}
                    isLoading={loading}
                    variant='bordered'
                    color={selectedSubGroup2 === '' ? 'danger' : 'success'}
                    selectedKeys={[selectedSubGroup2]}
                    onChange={(e) => { setSelectedSubGroup2(e.target.value) }}
                    className={selectedSubGroup1 === '' ? 'max-w-xs hidden' : 'max-w-xs'}
                  >
                    {subGroup2List.map((subgroup2) => (
                      <SelectItem key={subgroup2.id}>
                        {subgroup2.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="PH"
                    placeholder="Selecciona tu PH"
                    isDisabled={loading}
                    isLoading={loading}
                    variant='bordered'
                    color={selectedSubGroup3 === '' ? 'danger' : 'success'}
                    selectedKeys={[selectedSubGroup3]}
                    onChange={(e) => { setSelectedSubGroup3(e.target.value) }}
                    className={selectedSubGroup2 === '' ? 'max-w-xs hidden' : 'max-w-xs'}
                  >
                    {subGroup3List.map((subgroup3) => (
                      <SelectItem key={subgroup3.id}>
                        {subgroup3.name}
                      </SelectItem>
                    ))}
                  </Select>

                </div>
                <Button
                  color='primary'
                  variant='shadow'
                  type='submit'
                  onPress={() => { (handleUserUpdate()) }}
                  className='px-10'
                  isLoading={loading}
                  isDisabled={disableButton}
                >
                  {loading ? 'Actualizando...' : 'Actualizar'}
                </Button>
                <p>Todas las direcciones: {selectedAllAddress ? 'true' : 'false'}</p>
                <p>Name: {name !== null ? 'true' : false}</p>
                <p>Can Submit: {disableButton ? 'true' : 'false'}</p>
              </div>
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
            </div>
          </div>
        </div>
      </section>
  )
}
