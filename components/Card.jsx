/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

const Card = ({ price }) => {
  const { items, addItem } = useCart()
  const [error, setError] = useState('')
  const { product, unit_amount } = price

  const addItemToCart = price => {
    const found = items.find(p => p.id === price.id)
    if (found) {
      setError('Item has been added!')
      return
    }
    addItem(price)
  }

  useEffect(() => {
    const timeout = setTimeout(() => setError(''), 3000)
    return () => clearTimeout(timeout)
  }, [error])

  return (
    <div>
      <div className='relative'>
        <div className='relative w-full h-72 rounded-lg overflow-hidden'>
          <img
            src={product.images[0]}
            alt={product.description}
            className='w-full h-full object-center object-cover'
          />
        </div>
        <div className='relative mt-4'>
          <h3 className='text-sm font-medium text-gray-900'>{product.name}</h3>
          <p className='mt-1 text-sm text-gray-500'>{product.description}</p>
        </div>
        <div className='absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden'>
          <div
            aria-hidden='true'
            className='absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50'
          />
          <p className='relative text-lg font-semibold text-white'>
            {(unit_amount / 100).toLocaleString('en-CA', {
              style: 'currency',
              currency: 'CAD',
            })}
          </p>
        </div>
      </div>
      <div className='mt-6'>
        <button
          onClick={() => addItemToCart(price)}
          className='relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200'
        >
          Add to Cart<span className='sr-only'>, {product.name}</span>
        </button>
        {error && <p className='text-sm text-red-400'>{error}</p>}
      </div>
    </div>
  )
}

export default Card
