'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function FilterOption ({ onChange }: { onChange: (categoria: string | null) => void }) {
  const supabase = createClient()
  const [categorias, setCategorias] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('name')
      if (error !== null) {
        console.error(error)
      } else {
        setCategorias(data.map(d => d.name))
      }
    }

    fetchCategories()
  }, [])

  const handleRadioChange = (categoria: string | null) => {
    setSelected(categoria)
  }

  useEffect(() => {
    onChange(selected)
  }, [selected])

  return (
    <div className="flex flex-col w-full gap-3 pl-4 items-start justify-start">
      <p>FILTROS</p>
      <div className="flex items-center justify-start">
        <input
          type="radio"
          checked={selected === null}
          onChange={() => { handleRadioChange(null) }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sin filtro</label>
      </div>
      {categorias.map(categoria => (
        <div key={categoria} className="flex items-center justify-start">
          <input
            type="radio"
            checked={selected === categoria}
            onChange={() => { handleRadioChange(categoria) }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{categoria}</label>
        </div>
      ))}
    </div>
  )
}
