import { OrderProvider } from './context/OrderContext'
import { Menu } from './components/Menu'
import { OrderSummary } from './components/OrderSummary'
import { OrderSubmit } from './components/OrderSubmit'

function App() {
  return (
    <OrderProvider>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Cafetería - Sistema de Pedidos</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <Menu />
          </div>
          <div>
            <OrderSummary />
            <OrderSubmit />
          </div>
        </div>
      </div>
    </OrderProvider>
  )
}

export default App