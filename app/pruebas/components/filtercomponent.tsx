import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

interface FilterData {
  groups: Array<{ id: string, name: string }> | null
  subGroup1: Array<{ id: string, name: string, group_id: string }> | null
  subGroup2: Array<{ id: string, name: string }> | null
  subGroup3: Array<{ id: string, name: string }> | null
}

const FilterComponent = ({ onFilterSelect }: { onFilterSelect: (filter: any) => void }) => {
  const [filterData, setFilterData] = useState<FilterData>({
    groups: [],
    subGroup1: [],
    subGroup2: [],
    subGroup3: []
  })

  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [selectedSubGroup1, setSelectedSubGroup1] = useState<string[]>([])
  const [selectedSubGroup2, setSelectedSubGroup2] = useState<string[]>([])
  const [selectedSubGroup3, setSelectedSubGroup3] = useState<string[]>([])

  useEffect(() => {
    const fetchFilterData = async () => {
      const supabase = createClient()
      const { data: groups } = await supabase.from('group').select('id, name')
      const { data: subGroup1 } = await supabase.from('sub_group_1').select('id, name, group_id')
      const { data: subGroup2 } = await supabase.from('sub_group_2').select('id, name')
      const { data: subGroup3 } = await supabase.from('sub_group_3').select('id, name')

      setFilterData({ groups, subGroup1, subGroup2, subGroup3 })
    }

    fetchFilterData()
  }, [])

  useEffect(() => {
    onFilterSelect({
      groups: selectedGroups,
      subGroup1: selectedSubGroup1,
      subGroup2: selectedSubGroup2,
      subGroup3: selectedSubGroup3
    })
  }, [selectedGroups, selectedSubGroup1, selectedSubGroup2, selectedSubGroup3])

  return (
    <div>
      <h3>Filtrar por Corregimiento</h3>
      <select
        multiple
        onChange={(e) => { setSelectedGroups(Array.from(e.target.selectedOptions, option => option.value)) }}
      >
        {filterData.groups?.map(group => (
          <option key={group.id} value={group.id}>{group.name}</option>
        ))}
      </select>

      <h3>Filtrar por Barrio</h3>
      <select
        multiple
        onChange={(e) => { setSelectedSubGroup1(Array.from(e.target.selectedOptions, option => option.value)) }}
      >
        {filterData.subGroup1?.map(subGroup => (
          <option key={subGroup.id} value={subGroup.id}>{subGroup.name}</option>
        ))}
      </select>

      <h3>Filtrar por Dirección</h3>
      <select
        multiple
        onChange={(e) => { setSelectedSubGroup2(Array.from(e.target.selectedOptions, option => option.value)) }}
      >
        {filterData.subGroup2?.map(subGroup => (
          <option key={subGroup.id} value={subGroup.id}>{subGroup.name}</option>
        ))}
      </select>

      <h3>Filtrar por Propiedad</h3>
      <select
        multiple
        onChange={(e) => { setSelectedSubGroup3(Array.from(e.target.selectedOptions, option => option.value)) }}
      >
        {filterData.subGroup3?.map(subGroup => (
          <option key={subGroup.id} value={subGroup.id}>{subGroup.name}</option>
        ))}
      </select>
    </div>
  )
}

export default FilterComponent
