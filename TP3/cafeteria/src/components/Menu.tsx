import { useState, useEffect } from 'react'
import type { Product } from '../types'
import { useOrder } from '../context/OrderContext'

export const Menu = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToOrder } = useOrder()

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setError(null)
        const response = await fetch('/api/menu')
        
        if (!response.ok) {
          throw new Error('Error al cargar menu')
        }
        
        const menuData = await response.json()
        
        if (menuData.length === 0) {
          setError('No productos disponibles')
        } else {
          setProducts(menuData)
        }
      } catch (error) {
        setError('Error al cargar menu')
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [])

  if (loading) return <div>Cargando menu</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {products.map(product => (
          <li key={product.id} data-testid={`product-${product.id}`}>
            {product.name} - ${product.price.toFixed(2)}
            <button 
              onClick={() => addToOrder(product)}
              style={{ marginLeft: '10px' }}
            >
              Agregar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}