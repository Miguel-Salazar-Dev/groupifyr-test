import { type Database as DB } from '@/lib/database.types'

type Message = DB['public']['Tables']['messages']['Row']
type Attachment = DB['public']['Tables']['attachments']['Row']
type Profile = DB['public']['Tables']['profile']['Row']
type Group = DB['public']['Tables']['group']['Row']

declare global {
  type Database = DB
  type MessageWithAuthor = Message & {
    author: Profile
    attach: Attachment
    message_has_attachment: boolean
    smiles: number
    user_has_smiled_message: boolean
  }
  interface UserProfile {
    name: string
    username: string
    avatarurl: string
    group: string
    group_id: string
  }
}
