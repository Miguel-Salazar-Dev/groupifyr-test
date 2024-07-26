import { IconUsersGroup } from '@tabler/icons-react'

export default function HeaderAuth ({ option }: { option: string }) {
  return (
    <div className="flex flex-row items-center gap-2 px-5">
      <IconUsersGroup stroke={2} className='fill-green-600'/>
      <h1 className='text-lg font-bold'>{option === 'LogIn' ? 'Iniciar sesión ' : 'Regístrarse '}en Groupifyr</h1>
    </div>
  )
}
