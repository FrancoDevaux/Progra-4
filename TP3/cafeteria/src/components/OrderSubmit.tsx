import { useState } from 'react'
import { useOrder } from '../context/OrderContext'

export const OrderSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const { orderItems, calculateTotal, clearOrder } = useOrder()

  const handleSubmit = async () => {
    if (orderItems.length === 0) {
      setMessage('Agrega items al pedido primero')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      const order = {
        items: orderItems,
        total: calculateTotal()
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })

      if (response.ok) {
        setMessage('Pedido confirmado')
        clearOrder()
      } else {
        setMessage('Error al enviar pedido')
      }
    } catch (error) {
      setMessage('Error de conexión')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <button 
        onClick={handleSubmit} 
        disabled={isSubmitting || orderItems.length === 0}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Pedido'}
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}