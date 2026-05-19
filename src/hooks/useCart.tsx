import { createContext, useContext, useState, type ReactNode, useCallback, useEffect } from 'react'
import type { CartContextType, Cart, Product, CartItem } from '../types'
import { priceUtils } from '../lib/utils'

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>(() => {
    return getInitialCart()
  })

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.productId === product.id)

      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
          totalQuantity: prevCart.totalQuantity + quantity,
          totalPriceUAH: calculateTotal([
            ...prevCart.items.map(item =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          ])
        }
      }

      const newItem: CartItem = {
        productId: product.id,
        quantity,
        product
      }

      return {
        ...prevCart,
        items: [...prevCart.items, newItem],
        totalQuantity: prevCart.totalQuantity + quantity,
        totalPriceUAH: calculateTotal([...prevCart.items, newItem])
      }
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => {
      const item = prevCart.items.find(i => i.productId === productId)
      const newItems = prevCart.items.filter(item => item.productId !== productId)

      return {
        ...prevCart,
        items: newItems,
        totalQuantity: prevCart.totalQuantity - (item?.quantity || 0),
        totalPriceUAH: calculateTotal(newItems)
      }
    })
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(prevCart => {
      const oldItem = prevCart.items.find(i => i.productId === productId)
      const quantityDiff = quantity - (oldItem?.quantity || 0)

      const newItems = prevCart.items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )

      return {
        ...prevCart,
        items: newItems,
        totalQuantity: prevCart.totalQuantity + quantityDiff,
        totalPriceUAH: calculateTotal(newItems)
      }
    })
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCart({ items: [], totalQuantity: 0, totalPriceUAH: 0 })
  }, [])

  const cartTotal = useCallback(
    (currency: 'UAH' | 'USD' | 'EUR', rates: Record<string, number>) => {
      if (currency === 'UAH') return cart.totalPriceUAH
      return Math.round(cart.totalPriceUAH * rates[currency] * 100) / 100
    },
    [cart.totalPriceUAH]
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

// Helper function to calculate total price
function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const discountedPrice = priceUtils.calculateDiscount(item.product.price, item.product.discount)
    return total + discountedPrice * item.quantity
  }, 0)
}

function getInitialCart(): Cart {
  const emptyCart: Cart = { items: [], totalQuantity: 0, totalPriceUAH: 0 }
  const saved = localStorage.getItem('cart')

  if (!saved) return emptyCart

  try {
    const parsed = JSON.parse(saved)

    if (!parsed || !Array.isArray(parsed.items)) {
      return emptyCart
    }

    const items = parsed.items.filter((item: Partial<CartItem>) => {
      return (
        typeof item?.productId === 'string' &&
        typeof item?.quantity === 'number' &&
        item.quantity > 0 &&
        !!item.product
      )
    }) as CartItem[]

    return {
      items,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPriceUAH: calculateTotal(items)
    }
  } catch {
    return emptyCart
  }
}
