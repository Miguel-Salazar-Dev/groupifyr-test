import { createClient } from '@/utils/supabase/server'
import { GetUserProfile } from '../actions/user-profile-action'
// import { redirect } from 'next/navigation'
import InboxAdmin from './components/inbox-admin'
import { redirect } from 'next/navigation'

export default async function AdminPage () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const profile = await GetUserProfile()
  if (!profile.isAdmin) redirect('/')

  const profileGroupId = profile?.group_id ?? ''

  const { data } = await supabase
    .from('messages')
    .select('*, author: profile!inner(*), attach: attachments!inner(*), smiles: smile(user_id)')
    .eq('profile.id_group', profileGroupId)
    .is('profile.admin', false)
    .order('created_at', { ascending: false })

  const messages =
    data?.map((message) => {
      const hasSmiles = Array.isArray(message.smiles)
      const userHasSmiledMessage = hasSmiles
        ? message.smiles.some(
          (smile) => smile.user_id === user?.id
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
    <InboxAdmin profile={profile} messages={messages} />
  )
}
