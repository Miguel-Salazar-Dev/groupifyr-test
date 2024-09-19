'use client'

import { downloadBackground, uploadImageStorage } from '@/app/lib/data'
import { useAlertStore } from '@/app/stores/alert-store'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function UploadBackground ({
  uid,
  url,
  onUploadBackground
}: {
  uid: string | null
  url: string | null
  onUploadBackground: (url_background: string) => void
}) {
  const [imageUrlBackground, setImageUrlBackground] = useState<string | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const showAlert = useAlertStore(state => state.showAlert)

  useEffect(() => {
    async function downloadImage (image_url: string) {
      try {
        const result = await downloadBackground(uid)

        if (result.success) {
          setImageUrlBackground(result.data?.background_img ?? '')
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
      const filePath = `${uid}/${uid}-${Math.random()}-background.${fileExt}`

      const result = await uploadImageStorage(filePath, file)

      if (result.error !== undefined || result.error !== null) {
        console.error('Error al actualizar la Imagen, ', result.error)
      }

      const imageUrlBackground = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/groups/${filePath}`
      onUploadBackground(imageUrlBackground)
    } catch (error) {
      showAlert('Error!', 'Error al actualizar la imagen, intentelo nuevamente', 'error')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='flex flex-col gap-3 bg-slate-200 p-3'>
      <p className='text-sm font-semibold'>Imagen del Grupo</p>
      <div className='flex flex-col'>
        <label htmlFor="file_input_background" className="inline-flex items-center justify-center p-1 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-blue-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 w-[336px] h-[192px]">
          <Image
            src={imageUrlBackground ?? ''}
            width={320}
            height={176}
            alt={'Imagen del grupo'}
            className='rounded-lg w-80 h-44'
          />
          <input
            style={{
              visibility: 'hidden',
              position: 'absolute'
            }}
            type="file"
            id="file_input_background"
            accept="image/*"
            onChange={uploadImage}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  )
}
