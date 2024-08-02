import { redirect } from 'next/navigation'
import { MessageList } from './components/messsage-list'
import NavbarComponent from './components/navbar'
import { createClient } from '@/utils/supabase/server'
import { GetUserProfile } from './actions/user-profile-action'

export default async function Home () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }

  const profile = await GetUserProfile()

  const profileGroupName = profile?.group
  const profileGroupId = profile?.group_id ?? ''

  const { data } = await supabase
    .from('messages')
    .select('*, author: profile!inner(*), attach: attachments!inner(*), smiles: smile(user_id)')
    .eq('profile.id_group', profileGroupId)
    .is('profile.admin', true)
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

      return {
        ...message,
        author: Array.isArray(message.author) ? message.author[0] : message.author,
        message_has_attachment: hasAttachment,
        attach: Array.isArray(message.attach) ? message.attach[0] : message.attach,
        user_has_smiled_message: userHasSmiledMessage,
        smiles: hasSmiles ? message.smiles.length : 0
      }
    }) ?? []

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100 text-black dark:bg-black dark:text-white">
      <section className='max-w-[600px] w-11/12 mx-auto border-l border-r border-gray-200 dark:border-white/80 min-h-screen'>
        <div className='flex flex-col h-screen'>
          <div className='h-1/4 flex flex-col rounded-md bg-cover bg-center bg-no-repeat align-top justify-end' style={{
            backgroundImage: "url('https://uploads-ssl.webflow.com/666254e5dfd9646b06c34d12/6667b677f57c3a1630249665_brand_bellavista_background.webp')"
          }}>
            <div className='h-[100px] w-[100px] flex flex-col rounded-md bg-cover bg-center bg-no-repeat relative mb-[-50px] ml-1 z-50' style={{ backgroundImage: "url('https://uploads-ssl.webflow.com/666254e5dfd9646b06c34d12/6695d91f092ad1e024db6253_logo_jcbv_transparent_2.png')" }} />
          </div>
          <div className='flex flex-row w-full h-[50px] align-middle justify-end'>
            <h1 className='font-semibold text-3xl text-default-700 mr-1'>{profileGroupName}</h1>
          </div>
          <div className='flex-1 overflow-y-auto'>
            <MessageList messages={messages} />
            <div className='flex flex-col w-full h-24' />
          </div>
          <NavbarComponent />
        </div>
      </section>
    </main>
  )
}
