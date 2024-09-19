import { fetchGroup, fetchGroupList, updateBackground, updateGroupInformation, updateLogo } from '@/app/lib/data'
import { useAlertStore } from '@/app/stores/alert-store'
import { Button, Input } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import UploadLogo from './upload-logo'
import UploadBackground from './upload-background'

interface Usuarios {
  name: string
  username: string
  avatar_url: string
  admin: boolean
}

export default function ConfigGroup ({ groupId }: { groupId: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const showAlert = useAlertStore(state => state.showAlert)
  const [groupName, setGroupName] = useState<string>('')
  const [groupImage, setGroupImage] = useState<string>('')
  const [groupLogo, setGroupLogo] = useState<string>('')
  const [groupWebsite, setGroupWebsite] = useState<string>('')
  const [administradores, setAdministradores] = useState<Usuarios[]>([])
  const [usuarios, setUsuarios] = useState<Usuarios[]>([])

  const getGroupInfo = useCallback(async () => {
    try {
      setIsLoading(true)

      const group = await fetchGroup(groupId)

      if (group !== null) {
        setGroupName(group.name)
        setGroupImage(group.background_img)
        setGroupLogo(group.logo_img)
        setGroupWebsite(group.website ?? '')
      }

      const usuarios = await fetchGroupList(groupId)

      if (usuarios !== null) {
        setAdministradores(
          usuarios.filter(usuario =>
            usuario.admin
          )
        )
        setUsuarios(
          usuarios.filter(usuario =>
            !usuario.admin
          )
        )
      }
    } catch (error) {
      console.error('Problema al obtener información del grupo, ', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getGroupInfo()
  }, [getGroupInfo])

  const handleGroupUpdate = async () => {
    try {
      setIsLoading(true)

      const result = await updateGroupInformation(groupId, groupName, groupWebsite)

      if (result.success) {
        console.log('Información del grupo actualizada correctamente!')
        showAlert('Exito!', ' La información del grupo ha sido actualizada.', 'success')
      } else {
        console.error('Error al intentar actualizar la información del grupo. ', result.error)
        showAlert('Error!', ' hubo un problema actualizando los datos', 'error')
      }
    } catch (error) {
      console.error('Error al conectarse a la base de datos, ', error)
      showAlert('Error!', ' hubo un problema actualizando los datos', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogoUpdate = async (url: string) => {
    try {
      setGroupLogo(url)
      const rs = await updateLogo(groupId, url)

      if (rs.success) {
        console.log('Logo del grupo actualizado correctamente!')
        showAlert('Exito!', 'Se ha actualizado con exito el logo del grupo', 'success')
      }
    } catch (error) {
      showAlert('Error!', 'Error al actualizar el logo del grupo', 'error')
    }
  }

  const handleBackgroundUpdate = async (url_background: string) => {
    try {
      setGroupImage(url_background)
      const rs = await updateBackground(groupId, url_background)

      if (rs.success) {
        console.log('Imagen del grupo actualizada correctamente!')
        showAlert('Exito!', 'Se ha actualizado con exito la imagen de fondo del grupo', 'success')
      }
    } catch (error) {
      showAlert('Error!', 'Error al actualizar la imagen de fondo del grupo', 'error')
    }
  }

  return (
    <section className='static w-3/4 mx-auto min-h-screen lg:ml-[18rem]'>
      <div className='flex flex-col w-full h-screen p-5 gap-16 items-center'>
        <div id="branding" className='flex flex-row gap-5 w-full h-[150px] bg-zinc-600 rounded-md p-5'>
          <h1 className='flex w-full font-semibold size text-3xl text-gray-200 items-center justify-center'>
            Configuración del Grupo
          </h1>
        </div>
        <div className='flex flex-row w-full justify-evenly'>
          <div className='flex flex-col gap-5 items-start'>
            <div className='flex flex-row gap-10'>
              <UploadLogo
                uid={groupId}
                url={groupLogo}
                onUpload={(url) => {
                  handleLogoUpdate(url)
                }}
              />
              <UploadBackground
                uid={groupId}
                url={groupImage}
                onUploadBackground={(url_background) => {
                  handleBackgroundUpdate(url_background)
                }}
              />
            </div>
            <Input
              type='name'
              label='Nombre del grupo'
              labelPlacement='outside'
              placeholder='Introduce el nombre del grupo'
              variant='bordered'
              radius='sm'
              className='w-80'
              color='default'
              value={groupName}
              onChange={(e) => { setGroupName(e.target.value) }}
              isDisabled={isLoading}
            />
            <Input
              type='website'
              label='Website del grupo'
              labelPlacement='outside'
              placeholder='Introduce el website del grupo'
              variant='bordered'
              radius='sm'
              className='w-80'
              color='default'
              value={groupWebsite}
              onChange={(e) => { setGroupWebsite(e.target.value) }}
              isDisabled={isLoading}
            />
            <Button
              color='primary'
              variant='shadow'
              type='submit'
              onPress={() => { (handleGroupUpdate()) }}
              className='px-10'
              isLoading={isLoading}
            >
              {isLoading ? 'Actualizando' : 'Actualizar'}
            </Button>
          </div>
          <div className='relative flex flex-col w-1/3 text-slate-200 bg-zinc-500 h-[450px] min-h-[450px] max-h-[450px] overflow-y-auto'>
            {/* Admin Section */}
            <div className='relative'>
              <div className='sticky top-0'>
                <div className='flex w-full bg-zinc-700/80 p-3'>
                  <h2 className='text-xl font-bold'>Administrador</h2>
                </div>
              </div>
              <div className='flex flex-row w-full p-5 gap-5'>
                {isLoading
                  ? (
                  <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    )
                  : (
                  <img
                    src={administradores[0].avatar_url}
                    alt={`Imagen de ${administradores[0].name}`}
                    width={64}
                    height={64}
                    className='p-1 rounded-full ring-2 ring-secondary dark:ring-secondary w-16 h-16'
                  />
                    )
                }
                <div className='flex flex-grow flex-col justify-center gap-2'>
                  <p className='text-base font-semibold'>{isLoading ? 'Cargando...' : administradores[0].name}</p>
                  <p className='text-xs font-light'>{isLoading ? 'Cargando...' : administradores[0].username}</p>
                </div>
                <div className='flex flex-col'>
                  <span className="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-yellow-900 text-yellow-300">
                    Admin
                  </span>
                </div>
              </div>
            </div>
            {/* Colab Section */}
            <div className='relative'>
              <div className='sticky top-0 backdrop-blur-sm'>
                <div className='flex w-full bg-zinc-700/80 p-3'>
                  <h2 className='text-xl font-bold'>Colaboradores</h2>
                </div>
              </div>
              <div className='divide-y dark:divide-slate-200/5'>
                {administradores.map((administrador) => (
                  <div className='flex items-center gap-4 p-4' key={administrador.username}>
                    <img
                      src={administrador.avatar_url}
                      alt={`Imagen de ${administrador.name}`}
                      width={40}
                      height={40}
                      className='p-1 rounded-full ring-2 ring-success dark:ring-success w-10 h-10'
                    />
                    <div className='flex flex-grow flex-col justify-center gap-2'>
                      <p className='text-base font-semibold'>{administrador.name}</p>
                      <p className='text-xs font-light'>{administrador.username}</p>
                    </div>
                    <div className='flex flex-col'>
                      <span className="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-green-900 text-green-300">
                        Colaborador
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* User Section */}
            <div className='relative'>
              <div className='sticky top-0 backdrop-blur-sm'>
                <div className='flex w-full bg-zinc-700/80 p-3'>
                  <h2 className='text-xl font-bold'>Usuarios</h2>
                </div>
              </div>
              <div className='divide-y dark:divide-slate-200/5'>
                {usuarios.map((usuario) => (
                  <div className='flex items-center gap-4 p-4' key={usuario.username}>
                    <img
                      src={usuario.avatar_url}
                      alt={`Imagen de ${usuario.name}`}
                      width={32}
                      height={32}
                      className='p-1 rounded-full ring-2 ring-primary dark:ring-primary w-8 h-8'
                    />
                    <div className='flex flex-grow flex-col justify-center gap-2'>
                      <p className='text-base font-semibold'>{usuario.name}</p>
                      <p className='text-xs font-light'>{usuario.username}</p>
                    </div>
                    <div className='flex justify-end'>
                      <span className="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-900 text-blue-300">
                        Usuario
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
