import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { name } = req.query
      if (!name) {
        throw Error('The name parameter is required')
      }

      const products = await stripe.products.search({
        query: `name:"${name}"`
      })

      return res.status(200).json({ products })
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
      return res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  }

  res.setHeader('Allow', 'GET')
  res.status(405).end('Method Not Allowed')
  return
}

export default handler
