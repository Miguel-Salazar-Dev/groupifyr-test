'use client'
import { GetUserProfile } from '@/app/actions/user-profile-action'
import { createClient } from '@/utils/supabase/client'
import { Select, SelectItem, Switch } from '@nextui-org/react'
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'
import { type ChangeEvent, useEffect, useState } from 'react'

interface FilterBoxProps {
  onFilterSelect: (filter: any) => void
  isFiltered: (isAllCorregimiento: boolean) => void
}

interface FilterData {
  group: Array<{ id: string, name: string }>
  subGroup1: Array<{ id: string, name: string }>
  subGroup2: Array<{ id: string, name: string }>
  subGroup3: Array<{ id: string, name: string }>
}

export default function FilterBox ({ onFilterSelect, isFiltered }: FilterBoxProps) {
  const [filterData, setFilterData] = useState<FilterData>({
    group: [],
    subGroup1: [],
    subGroup2: [],
    subGroup3: []
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<string[]>([])
  const [selectedSubGroup1, setSelectedSubGroup1] = useState<string[]>([])
  const [selectedSubGroup2, setSelectedSubGroup2] = useState<string[]>([])
  const [selectedSubGroup3, setSelectedSubGroup3] = useState<string[]>([])
  const [allCorregimiento, setAllCorregimiento] = useState<boolean>(false)

  useEffect(() => {
    const fetchFilterData = async () => {
      setLoading(true)
      try {
        const supabase = createClient()
        const profile = GetUserProfile()
        const { data: group, error: errorGroup } = await supabase.from('group').select('id, name').eq('id', (await profile).group_id)
        const { data: subGroup1, error: error1 } = await supabase.from('sub_group_1').select('id, name')
        const { data: subGroup2, error: error2 } = await supabase.from('sub_group_2').select('id, name')
        const { data: subGroup3, error: error3 } = await supabase.from('sub_group_3').select('id, name')

        if (errorGroup !== null || error1 !== null || error2 !== null || error3 !== null) {
          throw new Error('Error al recuperar datos de la base de datos')
        }

        if (
          Array.isArray(group) && group.length > 0 &&
          Array.isArray(subGroup1) && subGroup1.length > 0 &&
          Array.isArray(subGroup2) && subGroup2.length > 0 &&
          Array.isArray(subGroup3) && subGroup3.length > 0
        ) {
          setFilterData({ group, subGroup1, subGroup2, subGroup3 })
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
      group: selectedGroup,
      subGroup1: selectedSubGroup1,
      subGroup2: selectedSubGroup2,
      subGroup3: selectedSubGroup3
    })
    isFiltered(
      allCorregimiento
    )
  }, [allCorregimiento, selectedGroup, selectedSubGroup1, selectedSubGroup2, selectedSubGroup3])

  useEffect(() => {
    const setHandleAllGroup = () => {
      if (allCorregimiento) {
        setSelectedGroup(Array.from(filterData.group[0].id.split(',')))
        setSelectedSubGroup1([])
        setSelectedSubGroup2([])
        setSelectedSubGroup3([])
      } else {
        setSelectedGroup([])
      }
    }
    setHandleAllGroup()
  }, [allCorregimiento, loading])

  return (
    <div className='flex flex-col gap-3'>
      <Switch
        isSelected={allCorregimiento}
        onValueChange={setAllCorregimiento}
        size='lg'
        color='success'
        startContent={<IconCircleCheck stroke={2} />}
        endContent={<IconCircleX stroke={2} />}
      >
        ¿Envío a todo el corregimiento?
      </Switch>
      <p className="text-small text-default-500">{loading ? 'cargando...' : 'Listo!!!'}</p>
      <p className="text-small text-default-500">{error ?? 'No hay errores'}</p>
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
    </div>
  )
}
