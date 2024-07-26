import { Link } from '@nextui-org/react'

export default function FooterAuth ({ option }: { option: string }) {
  return (
    <>
      <Link href='/' size='sm' underline='always' color='foreground'>¿Olvidaste tu contraseña?</Link>
      {option === 'LogIn'
        ? <Link href='/signup' size='sm' underline='always' color='foreground'>¿No tienes una cuenta? Regístrate ahora</Link>
        : <Link href='/login' size='sm' underline='always' color='foreground'>¿Ya tienes una cuenta? Iniciar sesión</Link>
      }
    </>
  )
}
