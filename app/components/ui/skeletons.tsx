import { Skeleton } from '@/components/ui/skeleton'

export function BackgroundImageSkeleton () {
  return (
      <Skeleton className="w-full h-full shadow-md" />
  )
}

export function LogoImageSkeleton () {
  return (
      <Skeleton className='w-full h-full rounded-full shadow-md' />
  )
}

export function MessageListSkeleton () {
  return (
    <div className='flex items-start gap-1.5 m-4'>
      <Skeleton className='w-8 h-8 p-1 rounded-full shadow-md' />
      <Skeleton className='w-full h-20 leading-1.5 p-4 rounded-e-xl rounded-es-xl shadow-md' />
    </div>
  )
}

export function SendMessageUserSkeleton () {
  <div>
    <Skeleton className='w-14 h-14 ml-2 rounded-full shadow-md' />
    <Skeleton className='w-full h-full ml-4 shadow-md' />
  </div>
}
