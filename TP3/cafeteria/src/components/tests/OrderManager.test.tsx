import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OrderProvider } from './../../context/OrderContext'
import { describe, it, expect} from 'vitest';
import { Menu } from './../Menu'
import { OrderSummary } from './../OrderSummary'

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <OrderProvider>
      {component}
    </OrderProvider>
  )
}

describe('HU2 - Agregar ítem al pedido', () => {
  it('debe agregar productos al área de pedido', async () => {
    const user = userEvent.setup()
    renderWithProvider(
      <>
        <Menu />
        <OrderSummary />
      </>
    )

    await waitFor(() => {
      expect(screen.getByText(/Café Americano/i)).toBeInTheDocument()
    })

    
    const addButtons = screen.getAllByRole('button', { name: /agregar/i })
    await user.click(addButtons[0])

    
    const orderLists = screen.getAllByRole('list')
    expect(orderLists).toHaveLength(2)
    expect(screen.getByText(/Café Americano.*\$2\.50.*x 1/i)).toBeInTheDocument()
  })
})

describe('HU3 - Calcular total del pedido', () => {
  it('debe mostrar el total actualizado al agregar productos', async () => {
    const user = userEvent.setup()
    renderWithProvider(
      <>
        <Menu />
        <OrderSummary />
      </>
    )

    await waitFor(() => {
      expect(screen.getByText(/Café Americano/i)).toBeInTheDocument()
    })

    const addButtons = screen.getAllByRole('button', { name: /agregar/i })
    await user.click(addButtons[0]) // Add Cafe Americano ($2.50)
    await user.click(addButtons[0]) // Add otro Cafe Americano ($2.50)
    await user.click(addButtons[1]) // Add Cafe con Leche ($3.00)

    expect(screen.getByText(/Total: \$8\.00/i)).toBeInTheDocument()
  })
})


describe('HU4 - Eliminar ítem del pedido', () => {
  it('debe remover solo el producto específico al hacer clic en eliminar', async () => {
    const user = userEvent.setup()
    renderWithProvider(
      <>
        <Menu />
        <OrderSummary />
      </>
    )

    await waitFor(() => {
      expect(screen.getByText(/Café Americano/i)).toBeInTheDocument()
    })

    const addButtons = screen.getAllByRole('button', { name: /agregar/i })
    await user.click(addButtons[0]) // Add Cafe Americano
    await user.click(addButtons[1]) // Add Cafe con Leche

   
    const removeButtons = screen.getAllByRole('button', { name: /eliminar/i })
    expect(removeButtons).toHaveLength(2) 
    
    // Elimina primer producto
    await user.click(removeButtons[0])

    expect(screen.queryByText(/Café Americano.*x 1/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Café con Leche.*x 1/i)).toBeInTheDocument()
  })
})