'use client'
import { createClient } from '@/utils/supabase/client'
import { Select, SelectItem, Switch } from '@nextui-org/react'
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'
import { type ChangeEvent, useEffect, useState } from 'react'

interface FilterData {
  subGroup1: Array<{ id: string, name: string }>
  subGroup2: Array<{ id: string, name: string }>
  subGroup3: Array<{ id: string, name: string }>
}

export default function FilterBox ({ onFilterSelect }: { onFilterSelect: (filter: any) => void }) {
  const [filterData, setFilterData] = useState<FilterData>({
    subGroup1: [],
    subGroup2: [],
    subGroup3: []
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedSubGroup1, setSelectedSubGroup1] = useState<string[]>([])
  const [selectedSubGroup2, setSelectedSubGroup2] = useState<string[]>([])
  const [selectedSubGroup3, setSelectedSubGroup3] = useState<string[]>([])
  const [allCorregimiento, setAllCorregimiento] = useState<boolean>(true)

  useEffect(() => {
    const fetchFilterData = async () => {
      setLoading(true)
      try {
        const supabase = createClient()
        const { data: subGroup1, error: error1 } = await supabase.from('sub_group_1').select('id, name')
        const { data: subGroup2, error: error2 } = await supabase.from('sub_group_2').select('id, name')
        const { data: subGroup3, error: error3 } = await supabase.from('sub_group_3').select('id, name')

        if (error1 !== null || error2 !== null || error3 !== null) {
          throw new Error('Error al recuperar datos de la base de datos')
        }

        if (Array.isArray(subGroup1) && subGroup1.length > 0 &&
          Array.isArray(subGroup2) && subGroup2.length > 0 &&
          Array.isArray(subGroup3) && subGroup3.length > 0) {
          setFilterData({ subGroup1, subGroup2, subGroup3 })
        } else {
          throw new Error('Datos incompletos o no disponibles')
        }
      } catch (err) {
        console.error(err)
        setError('Ocurrió un error al cargar los datos. Por favor, intenta nuevamente.')
      } finally {
        setLoading(false)
      }
    }

    fetchFilterData()
  }, [])

  useEffect(() => {
    onFilterSelect({
      subGroup1: selectedSubGroup1,
      subGroup2: selectedSubGroup2,
      subGroup3: selectedSubGroup3
    })
  }, [selectedSubGroup1, selectedSubGroup2, selectedSubGroup3])

  const allCorregimientoChange = (isSelected: boolean) => {
    setAllCorregimiento(isSelected)
  }

  return (
    <div>
      <Switch
        isSelected={allCorregimiento}
        onValueChange={allCorregimientoChange}
        size='lg'
        color='success'
        startContent={<IconCircleCheck stroke={2} />}
        endContent={<IconCircleX stroke={2} />}
      >
        ¿Envío a todo el corregimiento?
      </Switch>
      <p className="text-small text-default-500">Selected: {allCorregimiento ? 'true' : 'false'}</p>
      {loading ? <p>cargando...</p> : <p>Listo!!!</p>}
      <Select
        label="Barrios"
        isDisabled={allCorregimiento}
        placeholder="Selecciona los barrios"
        selectionMode="multiple"
        selectedKeys={selectedSubGroup1}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => { setSelectedSubGroup1(Array.from(e.target.value.split(','))) }}
        className='max-w-xs'
      >
        {filterData.subGroup1.map((subGroup) => (
          <SelectItem key={subGroup.id} value={subGroup.id}>
            {subGroup.name}
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {Array.from(selectedSubGroup1).join(', ')}</p>

      <Select
        label="Dirección"
        isDisabled={allCorregimiento}
        placeholder="Selecciona las direcciones"
        selectionMode="multiple"
        selectedKeys={selectedSubGroup2}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => { setSelectedSubGroup2(Array.from(e.target.value.split(','))) }}
        className='max-w-xs'
      >
        {filterData.subGroup2.map((subGroup) => (
          <SelectItem key={subGroup.id} value={subGroup.id}>
            {subGroup.name}
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {Array.from(selectedSubGroup2).join(', ')}</p>

      <Select
        label="Propiedades (P.H.)"
        isDisabled={allCorregimiento}
        placeholder="Selecciona las propiedades (P.H.)"
        selectionMode="multiple"
        selectedKeys={selectedSubGroup3}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => { setSelectedSubGroup3(Array.from(e.target.value.split(','))) }}
        className='max-w-xs'
      >
        {filterData.subGroup3.map((subGroup) => (
          <SelectItem key={subGroup.id} value={subGroup.id}>
            {subGroup.name}
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {Array.from(selectedSubGroup3).join(', ')}</p>
      {error !== null ? <p>{error}</p> : 'No hay errores'}
    </div>
  )
}
