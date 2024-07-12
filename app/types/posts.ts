import { type Database } from './database.types'

type MessageEntity = Database['public']['Tables']['messages']['Row']
type ProfileEntity = Database['public']['Tables']['profile']['Row']

export type Message = MessageEntity & {
  profile: ProfileEntity
}
