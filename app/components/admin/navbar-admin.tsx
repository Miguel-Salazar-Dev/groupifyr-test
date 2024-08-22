'use client'

import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, User } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { AuthSignOutButton } from '../auth-button-signout'
import { useEffect, useState } from 'react'
import { IconInbox, IconLogout, IconMoon, IconSend, IconSun, IconUserEdit, IconUsersGroup } from '@tabler/icons-react'

interface OptionsProps {
  onOptionSelect: (option: string) => void
  profile: UserProfile | null
}

export default function NavbarAdmin ({ onOptionSelect, profile }: OptionsProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isMenuOpen, setMenuIsOpen] = useState<boolean>(true) // Inicia abierto
  const { theme, setTheme } = useTheme()
  const [optionMenu, setOptionMenu] = useState<string>('IconInbox')

  useEffect(() => {
    onOptionSelect(
      optionMenu
    )
  }, [optionMenu])

  return (
    <div className="relative flex min-h-screen">
      {/* Sidebar Nav */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 dark:text-white z-20 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: '18rem' }} // Ancho fijo de 72 (18rem)
      >
        <div className="flex flex-col items-center h-1/2 pt-20">
          <div className="flex flex-row">
            <Image
              src={profile?.group_logo}
              alt={`${profile?.group_name} Logo`}
              className="mr-3 h-6 sm:h-9"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              {profile?.group_name}
            </span>
          </div>
          <div className="mt-8 px-2">
            <Image
              isBlurred
              alt="Imagen de fondo del grupo"
              src={profile?.group_backgroud}
              fallbackSrc="https://mxwpvnxcecxvaphigssx.supabase.co/storage/v1/object/public/groups/fallback_image.jpg"
            />
          </div>
          <div className="mt-12 px-2">
            <ul>
              <Button
                size="md"
                radius="sm"
                color="default"
                variant='flat'
                startContent={<IconInbox stroke={2} />}
                onPress={() => { setOptionMenu('IconInbox') }}
                fullWidth
                className='justify-start items-center p-2 bg-transparent text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              >
                Bandeja de entrada
              </Button>
              <Button
                size="md"
                radius="sm"
                color="default"
                variant='flat'
                startContent={<IconSend stroke={2} />}
                onPress={() => { setOptionMenu('IconSend') }}
                fullWidth
                className='justify-start items-center p-2 bg-transparent text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              >
                Enviar mensaje
              </Button>
              <Button
                size="md"
                radius="sm"
                color="default"
                variant='flat'
                startContent={<IconUsersGroup stroke={2} />}
                onPress={() => { setOptionMenu('IconUsersGroup') }}
                fullWidth
                className='justify-start items-center p-2 bg-transparent text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              >
                Configuración del Grupo
              </Button>
            </ul>
          </div>

        </div>

        <div className="flex flex-col h-1/2 items-center justify-end pb-8">
          <Dropdown placement="right-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                showFallback
                as="button"
                className="transition-transform text-gray-700 dark:text-gray-400"
                color="primary"
                name={profile?.name}
                size="lg"
                src={profile?.avatarurl}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" href="#" color="primary" startContent={<IconUserEdit stroke={1} />} className="h-20 gap-2 text-gray-800 dark:text-gray-400">
                <User
                  name={profile?.name}
                  description={(
                    <div>
                      <p>{profile?.username}</p>
                      <p>{profile?.group_name}</p>
                    </div>
                  )}
                  avatarProps={{
                    src: '',
                    className: 'w-6 h-6 text-tiny hidden'
                  }}
                />
              </DropdownItem>
              {theme === 'light'
                ? (
                <DropdownItem
                  key="theme"
                  startContent={<IconMoon stroke={1} />}
                  onPress={() => { setTheme('dark') }}
                >
                  Modo Oscuro
                </DropdownItem>
                  )
                : (
                <DropdownItem
                  key="theme"
                  startContent={<IconSun stroke={1} />}
                  onPress={() => { setTheme('light') }}
                >
                  Modo Claro
                </DropdownItem>
                  )}
              <DropdownItem key="logout" color="danger" startContent={<IconLogout stroke={1} />} onPress={onOpen}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Modal isOpen={isOpen} placement="bottom-center" onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Cerrar Sesión</ModalHeader>
                <ModalBody>
                  <p>¿Seguro que quieres cerrar sesión?</p>
                  <AuthSignOutButton />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        {/* Button to toggle sidebar */}
        <div className="fixed top-4 left-4 z-30">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => { setMenuIsOpen(!isMenuOpen) }}
          >
            {/* Toggle icon based on isOpen state */}
            {isMenuOpen
              ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
                )
              : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
                )}
          </button>
        </div>
      </div>
    </div>
  )
}
