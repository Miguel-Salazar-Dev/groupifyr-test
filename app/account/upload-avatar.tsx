'use client'

import { createClient } from '@/utils/supabase/client'
import { Avatar } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export default function UploadAvatar ({
  uid,
  url,
  onUpload
}: {
  uid: string | null
  url: string | null
  onUpload: (url: string) => void
}) {
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage (avatar_url: string) {
      try {
        const { data, error } = await supabase
          .from('profile')
          .select('avatar_url')
          .eq('id', uid ?? '')
          .single()

        if (error !== null) {
          throw new Error()
        }

        const url = data.avatar_url
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url !== null) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (event.target.files === null || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const filePath = `${uid}/${uid}-${Math.random()}.jpg`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError !== null) {
        throw uploadError
      }
      const profileAvatarUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`
      onUpload(profileAvatarUrl)
    } catch (error) {
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col'>
          <label htmlFor="file_input" className="inline-flex justify-center p-1 text-gray-500 rounded-full cursor-pointer hover:text-gray-900 hover:bg-blue-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 w-32 h-32">
            <div className="flex flex-col items-center justify-center">
              <Avatar
                showFallback
                className="transition-transform text-gray-700 dark:text-gray-400 w-28 h-28 text-large"
                color="default"
                // size="lg"
                src={avatarUrl ?? ''}
              />
            </div>
            <input
              style={{
                visibility: 'hidden',
                position: 'absolute'
              }}
              type="file"
              id="file_input"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </label>
        </div>
    </div>
  )
}
