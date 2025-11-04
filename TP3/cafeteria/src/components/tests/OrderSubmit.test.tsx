import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OrderProvider } from '../../context/OrderContext'
import { describe, it, expect} from 'vitest';
import { Menu } from '../Menu'
import { OrderSummary } from '../OrderSummary'
import { OrderSubmit } from '../OrderSubmit'

const renderOrderFlow = () => {
  return render(
    <OrderProvider>
      <Menu />
      <OrderSummary />
      <OrderSubmit />
    </OrderProvider>
  )
}

describe('HU5 - Enviar pedido', () => {
  it('debe enviar el pedido y mostrar mensaje de confirmación', async () => {
    const user = userEvent.setup()
    renderOrderFlow()

    await waitFor(() => {
      expect(screen.getByText(/Café Americano/i)).toBeInTheDocument()
    })

    const addButtons = screen.getAllByRole('button', { name: /agregar/i })
    await user.click(addButtons[0])

    const submitButton = screen.getByRole('button', { name: /enviar pedido/i })
    expect(submitButton).not.toBeDisabled()

    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Pedido confirmado')).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})