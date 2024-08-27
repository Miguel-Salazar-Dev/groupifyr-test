export default function HeaderAuth ({ option }: { option: string }) {
  return (
    <div className="flex flex-row items-center gap-2 px-5">
      <h1 className='text-lg font-semibold'>{option === 'LogIn' ? 'Iniciar sesión ' : 'Regístrarse '}en <span className='font-bold text-blue-600'>Bezinos.app</span></h1>
    </div>
  )
}
