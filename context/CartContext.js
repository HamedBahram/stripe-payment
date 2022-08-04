import { useState, useEffect, useRef, useContext, createContext, useCallback } from 'react'

const CartContext = createContext()
export const useCart = () => useContext(CartContext)

const loadJSON = key => key && JSON.parse(localStorage.getItem(key))
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data))

const CartProvider = ({ children }) => {
  const key = `STRIPE_CART_ITEMS`
  const firstRender = useRef(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      const localItems = loadJSON(key)
      localItems && setItems(localItems)
      return
    }
    saveJSON(key, items)
  }, [key, items])

  const addItem = useCallback(price => setItems(prices => prices.concat([price])), [])
  const removeItem = useCallback(
    id => setItems(prices => prices.filter(price => price.id !== id)),
    []
  )
  const resetCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, resetCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
