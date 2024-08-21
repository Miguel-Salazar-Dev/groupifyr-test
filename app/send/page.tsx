import { ComposeMessage } from '../components/compose-message'
import { redirect } from 'next/navigation'
import SendHeader from '../components/send-header'
import { MessageList } from '../components/messsage-list'
import { createClient } from '@/utils/supabase/server'

export default async function Send () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }

  const { data } = await supabase
    .from('messages')
    .select('*, author: profile!inner(*), attach: attachments!inner(*), smiles: smile(user_id)')
    .eq('profile.id', user.id)
    .order('created_at', { ascending: false })

  const messages =
    data?.map((message) => {
      const hasSmiles = Array.isArray(message.smiles)
      const userHasSmiledMessage = hasSmiles
        ? message.smiles.some(
          (smile) => smile.user_id === user.id
        )
        : false
      const hasAttachment = Array.isArray(message.attach)
      const messageHasAttachment = hasAttachment
        ? message.attach.some(
          (attachment) => attachment.id_user === user.id
        )
        : false

      return {
        ...message,
        author: Array.isArray(message.author) ? message.author[0] : message.author,
        message_has_attachment: messageHasAttachment,
        attach: Array.isArray(message.attach) ? message.attach[0] : message.attach,
        user_has_smiled_message: userHasSmiledMessage,
        smiles: hasSmiles ? message.smiles.length : 0
      }
    }) ?? []

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100 text-black dark:bg-black dark:text-white">
      <section className='max-w-[600px] w-11/12 mx-auto border-l border-r border-gray-400 dark:border-white/80 min-h-screen'>
        <div className='flex flex-col h-screen'>
          <div className='w-full h-1/10 flex flex-initial items-center justify-start border pt-2 pb-2'>
            <SendHeader />
          </div>
          <div className='flex-1 overflow-y-auto bg-gray-200 p-3 rounded-md'>
            <MessageList messages={messages} />
          </div>
          <div className='w-full h-2/10 flex flex-initial items-center justify-center'>
            <ComposeMessage />
          </div>
        </div>
      </section>
    </main>
  )
}
