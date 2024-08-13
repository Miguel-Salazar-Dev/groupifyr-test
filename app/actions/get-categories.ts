'use server'

import { createClient } from '@/utils/supabase/server'

export async function GetSubgroup_1 () {
  const supabase = createClient()
  const { data } = await supabase
    .from('sub_group_1')
    .select('id, name')

  const barrios =
    data?.map((barrio) => {
      return {
        id: barrio.id,
        name: barrio.name
      }
    }) ?? []

  return barrios
}

export async function GetSubgroup_2 () {
  const supabase = createClient()
  const { data } = await supabase
    .from('sub_group_2')
    .select('*')

  const direcciones =
    data?.map((direccion) => {
      return {
        id: direccion.id,
        name: direccion.name
      }
    }) ?? []

  return direcciones
}

export async function GetSubgroup_3 () {
  const supabase = createClient()
  const { data } = await supabase
    .from('sub_group_3')
    .select('*')

  const propiedades =
    data?.map((propiedad) => {
      return {
        id: propiedad.id,
        name: propiedad.name
      }
    }) ?? []

  return propiedades
}
