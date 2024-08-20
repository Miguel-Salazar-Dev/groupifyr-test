'use client'

import { createClient } from '@/utils/supabase/client'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { IconFilter, IconFilterOff, IconRefresh } from '@tabler/icons-react'
import { type ChangeEvent, useEffect, useState } from 'react'

export default function FilterOption ({ onChange }: { onChange: (categoria: string | null) => void }) {
  const supabase = createClient()
  const [categorias, setCategorias] = useState<string[]>([])
  const [selected, setSelected] = useState<string>('')
  const [filter, setFilter] = useState<string | null>(null)
  const [isFilter, setIsFilter] = useState<boolean>(false)

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

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value)
    setFilter(e.target.value)
  }

  const handleIsFilterChange = () => {
    setIsFilter(!isFilter)
    setFilter(null)
  }

  useEffect(() => {
    onChange(filter)
  }, [filter])

  return (
    <div className="flex flex-row w-full gap-3 items-center justify-center">
      <Button
        isIconOnly
        color="default"
        size="sm"
        aria-label="Refresh"
      >
        <IconRefresh stroke={1} />
      </Button>
      <Button
        isIconOnly
        color="default"
        size="sm"
        aria-label="Filtro"
        onPress={handleIsFilterChange}
      >
        {isFilter
          ? (<IconFilter stroke={1} />)
          : (<IconFilterOff stroke={1} />)
        }
      </Button>
      <div className='flex flex-col w-full'>
        <Select
          label="Filtros"
          isDisabled={!isFilter}
          variant="underlined"
          placeholder='Escoja un filtro'
          selectedKeys={[selected]}
          size="sm"
          onChange={handleSelectionChange}
          className={!isFilter ? 'invisible' : 'visible'}
        >
          {categorias.map(categoria => (
            <SelectItem key={categoria}>
              {categoria}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  )
}
