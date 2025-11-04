import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect} from 'vitest';
import { Menu } from './../Menu'
import { OrderProvider } from './../../context/OrderContext'

const renderMenu = () => {
  return render(
    <OrderProvider>
      <Menu />
    </OrderProvider>
  )
}

describe('HU1 - Visualización inicial del menu', () => {
  it('debe mostrar los productos del menu al cargar', async () => {
    renderMenu()
    
    
    await waitFor(() => {
      expect(screen.getByText(/Café Americano/i)).toBeInTheDocument()
    })
    
    expect(screen.getByText(/Café con Leche/i)).toBeInTheDocument()
    expect(screen.getByText(/Capuchino/i)).toBeInTheDocument()
    
    
    const addButtons = screen.getAllByRole('button', { name: /agregar/i })
    expect(addButtons.length).toBe(4) // 4 productos
  })
})