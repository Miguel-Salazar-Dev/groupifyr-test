'use client'

import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'
import { IconHomeFilled, IconCirclePlusFilled, IconSettings2 } from '@tabler/icons-react'
import { ThemeSwitcher } from './theme-switcher'
import { AuthSignOutButton } from './auth-button-signout'

export default function NavbarComponent ({
  profileAvatarUrl,
  profileUserName,
  profileName
}: {
  profileAvatarUrl: string
  profileUserName: string
  profileName: string
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <nav className="w-full h-16 flex">
      <div className='flex flex-row w-full'>
        <div className='flex items-center justify-center w-1/3 text-default-500'>
          <IconHomeFilled width={40} height={40} />
        </div>
        <div className='flex items-center justify-center w-1/3 text-default-700'>
          <IconCirclePlusFilled width={60} height={60} />
        </div>
        <div className='flex items-center justify-center w-1/3'>
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="default"
                name="Jason Hughes"
                size="md"
                src={profileAvatarUrl}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-20 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{profileName}</p>
                <p className="font-semibold">{profileUserName}</p>
              </DropdownItem>
              <DropdownItem key="settings"><div className='flex flex-row align-middle justify-start gap-1'><IconSettings2 stroke={1} width={20} height={20} /> Configuracion</div></DropdownItem>
              <DropdownItem key="team_settings"><ThemeSwitcher /></DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={onOpen}>
                Cerrar Sesion
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
    </nav>
  )
}