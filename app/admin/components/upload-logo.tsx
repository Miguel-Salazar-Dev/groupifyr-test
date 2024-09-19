'use client'

import { downloadLogo, uploadImageStorage } from '@/app/lib/data'
import { useEffect, useState } from 'react'
import { useAlertStore } from '@/app/stores/alert-store'
import { Avatar } from '@nextui-org/react'

export default function UploadLogo ({
  uid,
  url,
  onUpload
}: {
  uid: string | null
  url: string | null
  onUpload: (url: string) => void
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const showAlert = useAlertStore(state => state.showAlert)

  useEffect(() => {
    async function downloadImage (image_url: string) {
      try {
        const result = await downloadLogo(uid)

        if (result.success) {
          setImageUrl(result.data?.logo_img ?? '')
        } else {
          console.error('Error al descargar la imagen: ', result.error?.message)
        }
      } catch (error) {
        showAlert('Error!', 'Error al actualizar el Logo del grupo', 'error')
      }
    }

    if (url !== null) downloadImage(url)
  }, [url])

  const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (event.target.files === null || event.target.files.length === 0) {
        showAlert('Error!', 'Debe seleccionar una imagen para ser cargada', 'error')
        return
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}/${uid}-${Math.random()}-logo.${fileExt}`

      const result = await uploadImageStorage(filePath, file)

      if (result.error !== undefined || result.error !== null) {
        console.error('Error al actualizar la Imagen, ', result.error)
      }

      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/groups/${filePath}`
      onUpload(imageUrl)
    } catch (error) {
      showAlert('Error!', 'Error al actualizar la imagen, intentelo nuevamente', 'error')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='flex flex-col gap-3 bg-slate-200 p-3'>
      <p className='text-sm font-semibold'>Logo del Grupo</p>
      <div className='flex flex-col'>
        <label htmlFor="file_input" className="inline-flex items-center justify-center p-1 text-gray-500 rounded-full cursor-pointer hover:text-gray-900 hover:bg-blue-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 w-32 h-32">
          <Avatar
            showFallback
            src={imageUrl ?? ''}
            alt={'Logo del grupo'}
            className='transition-transform text-gray-700 dark:text-gray-400 w-28 h-28 text-large'
            color="default"
          />
          <input
            style={{
              visibility: 'hidden',
              position: 'absolute'
            }}
            type="file"
            id="file_input"
            accept="image/*"
            onChange={uploadImage}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  )
}
