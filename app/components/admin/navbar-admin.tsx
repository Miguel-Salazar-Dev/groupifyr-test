import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarToggle
} from 'flowbite-react'

export default function NavbarAdmin ({ profile }: { profile: UserProfile }) {
  // profile information
  const profileName = profile?.name
  const profileUsername = profile?.username
  const profileAvatarUrl = profile?.avatarurl

  // Group information
  const profileGroupName = profile?.group
  const profileLogoImage = profile?.group_logo
  const profileGroupWebsite = profile?.group_website

  return (
    <div className='fixed top-0 left-0 z-50 w-full'>
        <Navbar fluid rounded>
          <NavbarBrand href={profileGroupWebsite}>
            <img src={profileLogoImage} className='mr-3 h-6 sm:h-9' alt={`${profileGroupName} Logo`} />
            <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>{profileGroupName}</span>
          </NavbarBrand>
          <div className='flex md:order-2'>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt='Avatar del usuario' img={profileAvatarUrl} rounded />
              }
            >
              <DropdownHeader>
                <span className='block text-sm'>{profileName}</span>
                <span className='block truncate text-sm font-medium'>{profileUsername}</span>
              </DropdownHeader>
              <DropdownItem>Perfil</DropdownItem>
              <DropdownItem>Modo Oscuro</DropdownItem>
              <DropdownDivider />
              <DropdownItem>Cerrar Sesión</DropdownItem>
            </Dropdown>
            <NavbarToggle />
          </div>
        </Navbar>
      </div>
  )
}
