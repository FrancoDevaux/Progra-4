import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect} from 'vitest';
import { http, HttpResponse } from 'msw'
import { server } from './../../test/mocks/server'
import { Menu } from '../Menu'
import { OrderProvider } from './../../context/OrderContext'

const renderMenu = () => {
  return render(
    <OrderProvider>
      <Menu />
    </OrderProvider>
  )
}

describe('HU6 - Casos límite', () => {
  it('debe mostrar mensaje cuando el menu está vacío', async () => {
    server.use(
      http.get('/api/menu', () => {
        return HttpResponse.json([])
      })
    )

    renderMenu()

    await waitFor(() => {
      expect(screen.getByText('No productos disponibles')).toBeInTheDocument()
    })
  })

  it('debe manejar errores de servidor', async () => {
    server.use(
      http.get('/api/menu', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    renderMenu()

    await waitFor(() => {
      expect(screen.getByText('Error al cargar menu')).toBeInTheDocument()
    })
  })
})