import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { ShoppingBagIcon } from '@heroicons/react/outline'

const Header = ({ setCartSliderIsOpen }) => {
  const { items } = useCart()

  return (
    <header className='flex items-center justify-between p-4 sm:p-8 bg-gray-200'>
      <Link href='/'>
        <a>
          <div className='text-3xl font-bold text-emerald-400'>LOGO</div>
        </a>
      </Link>
      <div className='ml-4 flow-root lg:ml-8'>
        <div
          className='group -m-2 p-2 flex items-center cursor-pointer'
          onClick={() => setCartSliderIsOpen(open => !open)}
        >
          <ShoppingBagIcon
            className='flex-shrink-0 h-8 w-8 text-gray-400 group-hover:text-gray-500'
            aria-hidden='true'
          />
          <span className='ml-2 text-sm font-medium text-gray-400 group-hover:text-gray-800'>
            ( {items.length} )
          </span>
          <span className='sr-only'>items in cart, view bag</span>
        </div>
      </div>
    </header>
  )
}

export default Header
