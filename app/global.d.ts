import { type Database as DB } from '@/lib/database.types'

type Message = DB['public']['Tables']['messages']['Row']
type Profile = DB['public']['Tables']['profile']['Row']
type Group = DB['public']['Tables']['group']['Row']

declare global {
  type Database = DB
  type MessageWithAuthor = Message & {
    author: Profile
    smiles: number
    user_has_smiled_message: boolean
  }
  type UserProfile = Profile & {
    group: Group
  }
}
