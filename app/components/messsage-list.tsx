import MessageCard from './message-card'
import { type Message } from '../types/messages'

export function MessageList ({ messages }: { messages: Message[] }) {
  return (
  <>
  {
        messages?.map(message => {
          const {
            id,
            profile,
            content,
            created_at: createdAt
          } = message

          const {
            username: profileUserName,
            name: profileName,
            avatar_url: profileAvatarUrl
          } = profile

          return (
            <MessageCard
              key={id}
              content={content}
              createdAt={createdAt}
              profileName={profileName}
              profileUserName={profileUserName}
              profileAvatarUrl={profileAvatarUrl}
            />
          )
        })
      }
  </>
  )
}
