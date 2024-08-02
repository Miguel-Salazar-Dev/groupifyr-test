import Link from 'next/link'
import NavbarComponent from '../components/navbar'
import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'
import { IconArrowLeft } from '@tabler/icons-react'

export default async function Account () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100 text-black dark:bg-black dark:text-white">
      <section className='max-w-[600px] w-11/12 mx-auto border-l border-r border-gray-200 dark:border-white/80 min-h-screen'>
        <div className='flex flex-col h-screen'>
          <div className='w-full h-1/10 flex flex-initial items-center justify-start border p-2 gap-4'>
            <Link href={'/'}><IconArrowLeft stroke={2} width={30} height={30} className='font-semibold text-3xl text-default-700' /></Link>
            <h1 className='font-semibold text-3xl text-default-700'>Pagina de Perfil</h1>
          </div>
          <div className='w-full flex-grow flex flex-col justify-start py-5 px-3'>
            <AccountForm user={user} />
          </div>
        </div>
        <NavbarComponent />
      </section>
    </main>
  )
}
