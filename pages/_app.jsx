import Layout from '../components/Layout'
import CartProvider from '../context/CartContext'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  )
}

export default App
