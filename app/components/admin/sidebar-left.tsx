import SidebarItem from '@/app/admin/components/sidebar-item'
import { Image } from '@nextui-org/react'

export default function SidebarLeft ({ profileBackgroundImage }: { profileBackgroundImage: string }) {
  return (
    <aside id="separator-sidebar" className="fixed top-0 left-0 z-45 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Admin sidebar">
        <div className="flex flex-col w-full h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 items-center justify-center">
          <div className='flex w-11/12 h-1/2 pt-16 mx-auto items-start'>
            <Image
              isBlurred
              alt='Imagen de fondo del grupo'
              src={profileBackgroundImage}
              fallbackSrc='https://mxwpvnxcecxvaphigssx.supabase.co/storage/v1/object/public/groups/fallback_image.jpg'
            />
          </div>
          <ul className='flex flex-col h-1/2 space-y-2 font-medium w-full items-start justify-start'>
            <SidebarItem href={'#'} icon={'IconInbox'} text={'Bandeja de entrada'} />
            <SidebarItem href={'#'} icon={'IconSend'} text={'Enviar mensaje'} />
            <SidebarItem href={'#'} icon={'IconUsersGroup '} text={'Configuración del Grupo'} />
          </ul>
        </div>
      </aside>
  )
}
