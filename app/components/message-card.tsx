'use client'
import { Card, CardHeader, CardBody, CardFooter, Avatar } from '@nextui-org/react'
import { IconMoodHeart, IconMessage2 } from '@tabler/icons-react'

export default function MessageCard ({
  profileName,
  profileUserName,
  profileAvatarUrl,
  content
}: {
  profileName: string
  profileUserName: string
  profileAvatarUrl: string
  content: string
}) {
  return (
    <Card className="max-w-[340px] my-5">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={profileAvatarUrl} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{profileName}</h4>
            <h5 className="text-small tracking-tight text-default-400">{profileUserName}</h5>
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
