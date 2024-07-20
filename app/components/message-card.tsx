'use client'
import { Card, CardHeader, CardBody, CardFooter, Avatar } from '@nextui-org/react'
import { IconMessage2 } from '@tabler/icons-react'
import Smiles from './smiles'

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
    <Card className="shadow-none bg-transparent hover:bg-slate-300 dark:hover:bg-slate-800 transition border-b rounded-t-sm rounded-b-md border-gray-300 dark:border-white/20">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={profileAvatarUrl} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-medium font-semibold leading-none text-default-800">{profileName}</h4>
            <h6 className="text-xs tracking-tight text-default-500">{localDate(createdAt)}</h6>
          </div>
        </div>

      </CardHeader>
      <CardBody className="px-3 py-0 text-medium text-default-600">
        <p>
          {content}
        </p>

      </CardBody>
      <CardFooter className="flex flex-row w-full items-center justify-end gap-3">
      <button>
        <IconMessage2 className='w-5 h-5 text-gray-500' stroke={1} />
      </button>
        <Smiles />
      </CardFooter>
    </Card>
  )
}
