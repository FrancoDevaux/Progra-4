import React, { createContext, useContext, useState, type ReactNode } from 'react'
import type { Product, OrderItem} from './../types'

interface OrderContextType {
  orderItems: OrderItem[]
  addToOrder: (product: Product) => void
  removeFromOrder: (productId: string) => void
  calculateTotal: () => number
  clearOrder: () => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  const addToOrder = (product: Product) => {
    setOrderItems(current => {
      const existing = current.find(item => item.product.id === product.id)
      if (existing) {
        return current.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...current, { product, quantity: 1 }]
    })
  }

  const removeFromOrder = (productId: string) => {
    setOrderItems(current => current.filter(item => item.product.id !== productId))
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const clearOrder = () => {
    setOrderItems([])
  }

  return (
    <OrderContext.Provider value={{
      orderItems,
      addToOrder,
      removeFromOrder,
      calculateTotal,
      clearOrder
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrder se tiene que utilizar dentro de OrderProvider')
  }
  return context
}