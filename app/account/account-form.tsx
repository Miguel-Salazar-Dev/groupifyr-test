'use client'

import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { type ChangeEvent, useCallback, useEffect, useState } from 'react'
import UploadAvatar from './upload-avatar'
import { Button, Input, Select, SelectItem, type Selection } from '@nextui-org/react'
import { getGroupInformation, getSubGroup1Information, getSubGroup2Information, getSubGroup3Information } from '../actions/group-list'
import { useAlertStore } from '../stores/alert-store'

export default function AccountForm ({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const showAlert = useAlertStore(state => state.showAlert)

  // Valores del GRUPO (Corregimientos)
  // El grupo que esta cargado en la BD, y se actualiza cuando hay un update en el select
  // Se carga el Id para actualizar la BD y el name para vista del User
  const [groupId, setGroupId] = useState<string | null>(null)
  const [groupName, setGroupName] = useState<string | null>(null)
  // const [nameGroupSelected, setNameGroupSelected] = useState<string | null>()
  // Aqui se carga el listado de los grupos de la BD
  const [groupList, setGroupList] = useState<Group[]>([])
  // Valor del grupo que se escoge en el select
  const [selectedGroup, setSelectedGroup] = useState<Selection>(new Set([]))
  const [groupSelected, setGroupSelected] = useState<string | null>(null)

  // Valores del SUB_GRUPO_1 (Barrios)
  // El sub_grupo_1 que esta cargado en la BD, y se actualiza cuando hay un update en el select
  const [subGroup1Id, setSubGroup1Id] = useState<string | null>(null)
  const [subGroup1Name, setSubGroup1Name] = useState<string | null>(null)
  // Aqui se carga el listado filtrado por el ID del Grupo
  const [subGroup1List, setSubGroup1List] = useState<Group[]>([])
  // Valor del grupo que se escoge en el select
  const [selectedSubGroup1, setSelectedSubGroup1] = useState<Selection>(new Set([]))

  // Valores del SUB_GRUPO_2 (Direcciones)
  // El sub_grupo_2 que esta cargado en la BD, y se actualiza cuando hay un update en el select
  const [subGroup2Id, setSubGroup2Id] = useState<string | null>(null)
  const [subGroup2Name, setSubGroup2Name] = useState<string | null>(null)
  // Aqui se carga el listado filtrado por el ID del Grupo
  const [subGroup2List, setSubGroup2List] = useState<Group[]>([])
  // Valor del grupo que se escoge en el select
  const [selectedSubGroup2, setSelectedSubGroup2] = useState<Selection>(new Set([]))

  // Valores del SUB_GRUPO_3 (Propiedades)
  // El sub_grupo_3 que esta cargado en la BD, y se actualiza cuando hay un update en el select
  const [subGroup3Id, setSubGroup3Id] = useState<string | null>(null)
  const [subGroup3Name, setSubGroup3Name] = useState<string | null>(null)
  // Aqui se carga el listado filtrado por el ID del Grupo
  const [subGroup3List, setSubGroup3List] = useState<Group[]>([])
  // Valor del grupo que se escoge en el select
  const [selectedSubGroup3, setSelectedSubGroup3] = useState<Selection>(new Set([]))

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profile')
        .select('id, name, username, avatar_url, user_address!inner(*), group!inner(*)')
        .eq('id', user?.id ?? '')
        .single()

      if (error !== null && status !== 406) {
        console.log(error)
        throw new Error()
      }

      if (data !== null) {
        setUserId(data.id)
        setName(data.name)
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
        setGroupId(data.user_address[0].group_id)
        setGroupName(data.group.name)
        setSubGroup1Id(data.user_address[0].sub_1_id)
        setSubGroup2Id(data.user_address[0].sub_2_id)
        setSubGroup3Id(data.user_address[0].sub_3_id)
      }
    } catch (error) {
      console.log('Error cargando los datos del usuario!')
      showAlert('Error!', ' hubo un problema cargando los datos del usuario.', 'error')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  const getSubGroupsInfo = useCallback(async () => {
    const { data } = await supabase
      .from('user_address')
      .select('*, sub_group_1!inner(name), sub_group_2!inner(name), sub_group_3!inner(name)')
      .eq('user_id', userId ?? '')
      .eq('group_id', groupId ?? '')
      .single()

    setSubGroup1Name(data?.sub_group_1.name ?? '')
    setSubGroup2Name(data?.sub_group_2.name ?? '')
    setSubGroup3Name(data?.sub_group_3.name ?? '')
  }, [userId, groupId, supabase])

  const getGroups = useCallback(async () => {
    const groups = await getGroupInformation()
    if (groups === null) return
    setGroupList(groups)
  }, [])

  useEffect(() => {
    getProfile()
    getGroups()
    getSubGroupsInfo()
  }, [user, getProfile, getGroups, getSubGroupsInfo])

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
        .eq('id', user?.id ?? '')
        .select()
      if (error !== null) { alert('Error!') }
      console.log('El perfil ha sido actualizado!')
      showAlert('Exito!', ' El perfil ha sido actualizado.', 'success')
    } catch (error) {
      console.log('Error actualizando los datos!')
      showAlert('Error!', ' hubo un problema actualizando los datos', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleChangeGroupList = async (e: ChangeEvent<HTMLSelectElement>) => {
    const idGrupo = e.target.value
    const barrios = await getSubGroup1Information(idGrupo)
    setSubGroup1List(barrios)
  }

  const handleChangeSub1List = async (e: ChangeEvent<HTMLSelectElement>) => {
    const idSub1 = e.target.value
    const direcciones = await getSubGroup2Information(idSub1)
    setSubGroup2List(direcciones)
    setGroupSelected(idSub1)
  }

  const handleChangeSub2List = async (e: ChangeEvent<HTMLSelectElement>) => {
    const idSub2 = e.target.value
    const propiedades = await getSubGroup3Information(idSub2, groupSelected ?? '')
    setSubGroup3List(propiedades)
  }

  const toggleShow = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex w-full items-center justify-center'>
        <UploadAvatar
          uid={user?.id ?? null}
          url={avatar_url}
          onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({
              name,
              username,
              avatar_url: url
            })
          }}
        />
      </div>
      <div className='flex flex-col'>
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
          <div className='flex flex-col border w-full max-w-sm gap-6 border-gray-200 rounded p-3'>
            <div className='flex flex-row' id='corregimiento'>
              <Input
                isDisabled
                size='md'
                type="corregimientoId"
                name="corregimientoId"
                id="corregimientoId"
                label="Corregimiento Id"
                labelPlacement='outside'
                variant='bordered'
                className='max-w-sm hidden'
                value={groupId ?? ''}
              />
              <Input
                isDisabled
                size='md'
                type="corregimientoName"
                name="corregimientoName"
                id="corregimientoName"
                label="Corregimiento Name"
                labelPlacement='outside'
                variant='bordered'
                className='max-w-sm'
                value={groupName ?? ''}
              />
            </div>
            <div className='flex flex-row w-ful' id='barrios'>
              <Input
                isDisabled
                size='md'
                type="barrioId"
                name="barrioId"
                id="corregimientoId"
                label="Barrio Id"
                labelPlacement='outside'
                variant='bordered'
                className='max-w-sm hidden'
                value={subGroup1Id ?? ''}
              />
              <Input
                isDisabled
                size='md'
                type="barrioName"
                name="barrioName"
                id="barrioName"
                label="Barrio Name"
                labelPlacement='outside'
                variant='bordered'
                className='max-w-sm'
                value={subGroup1Name ?? ''}
              />
            </div>
            <div className='flex flex-row w-ful' id='direccion'>
              <Input
                isDisabled
                size='md'
                type="direccionId"
                name="direccionId"
                id="direccionId"
                label="Dirección Id"
                labelPlacement='outside'
                variant='bordered'
                className='max-w-sm hidden'
                value={subGroup2Id ?? ''}
              />
              <Input
                isDisabled
                size='md'
                type="direccionName"
                name="direccionName"
                id="direccionName"
                label="Dirección Name"
                labelPlacement='outside'
                variant='bordered'
                className='max-w-sm'
                value={subGroup2Name ?? ''}
              />
            </div>
            <div className='flex flex-row w-ful' id='propiedad'>
              <Input
                isDisabled
                size='md'
                type="propiedadId"
                name="propiedadId"
                id="propiedadId"
                label="Propiedad Id"
                labelPlacement='outside'
                variant='bordered'
                className='max-w-sm hidden'
                value={subGroup3Id ?? ''}
              />
              <Input
                isDisabled
                size='md'
                type="propiedadName"
                name="propiedadName"
                id="propiedadName"
                label="Propiedad Name"
                labelPlacement='outside'
                variant='bordered'
                className='max-w-sm'
                value={subGroup3Name ?? ''}
              />
            </div>
            <div className='flex flex-row w-full justify-end'>
              <Button
                size='sm'
                color={isVisible ? 'danger' : 'primary'}
                variant='bordered'
                onClick={toggleShow}
              >
                {isVisible ? 'Cancelar' : 'Cambiar'}
              </Button>
            </div>
          </div>
          {isVisible && (
            <div className='flex flex-col border w-full max-w-sm gap-6 border-gray-300 rounded p-3'>
              <Select
                label="Corregimiento"
                placeholder="Selecciona tu corregimiento"
                selectedKeys={selectedGroup}
                onSelectionChange={setSelectedGroup}
                onChange={handleChangeGroupList}
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
                selectedKeys={selectedSubGroup1}
                onSelectionChange={setSelectedSubGroup1}
                onChange={handleChangeSub1List}
                className='max-w-xs'
              >
                {subGroup1List.map((subgroup1) => (
                  <SelectItem key={subgroup1.id}>
                    {subgroup1.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Direcciones"
                placeholder="Selecciona tu dirección"
                selectedKeys={selectedSubGroup2}
                onSelectionChange={setSelectedSubGroup2}
                onChange={handleChangeSub2List}
                className='max-w-xs'
              >
                {subGroup2List.map((subgroup2) => (
                  <SelectItem key={subgroup2.id}>
                    {subgroup2.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Propiedades"
                placeholder="Selecciona tu propiedad"
                selectedKeys={selectedSubGroup3}
                onSelectionChange={setSelectedSubGroup3}
                className='max-w-xs'
              >
                {subGroup3List.map((subgroup3) => (
                  <SelectItem key={subgroup3.id}>
                    {subgroup3.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}
          <Button
            color='primary'
            variant='shadow'
            type='submit'
            onClick={() => {
              updateProfile({
                name,
                username,
                avatar_url
              })
            }}
            className='px-10'
            isLoading={loading}
            isDisabled={loading}
          >
            {loading ? 'Actualizando...' : 'Actualizar'}
          </Button>
        </form>
      </div>
    </div>
  )
}
