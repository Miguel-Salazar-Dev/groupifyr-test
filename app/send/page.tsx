import { ComposeMessage } from '../components/compose-message'
import { redirect } from 'next/navigation'
import { MessageList } from '../components/messsage-list'
import { createClient } from '@/utils/supabase/server'
import { GetUserProfile } from '../actions/user-profile-action'
import { Avatar, Link } from '@nextui-org/react'
import { IconArrowLeft } from '@tabler/icons-react'

export default async function Send () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const profile = await GetUserProfile()

  if (user === null || profile === null) {
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
    <section className='max-w-[37.50em] w-11/12 mx-auto bg-white dark:bg-zinc-800 min-h-screen'>
      <div className='flex flex-col h-screen'>
        <div className='w-full h-1/10 flex flex-initial items-center justify-start border pt-2 pb-2'>
          <div className='w-full flex flex-initial items-center justify-start'>
            <Link href={'/'}><IconArrowLeft stroke={2} width={30} height={30} /></Link>
            <Avatar showFallback isBordered radius="full" size="lg" src={profile.avatarurl} className='ml-2 text-gray-700 dark:text-gray-400' />
            <div className="flex flex-col gap-1 items-start justify-center ml-4">
              <h4 className="text-small font-semibold leading-none text-default-800">{profile.name}</h4>
              <h5 className="text-small tracking-tight text-default-500">{profile.username}</h5>
            </div>
          </div>
        </div>
        <div className='flex-1 overflow-y-auto bg-gray-200 p-3'>
          <MessageList messages={messages} />
        </div>
        <div className='z-[80] bg-[linear-gradient(0deg,#fff_80%,#fff3)] justify-center items-center w-full flex fixed -translate-x-2/4 max-w-full pt-4 pb-1 left-2/4 bottom-0 md:max-w-[37.50em]'>
          <ComposeMessage />
        </div>
      </div>
    </section>
  )
}
