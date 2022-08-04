import Stripe from 'stripe'
import Card from '../components/Card'

const HomePage = ({ prices = [] }) => {
  return (
    <div className='bg-white'>
      <div className='max-w-2xl mx-auto p-4 sm:p-8 lg:max-w-7xl'>
        <h2 className='text-2xl font-bold text-gray-900'>Online Courses</h2>

        <div className='mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
          {prices.map(price => (
            <Card key={price.id} price={price} />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const { data: prices } = await stripe.prices.list({
    active: true, // Only bring active prices (a product can have multiple prices)
    limit: 10,
    expand: ['data.product'],
  })

  return {
    props: {
      prices,
    },
  }
}

export default HomePage
