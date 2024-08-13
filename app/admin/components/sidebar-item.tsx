import { IconInbox, IconSend, IconUsersGroup } from '@tabler/icons-react'

export default function SidebarItem ({
  href,
  icon,
  text
}: {
  href: string
  icon: string
  text: string
}) {
  const stroke = 2
  const size = 25
  return (
    <li className='w-full'>
      <a href={href} className='flex flex-row w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
        { icon === 'IconInbox' && <IconInbox stroke={stroke} width={size} height={size} /> }
        { icon === 'IconSend' && <IconSend stroke={stroke} width={size} height={size} /> }
        { icon === 'IconUsersGroup ' && <IconUsersGroup stroke={stroke} width={size} height={size} /> }
        <span className='ms-3'>{text}</span>
      </a>
    </li>
  )
}
