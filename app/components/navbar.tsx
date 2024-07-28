'use client'

import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, User } from '@nextui-org/react'
import { IconHomeFilled, IconLogout, IconMoon, IconPlus, IconSettings2, IconSun, IconUserEdit } from '@tabler/icons-react'
import { AuthSignOutButton } from './auth-button-signout'
import Link from 'next/link'
import { useTheme } from 'next-themes'

export default function NavbarComponent ({
  profileName,
  profileUsername,
  profileAvatarUrl
}: {
  profileName: string
  profileUsername: string
  profileAvatarUrl: string
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-300 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        <button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-200 dark:hover:bg-gray-800 group">
          <Link href="/"><IconHomeFilled className='w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' /></Link>
          <span className="sr-only">Home</span>
        </button>
        <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Inicio
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div className="flex items-center justify-center">
          <button data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
            <Link href="/send" ><IconPlus className="w-6 h-6 text-white dark:text-black" stroke={2.5} /></Link>
            <span className="sr-only">New item</span>
          </button>
        </div>
        <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Create new item
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div data-tooltip-target="tooltip-profile" className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-100 dark:hover:bg-gray-800 group">
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                isBordered
                showFallback
                as="button"
                className="transition-transform text-gray-700 dark:text-gray-400"
                color="default"
                size="sm"
                src={profileAvatarUrl ?? ''}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
            >
              <DropdownItem key="profile" href='/account' color='primary' startContent={<IconUserEdit stroke={1} />} className="h-20 gap-2 text-gray-800 dark:text-gray-400">
                <User
                  name={profileName ?? ''}
                  description={profileUsername ?? ''}
                  avatarProps={{
                    src: '',
                    className: 'w-6 h-6 text-tiny hidden'
                  }}
                />
              </DropdownItem>
              <DropdownItem key="settings" className='hidden' startContent={<IconSettings2 stroke={1} width={20} height={20} />}>
                Configuracion
              </DropdownItem>
              {theme === 'light'
                ? (<DropdownItem
                    key="theme"
                    startContent={<IconMoon stroke={1} />}
                    onPress={() => { setTheme('dark') }}
                  >
                    Modo Oscuro
                  </DropdownItem>)
                : (<DropdownItem
                    key="theme"
                    startContent={<IconSun stroke={1} />}
                    onPress={() => { setTheme('light') }}
                  >
                    Modo Claro
                  </DropdownItem>)
              }
              <DropdownItem key="logout" color="danger" startContent={<IconLogout stroke={1} />} onPress={onOpen}>
                Cerrar Sesion
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <span className="sr-only">Profile</span>
        </div>
        <div id="tooltip-profile" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Profile
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        placement="bottom-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Cerrar Sesion</ModalHeader>
              <ModalBody>
                <p>
                  Seguro que quieres cerrar Sesion?
                </p>
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
  )
}
