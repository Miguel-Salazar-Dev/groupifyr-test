export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      attachments: {
        Row: {
          attachment: string | null
          created_at: string
          id: string
          id_message: string
          id_user: string
        }
        Insert: {
          attachment?: string | null
          created_at?: string
          id?: string
          id_message: string
          id_user: string
        }
        Update: {
          attachment?: string | null
          created_at?: string
          id?: string
          id_message?: string
          id_user?: string
        }
        Relationships: [
          {
            foreignKeyName: 'attachments_id_message_fkey'
            columns: ['id_message']
            isOneToOne: false
            referencedRelation: 'messages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'attachments_id_user_fkey'
            columns: ['id_user']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
        ]
      }
      categories: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      group: {
        Row: {
          background_img: string
          created_at: string
          id: string
          logo_img: string
          name: string
          website: string | null
        }
        Insert: {
          background_img: string
          created_at?: string
          id?: string
          logo_img: string
          name: string
          website?: string | null
        }
        Update: {
          background_img?: string
          created_at?: string
          id?: string
          logo_img?: string
          name?: string
          website?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          category: string | null
          content: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'messages_user_id_fkey1'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
        ]
      }
      profile: {
        Row: {
          admin: boolean
          avatar_url: string
          created_at: string
          id: string
          id_group: string | null
          name: string
          update_at: string | null
          username: string
        }
        Insert: {
          admin?: boolean
          avatar_url: string
          created_at?: string
          id?: string
          id_group?: string | null
          name: string
          update_at?: string | null
          username: string
        }
        Update: {
          admin?: boolean
          avatar_url?: string
          created_at?: string
          id?: string
          id_group?: string | null
          name?: string
          update_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: 'Profile_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Profile_id_group_fkey'
            columns: ['id_group']
            isOneToOne: false
            referencedRelation: 'group'
            referencedColumns: ['id']
          },
        ]
      }
      send_to: {
        Row: {
          group_id: string | null
          id: string
          message_id: string
          sub_1_id: string | null
          sub_2_id: string | null
          sub_3_id: string | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          message_id: string
          sub_1_id?: string | null
          sub_2_id?: string | null
          sub_3_id?: string | null
        }
        Update: {
          group_id?: string | null
          id?: string
          message_id?: string
          sub_1_id?: string | null
          sub_2_id?: string | null
          sub_3_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'send_to_group_id_fkey'
            columns: ['group_id']
            isOneToOne: false
            referencedRelation: 'group'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'send_to_message_id_fkey'
            columns: ['message_id']
            isOneToOne: false
            referencedRelation: 'messages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'send_to_Sub_1_id_fkey'
            columns: ['sub_1_id']
            isOneToOne: false
            referencedRelation: 'sub_group_1'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'send_to_Sub_2_id_fkey'
            columns: ['sub_2_id']
            isOneToOne: false
            referencedRelation: 'sub_group_2'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'send_to_Sub_3_id_fkey'
            columns: ['sub_3_id']
            isOneToOne: false
            referencedRelation: 'sub_group_3'
            referencedColumns: ['id']
          },
        ]
      }
      smile: {
        Row: {
          created_at: string
          id: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'Smile_message_id_fkey'
            columns: ['message_id']
            isOneToOne: false
            referencedRelation: 'messages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Smile_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
        ]
      }
      sub_group_1: {
        Row: {
          created_at: string
          group_id: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sub_group_1_group_id_fkey'
            columns: ['group_id']
            isOneToOne: false
            referencedRelation: 'group'
            referencedColumns: ['id']
          },
        ]
      }
      sub_group_2: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      sub_group_3: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      sub1_sub2: {
        Row: {
          id: string
          sub_1_id: string
          sub_2_id: string
        }
        Insert: {
          id?: string
          sub_1_id: string
          sub_2_id: string
        }
        Update: {
          id?: string
          sub_1_id?: string
          sub_2_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sub1_sub2_sub_1_id_fkey'
            columns: ['sub_1_id']
            isOneToOne: false
            referencedRelation: 'sub_group_1'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sub1_sub2_sub_2_id_fkey'
            columns: ['sub_2_id']
            isOneToOne: false
            referencedRelation: 'sub_group_2'
            referencedColumns: ['id']
          },
        ]
      }
      sub2_sub3: {
        Row: {
          id: string
          sub_1_id: string | null
          sub_2_id: string
          sub_3_id: string
        }
        Insert: {
          id?: string
          sub_1_id?: string | null
          sub_2_id: string
          sub_3_id: string
        }
        Update: {
          id?: string
          sub_1_id?: string | null
          sub_2_id?: string
          sub_3_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sub2_sub3_sub_1_id_fkey'
            columns: ['sub_1_id']
            isOneToOne: false
            referencedRelation: 'sub_group_1'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sub2_sub3_sub_2_id_fkey'
            columns: ['sub_2_id']
            isOneToOne: false
            referencedRelation: 'sub_group_2'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sub2_sub3_sub_3_id_fkey'
            columns: ['sub_3_id']
            isOneToOne: false
            referencedRelation: 'sub_group_3'
            referencedColumns: ['id']
          },
        ]
      }
      sub3_sub1: {
        Row: {
          id: number
          sub_1_id: string
          sub_3_id: string
        }
        Insert: {
          id?: number
          sub_1_id: string
          sub_3_id: string
        }
        Update: {
          id?: number
          sub_1_id?: string
          sub_3_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sub3_sub1_sub_1_id_fkey'
            columns: ['sub_1_id']
            isOneToOne: false
            referencedRelation: 'sub_group_1'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sub3_sub1_sub_3_id_fkey'
            columns: ['sub_3_id']
            isOneToOne: false
            referencedRelation: 'sub_group_3'
            referencedColumns: ['id']
          },
        ]
      }
      user_address: {
        Row: {
          group_id: string | null
          id: string
          sub_1_id: string | null
          sub_2_id: string | null
          sub_3_id: string | null
          user_id: string
        }
        Insert: {
          group_id?: string | null
          id?: string
          sub_1_id?: string | null
          sub_2_id?: string | null
          sub_3_id?: string | null
          user_id: string
        }
        Update: {
          group_id?: string | null
          id?: string
          sub_1_id?: string | null
          sub_2_id?: string | null
          sub_3_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_address_group_id_fkey'
            columns: ['group_id']
            isOneToOne: false
            referencedRelation: 'group'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_address_sub_1_id_fkey'
            columns: ['sub_1_id']
            isOneToOne: false
            referencedRelation: 'sub_group_1'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_address_sub_2_id_fkey'
            columns: ['sub_2_id']
            isOneToOne: false
            referencedRelation: 'sub_group_2'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_address_sub_3_id_fkey'
            columns: ['sub_3_id']
            isOneToOne: false
            referencedRelation: 'sub_group_3'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_address_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
  PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema['Enums']
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
