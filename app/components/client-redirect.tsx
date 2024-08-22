import { redirect } from 'next/navigation'

interface redirectProps {
  isAdmin: boolean
  groupId: string | null
}

export default function ClientRedirect ({ isAdmin, groupId }: redirectProps) {
  if (isAdmin) {
    redirect('/admin')
  } else {
    if (groupId === null) {
      redirect('/account')
      return null
    } else {
      redirect('/inbox')
    }
  }

  return null
}
