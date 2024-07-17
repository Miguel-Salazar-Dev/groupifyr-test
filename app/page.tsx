import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { MessageList } from './components/messsage-list'
import { type Database } from './types/database.types'
import { type Message } from './types/messages'
import NavbarComponent from './components/navbar'

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
        <div className='flex flex-col h-screen'>
        <div className='h-1/4 flex flex-col rounded-md bg-cover bg-center bg-no-repeat align-top justify-end' style={{
          backgroundImage: "url('https://uploads-ssl.webflow.com/666254e5dfd9646b06c34d12/6667b677f57c3a1630249665_brand_bellavista_background.webp')"
        }}>
        </div>
        <div className='flex-1 overflow-y-auto'>
          <MessageList messages={messages as Message[]} />
        </div>
        <div className='w-full h-16 flex items-center justify-center'>
          <NavbarComponent profileAvatarUrl={session.user?.user_metadata?.avatar_url} profileName={session.user?.user_metadata?.name} profileUserName={session.user?.user_metadata?.email} />
        </div>
        </div>
      </section>
    </main>
  )
}
