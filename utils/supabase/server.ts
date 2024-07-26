/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient () {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll () {
          return cookieStore.getAll()
        },
        setAll (cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              cookieStore.set(name, value, options)
            )
          } catch {}
        }
      }
    }
  )
}
