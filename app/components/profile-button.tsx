'use client'

import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, User } from '@nextui-org/react'
import { IconLogout, IconMoon, IconSettings2, IconSun, IconUserEdit } from '@tabler/icons-react'
import { AuthSignOutButton } from './auth-button-signout'
import { useTheme } from 'next-themes'

export default function ProfileButton ({ profile }: { profile: UserProfile | undefined }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <div>
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              isBordered
              showFallback
              as="button"
              className="transition-transform text-gray-700 dark:text-gray-400"
              color="default"
              size="sm"
              src={profile?.avatarurl}
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
          >
            <DropdownItem key="profile" href='/account' color='primary' startContent={<IconUserEdit stroke={1} />} className="h-20 gap-2 text-gray-800 dark:text-gray-400">
              <User
                name={profile?.name}
                description={(
                  <div>
                    <p>{profile?.username}</p>
                    <p>{profile?.group}</p>
                  </div>
                )}
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
