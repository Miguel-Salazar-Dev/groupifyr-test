'use client'
import { Card, CardHeader, CardBody, CardFooter, Avatar } from '@nextui-org/react'
import { IconMoodHeart, IconMessage2 } from '@tabler/icons-react'

export default function MessageCard ({
  profileName,
  profileUserName,
  profileAvatarUrl,
  content,
  createdAt
}: {
  profileName: string
  profileUserName: string
  profileAvatarUrl: string
  content: string
  createdAt: string
}) {
  const localDate = (createdAt: string) => {
    const DateLocal = new Date(createdAt).toLocaleString()
    return DateLocal
  }
  return (
    <Card className="shadow-none bg-transparent hover:bg-slate-800 transition border-b rounded-t-sm rounded-b-md border-white/20">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={profileAvatarUrl} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{profileName}</h4>
            <h5 className="text-small tracking-tight text-default-400">{profileUserName}</h5>
            <h6 className="text-xs tracking-tight text-default-400">{localDate(createdAt)}</h6>
          </div>
        </div>

      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          {content}
        </p>

      </CardBody>
      <CardFooter className="gap-3">
      <button>
        <IconMessage2 className='w-5 h-5' stroke={1} />
      </button>
      <button>
        <IconMoodHeart className='w-5 h-5' stroke={1} />
      </button>
      </CardFooter>
    </Card>
  )
}
