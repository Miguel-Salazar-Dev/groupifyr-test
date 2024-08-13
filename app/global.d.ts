import { type Database as DB } from '@/lib/database.types'

type Message = DB['public']['Tables']['messages']['Row']
type Attachment = DB['public']['Tables']['attachments']['Row']
type Profile = DB['public']['Tables']['profile']['Row']
type Address = DB['public']['Tables']['user_address']['Row']
type Group = DB['public']['Tables']['group']['Row']
type SubGroup_1 = DB['public']['Tables']['sub_group_1']['Row']
type SubGroup_2 = DB['public']['Tables']['sub_group_2']['Row']
type SubGroup_3 = DB['public']['Tables']['sub_group_3']['Row']

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
    group_backgroud: string
    group_logo: string
    group_website: string
    isAdmin: boolean
  }
  interface Group {
    id: string
    name: string
  }
  interface Sub_Group_1 {
    id: string
    name: string
    group_id: string
  }
  interface Sub_Group_2 {
    id: string
    name: string
  }
  interface Sub_Group_3 {
    id: string
    name: string
  }
  interface UserAddress {
    corregimiento: string
    barrio: string
    direccion: string
    ph: string
  }
}
