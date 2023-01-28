import Link from 'next/link'
import { useState } from 'react'
import Search from './search'
import { useCart } from '../context/CartContext'
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

const Header = ({ setCartSliderIsOpen }) => {
  const { items } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header className='flex items-center justify-between px-8 py-6 bg-gray-200'>
      <Link href='/'>
        <a>
          <div className='text-lg font-medium uppercase text-sky-700'>Home</div>
        </a>
      </Link>
      <div className='flex items-center gap-4'>
        <MagnifyingGlassIcon
          onClick={() => setOpen(open => !open)}
          className='mt-1 h-5 w-5 cursor-pointer text-sky-700 group-hover:text-sky-800'
        />
        <div className='ml-4 flow-root lg:ml-8'>
          <div
            className='group p-2 flex items-center cursor-pointer'
            onClick={() => setCartSliderIsOpen(open => !open)}
          >
            <ShoppingBagIcon
              className='flex-shrink-0 h-5 w-5 text-sky-700 group-hover:text-sky-800'
              aria-hidden='true'
            />
            <span className='ml-2 text-sm font-medium text-sky-700 group-hover:text-sky-800'>
              ( {items.length} )
            </span>
            <span className='sr-only'>items in cart, view bag</span>
          </div>
        </div>
      </div>

      <Search open={open} setOpen={setOpen} />
    </header>
  )
}

export default Header
