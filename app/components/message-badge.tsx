export default function MessageBadge ({ category }: { category: string | null }) {
  let tailWindProps
  const generalTailwind = 'text-[0.60rem] font-medium me-2 px-1 py-0.5 rounded '
  // Mensaje
  if (category === 'Mensaje') {
    tailWindProps = generalTailwind + 'bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400 border border-blue-400'
  }
  // Emergencia
  if (category === 'Emergencia') {
    tailWindProps = generalTailwind + 'bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border border-red-400'
  }
  // Aviso
  if (category === 'Aviso') {
    tailWindProps = generalTailwind + 'bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300'
  }
  // Aseo
  if (category === 'Aseo') {
    tailWindProps = generalTailwind + 'bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border border-green-400'
  }
  // Movilidad
  if (category === 'Movilidad') {
    tailWindProps = generalTailwind + 'bg-indigo-200 text-indigo-800 dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400'
  }
  // Ruido
  if (category === 'Ruido') {
    tailWindProps = generalTailwind + 'bg-purple-100 text-purple-800 dark:bg-gray-700 dark:text-purple-400 border border-purple-400'
  }
  // Seguridad
  if (category === 'Seguridad') {
    tailWindProps = generalTailwind + 'bg-pink-100 text-pink-800 dark:bg-gray-700 dark:text-pink-400 border border-pink-400'
  }
  // Otro
  if (category === 'Otro') {
    tailWindProps = generalTailwind + 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border border-gray-500'
  }

  return (
    <span className={tailWindProps}>{category}</span>
  )
}
