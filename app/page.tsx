import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from './components/auth-button-server'

export default async function Home () {
  const supabase = createServerComponentClient({ cookies })
  const { data: messages } = await supabase.from('messages').select()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthButtonServer />
      <pre>
        {
          JSON.stringify(messages, null, 2)
        }
      </pre>

    </main>
  )
}
