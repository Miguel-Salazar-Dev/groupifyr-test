import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from './components/auth-button-server'
import { redirect } from 'next/navigation'
import { MessageList } from './components/messsage-list'
import { type Database } from './types/database.types'
import { ComposeMessage } from './components/compose-message'

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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className='max-w-[600px] w-11/12 mx-auto border-l border-r border-white/80 min-h-screen'>

        <ComposeMessage profileAvatarUrl={session.user?.user_metadata?.avatar_url} />
        <MessageList messages={messages} />
        <AuthButtonServer />
      </section>
    </main>
  )
}
