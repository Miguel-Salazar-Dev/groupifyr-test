'use client'

import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, User } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { AuthSignOutButton } from '../auth-button-signout'
import { useState } from 'react'
import SidebarItem from '@/app/admin/components/sidebar-item'
import { IconLogout, IconMoon, IconSun, IconUserEdit } from '@tabler/icons-react'

export default function NavbarAdmin ({ profile }: { profile: UserProfile }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isMenuOpen, setMenuIsOpen] = useState<boolean>(true) // Inicia abierto
  const { theme, setTheme } = useTheme()
  // profile information
  const profileName = profile.name
  const profileUsername = profile.username
  const profileAvatarUrl = profile.avatarurl
  // Group information
  const profileGroupName = profile.group
  const profileLogoImage = profile.group_logo
  const profileBackgroundImage = profile.group_backgroud

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
              src={profileLogoImage}
              alt={`${profileGroupName} Logo`}
              className="mr-3 h-6 sm:h-9"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              {profileGroupName}
            </span>
          </div>
          <div className="mt-8 px-2">
            <Image
              isBlurred
              alt="Imagen de fondo del grupo"
              src={profileBackgroundImage}
              fallbackSrc="https://mxwpvnxcecxvaphigssx.supabase.co/storage/v1/object/public/groups/fallback_image.jpg"
            />
          </div>
          <div className="mt-12">
            <ul>
              <SidebarItem href={'#'} icon={'IconInbox'} text={'Bandeja de entrada'} />
              <SidebarItem href={'#'} icon={'IconSend'} text={'Enviar mensaje'} />
              <SidebarItem href={'#'} icon={'IconUsersGroup '} text={'Configuración del Grupo'} />
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
                name={profileName}
                size="lg"
                src={profileAvatarUrl}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" href="#" color="primary" startContent={<IconUserEdit stroke={1} />} className="h-20 gap-2 text-gray-800 dark:text-gray-400">
                <User
                  name={profileName}
                  description={(
                    <div>
                      <p>{profileUsername}</p>
                      <p>{profileGroupName}</p>
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
