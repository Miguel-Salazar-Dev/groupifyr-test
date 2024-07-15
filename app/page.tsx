import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from './components/auth-button-server'
import { redirect } from 'next/navigation'
import { MessageList } from './components/messsage-list'
import { type Database } from './types/database.types'
import { ComposeMessage } from './components/compose-message'
import { ScrollShadow } from '@nextui-org/react'
import { ThemeSwitcher } from './components/theme-switcher'
import { type Message } from './types/posts'

export default async function Home () {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: messages } = await supabase
    .from('messages')
    .select('*, profile(name, username, avatar_url)')
    .order('created_at', { ascending: false })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100 text-black dark:bg-black dark:text-white">
      <section className='max-w-[600px] w-11/12 mx-auto border-l border-r border-gray-400 dark:border-white/80 min-h-screen'>
        <div className='flex flex-1 flex-col'>
        <div className='h-1/4'>
          <ThemeSwitcher />
          <AuthButtonServer />
          <ComposeMessage profileAvatarUrl={session.user?.user_metadata?.avatar_url} />
        </div>
        <div className='h-3/4'>
          <ScrollShadow size={30} className='w-full h-3/4'>
            <MessageList messages={messages as Message[]} />
          </ScrollShadow>
        </div>
        </div>
      </section>
    </main>
  )
}
