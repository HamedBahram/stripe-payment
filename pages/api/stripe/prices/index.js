import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { limit = 2, starting_after } = req.query
      if (!starting_after) {
        throw Error('The starting_after parameter is missing.')
      }

      const prices = await stripe.prices.list({
        limit,
        starting_after,
        active: true,
        expand: ['data.product'],
      })

      return res.status(200).json({ prices })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Internal server error'
      return res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  }

  res.setHeader('Allow', 'GET')
  res.status(405).end('Method Not Allowed')
  return
}

export default handler
