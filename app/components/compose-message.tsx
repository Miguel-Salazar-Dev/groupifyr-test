import { Avatar, Button } from '@nextui-org/react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { IconSend2 } from '@tabler/icons-react'
import { revalidatePath } from 'next/cache'
import { ComposeMessageTextarea } from './compose-post-textarea'

export function ComposeMessage ({
  profileAvatarUrl
}: {
  profileAvatarUrl: string
}) {
  const addMessage = async (formData: FormData) => {
    'use server'
    const content = formData.get('content')
    if (content == null) return

    const supabase = createServerComponentClient({ cookies })
    // Revisar autenticación del usuario
    const { data: { user } } = await supabase.auth.getUser()
    if (user == null) return

    await supabase.from('messages').insert({ content, user_id: user.id })

    revalidatePath('/')
  }
  return (
    <form action={addMessage} className='flex flex-row p-3 border-b border-white/20'>
      <Avatar isBordered radius="full" size="md" src={profileAvatarUrl} />
      <div className='flex flex-1 flex-col ml-2'>
      <ComposeMessageTextarea />
        <Button type='submit' radius="full" className="bg-gradient-to-tr from-sky-800 to-sky-500 text-white shadow-lg px-5 py-2 self-end"><IconSend2 stroke={2} /></Button>
      </div>
    </form>
  )
}
