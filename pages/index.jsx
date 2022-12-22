import Stripe from 'stripe'
import Card from '../components/Card'
import { useState } from 'react'

const HomePage = ({ prices: { data = [], has_more } }) => {
  const [products, setProducts] = useState(data)
  const [hasMore, setHasMore] = useState(has_more)

  const lastProductId = products[products.length - 1]?.id

  const loadMore = async () => {
    if (!hasMore || !lastProductId) return

    try {
      const { prices } = await fetch(`/api/stripe/prices?starting_after=${lastProductId}`).then(
        res => res.json()
      )
      if (prices.data) {
        setProducts(products => [...products, ...prices.data])
        setHasMore(prices.has_more)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-white'>
      <div className='max-w-2xl mx-auto p-4 sm:p-8 lg:max-w-7xl'>
        <h2 className='text-2xl font-bold text-gray-900'>Online Courses</h2>

        <div className='mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
          {products.map(price => (
            <Card key={price.id} price={price} />
          ))}
        </div>

        <button
          onClick={loadMore}
          disabled={!hasMore}
          className='mt-10 w-full bg-blue-100 rounded-md py-2 px-8 text-sm font-medium text-blue-900 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-100'
        >
          Load more
        </button>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const prices = await stripe.prices.list({
    active: true, // Only bring active prices (a product can have multiple prices)
    limit: 2,
    expand: ['data.product'],
  })

  return {
    props: {
      prices,
    },
  }
}

export default HomePage
