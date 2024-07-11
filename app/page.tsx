import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from './components/auth-button-server'
import { redirect } from 'next/navigation'
import MessageCard from './components/message-card'

export default async function Home () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: messages } = await supabase
    .from('messages')
    .select('*, profile(name, username, avatar_url)')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthButtonServer />
      {
        messages?.map(message => {
          const {
            id,
            profile,
            content
          } = message

          const {
            username: profileUserName,
            name: profileName,
            avatar_url: profileAvatarUrl
          } = profile

          return (
            <MessageCard
              key={id}
              content={content}
              profileName={profileName}
              profileUserName={profileUserName}
              profileAvatarUrl={profileAvatarUrl}
            />
          )
        })
      }
    </main>
  )
}
