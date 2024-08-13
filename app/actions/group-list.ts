import { createClient } from '@/utils/supabase/client'

export async function getGroupInformation () {
  const supabase = createClient()
  const { data: groups } = await supabase
    .from('group')
    .select('id, name')

  return groups
}

export async function getSubGroup1Information (groupId: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('sub_group_1')
    .select('id, name')
    .eq('group_id', groupId)

  const barrios =
    data?.map((barrio) => {
      return {
        id: barrio.id,
        name: barrio.name
      }
    }) ?? []

  return barrios
}

export async function getSubGroup2Information (sub1Id: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('sub1_sub2')
    .select('*, sub_group_2!inner(id, name)')
    .eq('sub_1_id', sub1Id)

  const direcciones =
    data?.map((direccion) => {
      return {
        id: direccion.sub_group_2.id,
        name: direccion.sub_group_2.name
      }
    }) ?? []

  return direcciones
}

export async function getSubGroup3Information (sub2Id: string, barrioId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('sub2_sub3')
    .select('*, sub_group_3!inner(*)')
    .eq('sub_2_id', sub2Id)
    .eq('sub_1_id', barrioId)

  if (error !== null) {
    console.log(error)
  }

  const propiedades =
    data?.map((propiedad) => {
      return {
        id: propiedad.sub_group_3.id,
        name: propiedad.sub_group_3.name
      }
    }) ?? []

  return propiedades
}
