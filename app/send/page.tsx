import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { ComposeMessage } from '../components/compose-message'
import { type Database } from '../types/database.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { Avatar } from '@nextui-org/react'

export default async function Send () {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100 text-black dark:bg-black dark:text-white">
      <section className='max-w-[600px] w-11/12 mx-auto border-l border-r border-gray-400 dark:border-white/80 min-h-screen'>
        <div className='flex flex-col h-screen'>
          <div className='w-full h-1/10 flex flex-initial items-center justify-start border pt-2 pb-2'>
            <Link href={'/'}><IconArrowLeft stroke={2} width={30} height={30} /></Link>
            <Avatar isBordered radius="full" size="lg" src={session.user?.user_metadata?.avatar_url} className='ml-2' />
            <div className="flex flex-col gap-1 items-start justify-center ml-4">
              <h4 className="text-small font-semibold leading-none text-default-800">{session.user?.user_metadata?.name}</h4>
              <h5 className="text-small tracking-tight text-default-500">{session.user?.user_metadata?.email}</h5>
            </div>
          </div>
          <div className='flex-1 overflow-y-auto bg-gray-200 p-3 rounded-md'>
            <p>Mensajes Enviados</p>
            <p>Mensajes Enviados</p>
            <p>Mensajes Enviados</p>
            <p>Mensajes Enviados</p>
            <p>Mensajes Enviados</p>
            <p>Mensajes Enviados</p>
            <p>Mensajes Enviados</p>
            <p>Mensajes Enviados</p>
            <p>Mensajes Enviados</p>
            <p>Mensajes Enviados</p>
            <p>Mensajes Enviados</p>
            <p>Mensajes Enviados</p>
          </div>
          <div className='w-full h-2/10 flex flex-initial items-center justify-center'>
            <ComposeMessage />
          </div>
        </div>
      </section>
    </main>
  )
}
