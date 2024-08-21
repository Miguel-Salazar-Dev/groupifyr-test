import { IconHomeFilled, IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import ProfileButton from './profile-button'

export default function NavbarComponent () {
  return (
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-300 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        <button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-200 dark:hover:bg-gray-800 group">
          <Link href="/"><IconHomeFilled className='w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' /></Link>
          <span className="sr-only">Home</span>
        </button>
        <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Inicio
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div className="flex items-center justify-center">
          <button data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
            <Link href="/send" ><IconPlus className="w-6 h-6 text-white dark:text-black" stroke={2.5} /></Link>
            <span className="sr-only">New item</span>
          </button>
        </div>
        <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Create new item
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div data-tooltip-target="tooltip-profile" className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-100 dark:hover:bg-gray-800 group">
          <ProfileButton />
        </div>
    </div>
    </div>
  )
}
