import { useOrder } from '../context/OrderContext'

export const OrderSummary = () => {
  const { orderItems, removeFromOrder, calculateTotal } = useOrder()

  return (
    <div>
      <h2>Tu Pedido</h2>
      {orderItems.length === 0 ? (
        <p>No hay items en el pedido</p>
      ) : (
        <>
          <ul>
            {orderItems.map(item => (
              <li key={item.product.id} data-testid={`order-item-${item.product.id}`}>
                {item.product.name} - ${item.product.price.toFixed(2)} x {item.quantity}
                <button 
                  onClick={() => removeFromOrder(item.product.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        </>
      )}
    </div>
  )
}