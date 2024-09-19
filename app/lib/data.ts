import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'

export async function fetchInitialProfile () {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }

  const { data } = await supabase
    .from('profile')
    .select('name, username, avatar_url')
    .eq('id', user.id)
    .single()

  if (data === null) {
    redirect('/login')
  }

  const initialprofile: InitialProfile = {
    id: user.id,
    name: data?.name,
    username: data?.username,
    avatarurl: data?.avatar_url
  }

  return initialprofile
}

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

export async function getSubGroup3Information (sub2Id: string, sub1Id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('sub2_sub3')
    .select('*, sub_group_3!inner(*)')
    .eq('sub_2_id', sub2Id)
    .eq('sub_1_id', sub1Id)

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

export async function updateUserProfile (profileData: any, addressData: any) {
  const supabase = createClient()
  console.log('Profile Data toBeSend: ', profileData)
  console.log('Address Data toBeSend: ', addressData)
  const { data, error } = await supabase.rpc('update_user_profile_and_address', {
    profile_data: profileData,
    address_data: addressData
  })

  if (error !== null) {
    console.error('Error updating user profile and address:', error)
    return { success: false, error }
  }

  return { success: true, data }
}

export async function updateGroupInformation (groupId: string, groupName: string, groupWebsite: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('group')
    .update({
      name: groupName,
      website: groupWebsite
    })
    .eq('id', groupId)
    .select()

  if (error !== null) {
    console.error('Error al actualizar la información del grupo: ', error)
    return { success: false, error }
  }

  return { success: true, data }
}

export async function updateAvatar (avatar_url: string, user_id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('profile')
    .update({
      avatar_url
    })
    .eq('id', user_id)
    .select()
  if (error !== null) {
    console.error('Error al actualizar el Avatar del usuario', error)
  }
}

export async function fetchGroup (groupId: string) {
  const supabase = createClient()
  const { data: group, error } = await supabase
    .from('group')
    .select('*')
    .eq('id', groupId)
    .single()

  if (error !== null) {
    console.error('Problema conectando a la BD del grupo', error)
  }

  return group
}

export async function fetchGroupList (groupId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profile')
    .select('name, username, avatar_url, admin')
    .eq('id_group', groupId)

  if (error !== null) {
    console.error('Problema conectando a la BD de la lista de usuarios', error)
  }

  return data
}

export async function uploadImageStorage (filePath: string, file: File) {
  const supabase = createClient()
  console.log(filePath)
  console.log(file)
  const { error } = await supabase
    .storage
    .from('groups')
    .upload(filePath, file)

  if (error !== null) {
    console.error('Error al actualizar la imagen!', error)
    return { success: false, error }
  }

  return { success: true }
}

export async function downloadLogo (uid: string | null) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('group')
    .select('logo_img')
    .eq('id', uid ?? '')
    .single()

  if (error !== null) {
    console.error('Error al obtener el logo del grupo: ', error)
    return { success: false, error }
  }

  return { success: true, data }
}

export async function updateLogo (id: string, logo_img: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('group')
    .update({
      logo_img
    })
    .eq('id', id)
    .select()

  if (error !== null) {
    console.error('Error al actualizar el logo del grupo: ', error)
    return { success: false, error }
  }

  return { success: true, data }
}

export async function downloadBackground (uid: string | null) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('group')
    .select('background_img')
    .eq('id', uid ?? '')
    .single()

  if (error !== null) {
    console.error('Error al obtener el logo del grupo: ', error)
    return { success: false, error }
  }

  return { success: true, data }
}

export async function updateBackground (id: string, background_img: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('group')
    .update({
      background_img
    })
    .eq('id', id)
    .select()

  if (error !== null) {
    console.error('Error al actualizar la imagen del grupo: ', error)
    return { success: false, error }
  }

  return { success: true, data }
}
