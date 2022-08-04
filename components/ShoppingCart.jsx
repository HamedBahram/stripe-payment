/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useCart } from '../context/CartContext'
import { checkout } from '../lib/checkout'

export default function ShoppingCartSlideOver({ open, setCartSliderIsOpen }) {
  const { items, removeItem } = useCart()
  const subTotal = items.reduce((acc, curr) => (acc += curr.unit_amount), 0)

  const handleCheckout = event => {
    event.preventDefault()
    checkout(items)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setCartSliderIsOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto py-6 px-4 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>
                          {' '}
                          Shopping cart{' '}
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                            onClick={() => setCartSliderIsOpen(false)}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul role='list' className='-my-6 divide-y divide-gray-200'>
                            {items.map(price => (
                              <li key={price.id} className='flex py-6'>
                                <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                  <img
                                    src={price.product.images[0]}
                                    alt={price.product.description}
                                    className='h-full w-full object-cover object-center'
                                  />
                                </div>

                                <div className='ml-4 flex flex-1 flex-col'>
                                  <div>
                                    <div className='flex justify-between text-base font-medium text-gray-900'>
                                      <h3>
                                        <a href={price.product.href}> {price.product.name} </a>
                                      </h3>
                                      <p className='ml-4'>
                                        {(price.unit_amount / 100).toLocaleString('en-CA', {
                                          style: 'currency',
                                          currency: 'CAD',
                                        })}
                                      </p>
                                    </div>
                                    <p className='mt-1 text-sm text-gray-500'>
                                      {price.product.description}
                                    </p>
                                  </div>
                                  <div className='flex flex-1 items-end justify-between text-sm'>
                                    <p className='text-gray-500'>Qty 1</p>

                                    <div className='flex'>
                                      <button
                                        type='button'
                                        onClick={() => removeItem(price.id)}
                                        className='font-medium text-rose-400 hover:text-rose-300'
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p>Subtotal</p>
                        <p>
                          {(subTotal / 100).toLocaleString('en-CA', {
                            style: 'currency',
                            currency: 'CAD',
                          })}
                        </p>
                      </div>
                      <p className='mt-0.5 text-sm text-gray-500'>
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className='mt-6'>
                        <a
                          href='#'
                          onClick={handleCheckout}
                          className='flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700'
                        >
                          Checkout
                        </a>
                      </div>
                      <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                        <p>
                          or{' '}
                          <button
                            type='button'
                            className='font-medium text-emerald-600 hover:text-emerald-500'
                            onClick={() => setCartSliderIsOpen(false)}
                          >
                            Continue Shopping<span aria-hidden='true'> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
